import { Link, Route, Routes, useLocation } from "react-router-dom";
import  AdminDash  from "./AdminDash";
import  Doctors  from "./Doctors";
import { Patients } from "./Patients";
import ManageUsersAdminPanel from "./ManageUsersAdminPanel";
import EditHospital from "./EditHospital";
import ViewFeedback from "./ViewFeedback";
import AppointmentsManager from "./Appointments";
import ReportsViewer from "./ReportView";

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
          Dashboard Overview
        </Link>
        <Link to="/AdminHome/ManageUsers" className={`${getLinkClass("ManageUsers")} ${animatedLinkClass}`}>
           Manage Users
        </Link>
        
        <Link to="/AdminHome/Doctors" className={`${getLinkClass("Doctors")} ${animatedLinkClass}`}>
           Manage Doctors
        </Link>
        <Link to="/AdminHome/EditHospital" className={`${getLinkClass("EditHospital")} ${animatedLinkClass}`}>
         Manage Hospitals
        </Link>
        
        <Link to="/AdminHome/appointments" className={`${getLinkClass("appointments")} ${animatedLinkClass}`}>
           Manage Appointments
        </Link>
        <Link to="/AdminHome/ViewFeedback" className={`${getLinkClass("ViewFeedback")} ${animatedLinkClass}`}>
           View Feedback
        </Link>
        <Link to="/AdminHome/ReportsViewer" className={`${getLinkClass("ReportsViewer")} ${animatedLinkClass}`}>
          Reports Viewer
        </Link>
      </nav>

  
      <main className="h-full bg-gray-400 flex-1 rounded-3xl p-6 overflow-y-auto text-white">
        <Routes>
          <Route path="AdminDash" element={<AdminDash />} />
          <Route path="Patients" element={<Patients />} />
          <Route path="ViewFeedback" element={<ViewFeedback/>} />
          <Route path="ReportsViewer" element={<ReportsViewer />} />
          <Route path="appointments" element={<AppointmentsManager/>} />
          <Route path="Doctors" element={<Doctors />} />
          <Route path="EditHospital" element={<EditHospital />} />
          <Route path="ManageUsers" element={<ManageUsersAdminPanel/>} />
          <Route path="logout" element={<h1 className="text-3xl font-semibold">Logging Out...</h1>} />
        </Routes>
      </main>
    </div>
  );
}
