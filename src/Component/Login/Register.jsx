import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

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

    setLoading(true);
    try {
      const res = await axios.post(
        import.meta.env.VITE_API_URL + "/users/register",
        {
          username: formData.username,
          firstname: formData.firstname,
          lastname: formData.lastname,
          email: formData.email,
          password: formData.password,
        }
      );

      alert(res.data.message || "Registration successful!");
      navigate("/login");
    } catch (err) {
      console.error("Registration failed:", err);
      alert(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
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
            name="username"
            value={formData.username}
            onChange={handleChange}
            type="text"
            placeholder="Username"
            className="w-full p-3 bg-gray-900 border border-gray-700 rounded-md"
            required
            disabled={loading}
          />
          <input
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            type="text"
            placeholder="First Name"
            className="w-full p-3 bg-gray-900 border border-gray-700 rounded-md"
            required
            disabled={loading}
          />
          <input
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            type="text"
            placeholder="Last Name"
            className="w-full p-3 bg-gray-900 border border-gray-700 rounded-md"
            required
            disabled={loading}
          />
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            placeholder="Email"
            className="w-full p-3 bg-gray-900 border border-gray-700 rounded-md"
            required
            disabled={loading}
          />
          <input
            name="password"
            value={formData.password}
            onChange={handleChange}
            type="password"
            placeholder="Password"
            className="w-full p-3 bg-gray-900 border border-gray-700 rounded-md"
            required
            disabled={loading}
          />
          <input
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            type="password"
            placeholder="Confirm Password"
            className="w-full p-3 bg-gray-900 border border-gray-700 rounded-md"
            required
            disabled={loading}
          />

          <button
            type="submit"
            className={`w-full px-6 py-2 font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700 transition ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-300">
          Already have an account?{" "}
          <a href="/login" className="text-blue-400 underline">
            Sign In
          </a>
        </p>
      </div>

      <div
        className="flex-2 bg-cover bg-center rounded-l-4xl hidden md:block"
        style={{ backgroundImage: "url('./0002.jpg')" }}
      />
    </div>
  );
}
