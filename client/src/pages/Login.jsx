import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginRequest, getMe } from "../api/auth";
import { AuthContext } from "../context/AuthContext";
import { HomeIcon, PawIcon } from "../components/icons";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    const trimmedForm = {
      email: form.email.trim(),
      password: form.password.trim()
    };

    const validationErrors = {};
    if (!trimmedForm.email) validationErrors.email = "Email is required";
    if (!trimmedForm.password) validationErrors.password = "Password is required";

    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    try {
      const loginRes = await loginRequest(trimmedForm);

      const accessToken = loginRes.data.accessToken;
      localStorage.setItem("accessToken", accessToken);

      const me = await getMe();
      setUser(me.data);

      if (me.data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/client");
      }
    } catch (err) {
      const message = err.response?.data?.message || "Login failed";
      setErrors({
        email: message,
        password: message
      });
    }
  };

  return (
    <div className="p-6 max-w-sm mx-auto">
      <p className="text-sm text-center text-gray-600 mt-3 sm:mt-4">
        <Link
          to="/"
          className="inline-flex items-center gap-1 text-gray-700 font-medium hover:text-gray-900 transition"
        >
          <span>to Pets Medicare</span>
          <HomeIcon className="w-4 h-4 sm:w-5 sm:h-5  hover:text-amber-800" />
        </Link>
      </p>

      <h1 className="text-xl mb-4">Login</h1>

      <form onSubmit={submit} className="flex flex-col gap-3">
        <input
          type="email"
          placeholder="Email"
          className={`border p-2 ${errors.email ? "border-red-500" : ""}`}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

        <input
          type="password"
          placeholder="Password"
          className={`border p-2 ${errors.password ? "border-red-500" : ""}`}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

        <button className="bg-indigo-800 hover:bg-indigo-700 text-white p-2">
          <PawIcon className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        <p className="text-sm text-center">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600">
            <span>Register</span>
          </Link>
        </p>
      </form>
    </div>
  );
}
