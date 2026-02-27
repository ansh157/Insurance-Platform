import { useEffect, useState } from "react";
import axios from "../utils/axios";
import { useAuth } from "../context/AuthContext";

const Claims = () => {
  const { user } = useAuth();
  const [claims, setClaims] = useState([]);
  const [policies, setPolicies] = useState([]);
  const [formData, setFormData] = useState({
    policyId: "",
    claimAmount: "",
    reason: "",
  });

  const fetchClaims = async () => {
    if (user.role === "admin") {
      const res = await axios.get("/claims/admin");
      setClaims(res.data);
    } else {
      const res = await axios.get("/claims");
      setClaims(res.data);
    }
  };

  const fetchPolicies = async () => {
    if (user.role !== "admin") {
      const res = await axios.get("/policies");
      setPolicies(res.data);
    }
  };

  useEffect(() => {
    fetchClaims();
    fetchPolicies();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post("/claims", formData);

    setFormData({
      policyId: "",
      claimAmount: "",
      reason: "",
    });

    fetchClaims();
  };

  const updateStatus = async (id, status) => {
    await axios.put(`/claims/${id}`, { status });
    fetchClaims();
  };

  return (
    <div className="flex-1 p-10">
      <h1 className="text-3xl font-bold mb-6">Claims</h1>

      {/* User Claim Form */}
      {user.role !== "admin" && (
        <div className="bg-white p-6 rounded-xl shadow mb-8">
          <h2 className="text-xl font-semibold mb-4">File New Claim</h2>

          <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-4">
            <select
              name="policyId"
              value={formData.policyId}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            >
              <option value="">Select Policy</option>
              {policies.map((policy) => (
                <option key={policy._id} value={policy._id}>
                  {policy.policyNumber}
                </option>
              ))}
            </select>

            <input
              type="number"
              name="claimAmount"
              placeholder="Claim Amount"
              value={formData.claimAmount}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />

            <input
              type="text"
              name="reason"
              placeholder="Reason"
              value={formData.reason}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />

            <button className="col-span-3 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
              Submit Claim
            </button>
          </form>
        </div>
      )}

      {/* Claims List */}
      <div className="grid gap-4">
        {claims.length === 0 ? (
          <p className="text-gray-500">No claims found.</p>
        ) : (
          claims.map((claim) => (
            <div
              key={claim._id}
              className="bg-white p-4 rounded-xl shadow flex justify-between items-center"
            >
              <div>
                {user.role === "admin" && (
                  <p className="text-sm text-gray-600">
                    User: {claim.user?.name} ({claim.user?.email})
                  </p>
                )}

                <p className="font-semibold">
                  Policy: {claim.policy?.policyNumber}
                </p>

                <p>Amount: ₹{claim.claimAmount}</p>
                <p>Reason: {claim.reason}</p>
                <p>
                  Status:{" "}
                  <span className="font-semibold">{claim.status}</span>
                </p>
              </div>

              {user.role === "admin" && (
                <div className="space-x-2">
                  <button
                    onClick={() => updateStatus(claim._id, "approved")}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => updateStatus(claim._id, "rejected")}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Claims;