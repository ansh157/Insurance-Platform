import { useEffect, useState } from "react";
import axios from "../utils/axios";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();
  const [policyCount, setPolicyCount] = useState(0);
  const [claimCount, setClaimCount] = useState(0);
  const [pendingClaims, setPendingClaims] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const policies = await axios.get("/policies");
      setPolicyCount(policies.data.length);

      let claims;
      if (user.role === "admin") {
        claims = await axios.get("/claims/admin");
      } else {
        claims = await axios.get("/claims");
      }

      setClaimCount(claims.data.length);

      const pending = claims.data.filter(
        (c) => c.status === "pending"
      ).length;

      setPendingClaims(pending);
    };

    fetchData();
  }, []);

  return (
    <>
      <h1 className="text-3xl font-bold mb-8">
        Welcome, {user.name}
      </h1>

      <div className="grid grid-cols-3 gap-6">
        
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
          <h3 className="text-gray-600">Total Policies</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">
            {policyCount}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
          <h3 className="text-gray-600">
            {user.role === "admin" ? "Total Claims" : "My Claims"}
          </h3>
          <p className="text-3xl font-bold text-purple-600 mt-2">
            {claimCount}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
          <h3 className="text-gray-600">Pending Claims</h3>
          <p className="text-3xl font-bold text-red-500 mt-2">
            {pendingClaims}
          </p>
        </div>

      </div>
    </>
  );
};

export default Dashboard;