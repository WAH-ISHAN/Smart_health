import { Link } from 'react-router-dom';
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(e) {
    e.preventDefault();
    console.log("Login clicked with:", { email, password });
  } // You can connect to your Spring Boot API here later

  return (
    <div className="min-h-screen flex bg-black">
      
      <div className="flex flex-col justify-center p-10 bg-[rgba(15,23,42,0.75)] w-full md:w-[600px] backdrop-blur-sm rounded-r-3xl shadow-2xl z-10">
        <h2 className="text-5xl font-bold mb-10 text-center text-blue-400">
          <span className='text-white'>Doc</span>Medi<span className='text-white'>Care</span> Appointment Login
        </h2>

        <form className="space-y-6" onSubmit={handleLogin}>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter your Email"
            className="w-full p-4 bg-gray-900 border border-gray-700 rounded-md focus:outline-none text-lg"
            required
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Enter your Password"
            className="w-full p-4 bg-gray-900 border border-gray-700 rounded-md focus:outline-none text-lg"
            required
          />

          <div className="text-right mt-1">
            <Link to="/ForgotPass" className="text-sm text-blue-400 hover:underline">
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full px-6 py-3 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition text-lg"
          >
            Login
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
          className="flex-2 bg-cover bg-center rounded-l-4xl"
        style={{ backgroundImage: "url('./0002.jpg')" }}
      />
    </div>
  );
}
