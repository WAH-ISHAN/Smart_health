import { Link, Route, Routes, useLocation } from "react-router-dom";
import  AdminDash  from "./AdminDash";
import { Pharmacy } from "./Pharmacy";
import { Doctors } from "./Doctors";
import { Patients } from "./Patients";
import Profile from "./Profile";
import Users from "./Users";

export default function AdminHome() {
  const location = useLocation();

  const getLinkClass = (path) => {
    const baseClass = "flex items-center gap-4 text-white rounded px-2 py-1";
    return location.pathname.includes(`/AdminHome/${path}`)
      ? baseClass + " bg-gray-700 shadow-lg"
      : baseClass;
  };

  const animatedLinkClass =
    "transform transition duration-300 ease-in-out hover:scale-105 hover:bg-blue-900 hover:shadow-lg cursor-pointer";

  return (
    <div className="w-full h-screen font-sans flex p-2 gap-2 bg-white">
   
      <nav className="w-64 bg-blue-600 h-full p-6 hidden md:block shadow rounded-3xl space-y-6">
        <h2 className="text-2xl font-bold mb-12 text-white">Admin Panel</h2>

        <Link to="/AdminHome/AdminDash" className={`${getLinkClass("")} ${animatedLinkClass}`}>
          Dashboard
        </Link>
        <Link to="/AdminHome/Profile" className={`${getLinkClass("Profile")} ${animatedLinkClass}`}>
          Profile
        </Link>
        <Link to="/AdminHome/Users" className={`${getLinkClass("Users")} ${animatedLinkClass}`}>
          Users
        </Link>
        <Link to="/AdminHome/Pharmacy" className={`${getLinkClass("Pharmacy")} ${animatedLinkClass}`}>
          Pharmacy
        </Link>
        <Link to="/AdminHome/Patients" className={`${getLinkClass("Patients")} ${animatedLinkClass}`}>
          Patients
        </Link>
        <Link to="/AdminHome/Doctors" className={`${getLinkClass("Doctors")} ${animatedLinkClass}`}>
          Doctors
        </Link>
        <Link to="/AdminHome/pageoverview" className={`${getLinkClass("pageoverview")} ${animatedLinkClass}`}>
          Page Overview
        </Link>
        <Link to="/AdminHome/logout" className={`${getLinkClass("logout")} ${animatedLinkClass}`}>
          LogOut
        </Link>
      </nav>

  
      <main className="h-full bg-gray-400 flex-1 rounded-3xl p-6 overflow-y-auto text-white">
        <Routes>
          <Route path="AdminDash" element={<AdminDash />} />
          <Route path="Pharmacy" element={<Pharmacy />} />
          <Route path="Patients" element={<Patients />} />
          <Route path="Doctors" element={<Doctors />} />
          <Route path="Users" element={<Users />} />
          <Route path="Profile" element={<Profile />} />
          <Route path="pageoverview" element={<h1 className="text-3xl font-semibold">Page Overview</h1>} />
          <Route path="logout" element={<h1 className="text-3xl font-semibold">Logging Out...</h1>} />
        </Routes>
      </main>
    </div>
  );
}
