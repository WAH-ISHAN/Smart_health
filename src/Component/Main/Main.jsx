import React from 'react';

export default function Main() {
  return (
    <div className="bg-[#FFFDF9] min-h-screen flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-12 font-sans">

      {/* Left Side Content */}
      <div className="md:w-1/2 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4 leading-tight">
          BOOK <br /> APPOINTMENT
        </h1>
        <p className="text-gray-500 text-lg mb-6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <button className="bg-blue-900 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-800 transition">
          GET STARTED
        </button>
      </div>

      {/* Right Side Image */}
      <div className="md:w-1/2 mt-12 md:mt-0">
        <img
          src="/images/doctor-illustration.png"
          alt="Doctor"
          className="w-full max-w-md mx-auto"
        />
      </div>
    </div>
  );
}
