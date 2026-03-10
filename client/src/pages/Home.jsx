import { Link, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Home() {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;

  if (user) {
    return <Navigate to={user.role === "admin" ? "/admin" : "/client"} replace />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gray-100 p-6">
     <h1 className="text-center text-3xl bg-indigo-800 text-white px-6 py-3.5 rounded-sm transition mx-auto mb-6 w-[99%]">
        Pets Medicare
      </h1>

      <div className="flex gap-4 w-[25%] justify-center">
        <Link
          to="/login"
          className="w-full px-6 py-3 bg-indigo-800 text-white rounded hover:bg-indigo-700"
        >
          Login
        </Link>

        <Link
          to="/register"
          className="w-full px-6 py-3 bg-green-800 text-white rounded hover:bg-green-700"
        >
          Register
        </Link>
      </div>
    </div>
  );
}
