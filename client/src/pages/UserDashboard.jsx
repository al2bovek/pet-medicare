import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { logoutRequest } from "../api/auth";
import { Link, useNavigate } from "react-router-dom";
import { HomeIcon, PawIcon } from "../components/icons";
import AppIconBar from "../components/AppIconBar";
import api from "../api/axios";

export default function UserDashboard() {
  const { user, setUser, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutRequest();
    } catch (err) {
      console.error("Logout failed:", err);
    }
    localStorage.removeItem("accessToken");
    delete api.defaults.headers.common["Authorization"];
    setUser(null);
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-600 text-lg">Loading user...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-600 text-lg">No user logged in.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gray-100 p-6 space-y-6">
      <div className="text-center space-y-1">
        <h1 className="text-2xl font-bold">Hello, {user?.user_name}</h1>
        <p className="text-gray-700">Role: {user?.role}</p>
        <p className="text-gray-700">Email: {user?.email}</p>
      </div>
      
      <AppIconBar
        Link={Link}
        PawIcon={PawIcon}
      />

      <button
        onClick={handleLogout}
        className="flex items-center justify-center mt-4 bg-amber-700 hover:bg-amber-800 text-white font-semibold p-3 w-44 rounded-xl transition shadow-md"
      >
        <HomeIcon className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
        Logout
      </button>
    </div>
  );
}