import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

export default function HomePage() {
    const Navigate = useNavigate();
  // Scroll to the second page section smoothly
  const scrollToSecondPage = () => {
    const element = document.getElementById("secondPage");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Home Section */}
      <div className="min-h-screen overflow-y-auto flex flex-col md:flex-row bg-black text-white">
        {/* Left: Welcome Section */}
        <div className="flex-1 p-10 md:p-16 flex flex-col justify-center">
          <h1 className="text-5xl font-extrabold mb-6 text-blue-400 animate-fade-in">
            Welcome to <span className="text-white">DocMediCare</span>
          </h1>

          <p className="text-lg leading-relaxed text-gray-300 mt-4">
            The smarter way to find your doctor. We believe that your health deserves convenience, choice, and care — all in one place. That’s why we built a platform where you’re in control:
          </p>

          <ul className="text-gray-200 list-disc list-inside mt-6 space-y-3">
            <li>🌍 Explore hospitals across Sri Lanka</li>
            <li>🩺 Choose specialties — cardiology, dermatology, etc.</li>
            <li>👨‍⚕ Book appointments with verified doctors</li>
            <li>📅 Real-time availability, no waiting in line</li>
          </ul>

          <p className="mt-6 text-gray-400 italic">
            From Colombo to Jaffna, healthcare is now just a click away.
          </p>
        </div>

        {/* Right: Action Panel */}
        <div
          className="w-full md:w-[500px] bg-slate-900/70 backdrop-blur-md rounded-t-3xl md:rounded-r-3xl p-10 flex flex-col justify-center shadow-2xl z-10"
        >
          <h2 className="text-3xl font-bold mb-4 text-center text-blue-400">
            Explore Our Services
          </h2>
          <p className="text-center mb-6 text-gray-300">
            Book appointments, manage health records, and more.
          </p>
          <button
            onClick={scrollToSecondPage}
            className="w-full px-6 py-3 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-all duration-300 text-lg shadow"
          >
            Get Started
          </button>
        </div>
      </div>

      {/* Second Page Section */}
      <section
        id="secondPage"
        className="min-h-screen bg-cover bg-center flex flex-col justify-center p-10"
        style={{ backgroundImage: "url('./interduse.jpg')" }}
      >
        <div className="max-w-lg mx-auto bg-slate-900/70 backdrop-blur-md rounded-3xl p-10 shadow-2xl text-white">
          <h2 className="text-3xl font-bold mb-4 text-center text-blue-400">
            Explore Our Services
          </h2>
          <p className="text-center mb-6 text-gray-300">
            Book appointments, manage health records, and more.
          </p>
          <button
            onClick={() =>
                Navigate("/Login") ||
                window.scrollTo({ top: 0, behavior: "smooth" })}
            className="w-full px-6 py-3 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-all duration-300 text-lg shadow"
          >
            First to Login
          </button>
        </div>
      </section>
    </>
  );
}
