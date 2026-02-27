import { useState } from "react";
import axios from "../utils/axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setMessage("");

  try {
    const res = await axios.post("/auth/forgot-password", { email });

    const token = res.data.resetToken;   // ✅ define token properly

    console.log("Reset Token:", token);

    navigate(`/reset-password/${token}`);  // ✅ now it works

  } catch (err) {
    setError(err.response?.data?.message || "Error occurred");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Forgot Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-100 text-red-600 p-2 rounded text-sm">
              {error}
            </div>
          )}

          {message && (
            <div className="bg-green-100 text-green-600 p-2 rounded text-sm">
              {message}
            </div>
          )}

          <input
            type="email"
            placeholder="Enter your registered email"
            className="w-full border p-3 rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
            Send Reset Token
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          <Link to="/login" className="text-blue-600 hover:underline">
            Back to Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;