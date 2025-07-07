import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Header({ user }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear auth data here, for example:
    localStorage.removeItem("authToken");
    // or clear user context, cookies, etc.

    // Close profile menu
    setIsProfileOpen(false);

    // Redirect to login page
    navigate("/login");
  };

  return (
    <div className="w-full h-16 bg-gradient-to-r from-blue-600 to-blue-800 flex items-center justify-between px-6 shadow-lg relative z-50">
      <h1 className="text-white text-3xl font-bold relative">
        <span className="text-gray-300">Doc</span>Medi
        <span className="text-gray-300">Care</span>
        <span className="absolute block h-1 w-full bg-white bottom-0 left-0 transform scale-x-0 transition-transform duration-300 ease-in-out hover:scale-x-100"></span>
      </h1>
      <nav>
        <ul className="flex space-x-6 items-center">
          <li>
            <a
              href="/"
              className="text-white hover:bg-blue-700 rounded-md p-2 transition duration-300 ease-in-out"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="/HospitalList"
              className="text-white hover:bg-blue-700 rounded-md p-2 transition duration-300 ease-in-out"
            >
              Service
            </a>
          </li>
          <li className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="text-white hover:bg-blue-700 rounded-md p-2 transition duration-300 ease-in-out flex items-center space-x-2"
            >
              <span>{user?.username || "Profile"}</span>
            </button>
            {isProfileOpen && (
              <ul className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-md z-50">
                <li className="px-4 py-2 text-gray-800 border-b">
                  {user?.email}
                </li>
                <li>
                  <a
                    href="/profile"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    View Profile
                  </a>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
}
