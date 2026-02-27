import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-indigo-700 text-white flex flex-col">

      {/* Navbar */}
      <div className="flex justify-between items-center px-10 py-6">
        <h1 className="text-2xl font-bold">Insurance Portal</h1>

        <div className="space-x-4">
          <Link
            to="/login"
            className="px-4 py-2 bg-white text-blue-700 rounded-lg font-semibold hover:bg-gray-200"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="px-4 py-2 border border-white rounded-lg hover:bg-white hover:text-blue-700"
          >
            Sign Up
          </Link>
        </div>
      </div>

      {/* Hero */}
      <div className="flex-1 flex flex-col justify-center items-center text-center px-6">
        <h2 className="text-5xl font-bold mb-6">
          Secure Your Future with Confidence
        </h2>

        <p className="text-lg max-w-2xl mb-8">
          Manage policies, track claims, and calculate premiums —
          all in one modern insurance management platform.
        </p>

        <Link
          to="/signup"
          className="px-8 py-3 bg-white text-blue-700 font-semibold rounded-xl shadow-lg hover:scale-105 transition"
        >
          Get Started
        </Link>
      </div>

      {/* Footer */}
      <div className="text-center py-4 bg-blue-800 text-sm">
        © 2026 Insurance Portal. All rights reserved to Ansh Singh.
      </div>

    </div>
  );
};

export default Landing;