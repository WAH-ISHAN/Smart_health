import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      // 🔗 Connect to Spring Boot Backend API
      const res = await axios.post("http://localhost:8080/api/register", {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      });

      console.log("Registration Success:", res.data);
      alert("Registration successful!");

      // redirect to login after successful registration
      navigate("/login");
    } catch (err) {
      console.error("Registration failed:", err.response?.data || err.message);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex bg-black text-white">
      <div className="flex flex-col justify-center p-10 bg-[rgba(15,23,42,0.75)] w-full md:w-[600px] backdrop-blur-sm rounded-r-3xl shadow-2xl z-10">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-400">
          Create Your Account
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <input
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            type="text"
            placeholder="First Name"
            className="w-full p-3 bg-gray-900 border border-gray-700 rounded-md focus:outline-none"
            required
          />
          <input
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            type="text"
            placeholder="Last Name"
            className="w-full p-3 bg-gray-900 border border-gray-700 rounded-md focus:outline-none"
            required
          />
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            placeholder="Email"
            className="w-full p-3 bg-gray-900 border border-gray-700 rounded-md focus:outline-none"
            required
          />
          <input
            name="password"
            value={formData.password}
            onChange={handleChange}
            type="password"
            placeholder="Password"
            className="w-full p-3 bg-gray-900 border border-gray-700 rounded-md focus:outline-none"
            required
          />
          <input
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            type="password"
            placeholder="Confirm Password"
            className="w-full p-3 bg-gray-900 border border-gray-700 rounded-md focus:outline-none"
            required
          />

          <button
            type="submit"
            className="w-full px-6 py-2 font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700 transition"
          >
            Register
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-300">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 underline">
            Sign In
          </Link>
        </p>
      </div>

      <div
        className="flex-2 bg-cover bg-center rounded-l-4xl"
        style={{ backgroundImage: "url('./0002.jpg')" }}
      />
    </div>
  );
}
