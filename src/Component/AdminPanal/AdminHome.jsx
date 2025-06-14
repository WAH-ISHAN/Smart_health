import { Link, Route, Routes, useLocation } from "react-router-dom";
import { AccountPanal } from "./unit/AccountPanal";
import { AdminDash } from "./AdminDash";

export default function AdminHome() {
  const location = useLocation();

  const getLinkClass = (path) => {
    const baseClass =
      "flex items-center gap-4 text-white rounded px-2 py-1";
    return location.pathname.endsWith(path)
      ? baseClass + " bg-gray-700 shadow-lg"
      : baseClass;
  };

  const animatedLinkClass =
    "transform transition duration-300 ease-in-out hover:scale-105 hover:bg-blue-900 hover:shadow-lg cursor-pointer";

  return (
    <div className="w-full h-screen font-sans flex p-2 gap-2 bg-white">
      <nav className="w-64 bg-blue-600 h-full p-6 hidden md:block shadow rounded-3xl space-y-6">
        <h2 className="text-2xl font-bold mb-12 text-white">Admin Panel</h2>

        <Link to="AdminContent" className={`${getLinkClass("AdminContent")} ${animatedLinkClass}`}>
          Dashboard
        </Link>
        <Link to="Profile" className={`${getLinkClass("Profile")} ${animatedLinkClass}`}>
          Profile
        </Link>
        <Link to="Users" className={`${getLinkClass("Users")} ${animatedLinkClass}`}>
          Users
        </Link>
        <Link to="Orders" className={`${getLinkClass("Orders")} ${animatedLinkClass}`}>
           Doctors List
        </Link>
        <Link to="Orders" className={`${getLinkClass("Orders")} ${animatedLinkClass}`}>
          Edit Doctors Details
        </Link>
        <Link to="AddProduct" className={`${getLinkClass("AddProduct")} ${animatedLinkClass}`}>
          Hospital Details
        </Link>
        <Link to="EditProduct" className={`${getLinkClass("EditProduct")} ${animatedLinkClass}`}>
          Edit Hospital Details
        </Link>
        <Link to="pageoverview" className={`${getLinkClass("pageoverview")} ${animatedLinkClass}`}>
          Page Overview
        </Link>
        <Link to="logout" className={`${getLinkClass("logout")} ${animatedLinkClass}`}>
          LogOut
        </Link>
      </nav>

      <main className="h-full bg-gray-400 flex-1 rounded-3xl p-6 overflow-y-auto text-white">
        <Routes>
          <Route path="AdminContent" element={<AdminDash />} />
          <Route path="AddProduct" element={<h1 className="text-3xl font-semibold">Add Hospital Details</h1>} />
          <Route path="EditProduct" element={<h1 className="text-3xl font-semibold">Edit Hospital Details</h1>} />
          <Route path="Orders" element={<h1 className="text-3xl font-semibold">Doctors</h1>} />
          <Route path="Users" element={<h1 className="text-3xl font-semibold">Users</h1>} />
          <Route path="Profile" element={<h1 className="text-3xl font-semibold">Profile</h1>} />
          <Route path="pageoverview" element={<h1 className="text-3xl font-semibold">Page Overview</h1>} />
          <Route path="logout" element={<h1 className="text-3xl font-semibold">Logging Out...</h1>} />
        </Routes>
      </main>
    </div>
  );
}
