import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerRequest, getMe } from "../api/auth";
import { AuthContext } from "../context/AuthContext";
import { validateForm } from "../validators/validateForm";
import { HomeIcon, PawIcon } from "../components/icons";

export default function Register() {
  const [form, setForm] = useState({
    user_name: "",
    email: "",
    password: "",
    role: "client"
  });

  const [errors, setErrors] = useState({});
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    const trimmedForm = {
      user_name: form.user_name.trim(),
      email: form.email.trim(),
      password: form.password.trim(),
      role: form.role
    };

    const validationErrors = validateForm(trimmedForm);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    try {
      const regRes = await registerRequest(trimmedForm);

      const accessToken = regRes.data.accessToken;
      localStorage.setItem("accessToken", accessToken);

      const me = await getMe();
      setUser(me.data);

      navigate("/client");
    } catch (err) {
      const message = err.response?.data?.message || "Registration failed";
      const lower = message.toLowerCase();

      if (lower.includes("email")) {
        setErrors({ email: message });
        return;
      }

      if (lower.includes("username") || lower.includes("user_name")) {
        setErrors({ user_name: message });
        return;
      }

      setErrors({ server: message });
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
          <HomeIcon className="w-4 h-4 sm:w-5 sm:h-5 hover:text-amber-800" />
        </Link>
      </p>

      <h1 className="text-xl mb-4">Register</h1>
      {errors.server && <p className="text-red-600 text-sm">{errors.server}</p>}

      <form onSubmit={submit} className="flex flex-col gap-3">
        <div>
          <input
            type="text"
            placeholder="User name"
            className={`border p-2 w-full ${errors.user_name ? "border-red-500" : ""}`}
            onChange={(e) => setForm({ ...form, user_name: e.target.value })}
          />
          {errors.user_name && <p className="text-red-500 text-sm">{errors.user_name}</p>}
        </div>

        <div>
          <input
            type="email"
            placeholder="Email"
            className={`border p-2 w-full ${errors.email ? "border-red-500" : ""}`}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            className={`border p-2 w-full ${errors.password ? "border-red-500" : ""}`}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </div>

        <button className="bg-green-800  hover:bg-green-700 text-white p-2">
          <PawIcon className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        <p className="text-sm text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600">
            <span>Login</span>
          </Link>
        </p>
      </form>
    </div>
  );
}
