import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("user"); // role selection: user, doctor, admin
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(import.meta.env.VITE_API_URL + "/users/login", {
        email,
        password,
        role: userType,
      });

      const { message, role, token } = res.data;

      if (message === "Login successful!") {
        alert(message);

        localStorage.setItem("token", token);
        localStorage.setItem("role", role);

        if (role === "admin") navigate("/AdminHome");
        else if (role === "doctor") navigate("/DoctorDashboard");
        else navigate("/Userpage");
      } else {
        alert(message);
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert(error.response?.data?.message || "An error occurred during login.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex bg-black text-white">
      <div className="flex flex-col justify-center p-10 bg-[rgba(15,23,42,0.75)] w-full md:w-[600px] backdrop-blur-sm rounded-r-3xl shadow-2xl z-10">
        <h2 className="text-5xl font-bold mb-10 text-center text-blue-400">
          <span className="text-white">Doc</span>Medi
          <span className="text-white">Care</span> Login
        </h2>

        <div className="flex gap-4 justify-center mb-6">
          {["user", "doctor", "admin"].map((role) => (
            <button
              key={role}
              type="button"
              onClick={() => setUserType(role)}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                userType === role
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white"
              }`}
              disabled={loading}
            >
              {role.charAt(0).toUpperCase() + role.slice(1)}
            </button>
          ))}
        </div>

        <form className="space-y-6" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Enter your Email"
            className="w-full p-4 bg-gray-900 border border-gray-700 rounded-md focus:outline-none text-lg"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
          <input
            type="password"
            placeholder="Enter your Password"
            className="w-full p-4 bg-gray-900 border border-gray-700 rounded-md focus:outline-none text-lg"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />

          <div className="text-right mt-1">
            <Link
              to="/ForgotPass"
              className="text-sm text-blue-400 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition text-lg"
          >
            {loading
              ? "Logging in..."
              : `Login as ${userType.charAt(0).toUpperCase() + userType.slice(1)}`}
          </button>
        </form>

        <p className="mt-8 text-center text-md text-gray-300">
          Don’t have an account?{" "}
          <Link to="/Register" className="text-blue-400 underline">
            Register here
          </Link>
        </p>
      </div>

      <div
        className="flex-2 bg-cover bg-center rounded-l-4xl hidden md:block"
        style={{ backgroundImage: "url('./0002.jpg')" }}
      />
    </div>
  );
}
