import { useEffect, useState } from "react";
import axios from "../utils/axios";

const Policies = () => {
  const [policies, setPolicies] = useState([]);
  const [formData, setFormData] = useState({
    type: "health",
    premiumAmount: "",
    coverageAmount: "",
  });

  const fetchPolicies = async () => {
    const res = await axios.get("/policies");
    setPolicies(res.data);
  };

  useEffect(() => {
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

    await axios.post("/policies", formData);

    setFormData({
      type: "health",
      premiumAmount: "",
      coverageAmount: "",
    });

    fetchPolicies();
  };

  const handleDelete = async (id) => {
    await axios.delete(`/policies/${id}`);
    fetchPolicies();
  };

  return (
    <div className="flex-1 p-10">
      <h1 className="text-3xl font-bold mb-6">My Policies</h1>

      {/* Create Policy Form */}
      <div className="bg-white p-6 rounded-xl shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">Create New Policy</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-4">
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="health">Health</option>
            <option value="car">Car</option>
            <option value="life">Life</option>
          </select>

          <input
            type="number"
            name="premiumAmount"
            placeholder="Premium Amount"
            value={formData.premiumAmount}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />

          <input
            type="number"
            name="coverageAmount"
            placeholder="Coverage Amount"
            value={formData.coverageAmount}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />

          <button className="col-span-3 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
            Create Policy
          </button>
        </form>
      </div>

      {/* Policies List */}
      <div className="grid gap-4">
        {policies.length === 0 ? (
          <p className="text-gray-500">No policies found.</p>
        ) : (
          policies.map((policy) => (
            <div
              key={policy._id}
              className="bg-white p-4 rounded-xl shadow flex justify-between items-center"
            >
              <div>
                <h3 className="font-semibold text-lg">
                  {policy.type.toUpperCase()} Policy
                </h3>
                <p className="text-sm text-gray-600">
                  Policy No: {policy.policyNumber}
                </p>
                <p className="text-sm">
                  Premium: ₹{policy.premiumAmount}
                </p>
                <p className="text-sm">
                  Coverage: ₹{policy.coverageAmount}
                </p>
                <p className="text-sm">
                  Status:{" "}
                  <span className="font-semibold">{policy.status}</span>
                </p>
              </div>

              <button
                onClick={() => handleDelete(policy._id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Policies;