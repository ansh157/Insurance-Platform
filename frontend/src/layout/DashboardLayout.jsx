import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const linkClass = (path) =>
    `block p-2 rounded transition ${
      location.pathname === path
        ? "bg-white text-blue-700 font-semibold"
        : "hover:bg-blue-600"
    }`;

  return (
    <div className="min-h-screen flex bg-gray-100">
      
      {/* Sidebar */}
      <div className="w-64 bg-gradient-to-b from-blue-700 to-indigo-800 text-white p-6 space-y-4 shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Insurance Portal</h2>

        <Link to="/dashboard" className={linkClass("/dashboard")}>
          Dashboard
        </Link>

        <Link to="/policies" className={linkClass("/policies")}>
          Policies
        </Link>

        <Link to="/claims" className={linkClass("/claims")}>
          Claims
        </Link>

        <Link to="/premium" className={linkClass("/premium")}>
          Premium Calculator
        </Link>

        <button
          onClick={handleLogout}
          className="mt-10 bg-red-500 px-3 py-2 rounded hover:bg-red-600 w-full transition"
        >
          Logout
        </button>
      </div>

      {/* Main Section */}
      <div className="flex-1 flex flex-col">

        {/* Topbar */}
        <div className="bg-white shadow px-8 py-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-700">
            Welcome, {user?.name}
          </h2>

          <span className="text-sm bg-blue-100 text-blue-700 px-4 py-1 rounded-full font-medium">
            {user?.role?.toUpperCase()}
          </span>
        </div>

        {/* Page Content */}
        <div className="p-10">
          <Outlet />
        </div>

      </div>
    </div>
  );
};

export default DashboardLayout;