import { useState } from "react";
import { FaDownload, FaPrint, FaSearch, FaEye } from "react-icons/fa";

const reports = [
  {
    id: 1,
    title: "Blood Test Report",
    patient: "Nimal Perera",
    date: "2025-06-15",
    status: "Completed",
  },
  {
    id: 2,
    title: "X-Ray Report",
    patient: "Sunil De Silva",
    date: "2025-06-12",
    status: "Pending",
  },
];

export default function ReportsViewer() {
  const [search, setSearch] = useState("");

  const filteredReports = reports.filter((r) =>
    (r.title + " " + r.patient).toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Reports Viewer</h1>

      {/* Search Bar */}
      <div className="flex items-center bg-white shadow rounded-md p-3 mb-6 w-full md:w-1/2">
        <FaSearch className="text-gray-400 mr-2" />
        <input
          type="text"
          className="w-full outline-none"
          placeholder="Search reports..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="bg-white shadow rounded-xl overflow-hidden">
        <table className="min-w-full text-sm">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3">#</th>
              <th className="p-3">Title</th>
              <th className="p-3">Patient</th>
              <th className="p-3">Date</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredReports.length > 0 ? (
              filteredReports.map((report, index) => (
                <tr key={report.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3 font-medium">{report.title}</td>
                  <td className="p-3">{report.patient}</td>
                  <td className="p-3">{report.date}</td>
                  <td className="p-3">
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded-full ${
                        report.status === "Completed"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {report.status}
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    <div className="flex justify-center gap-2">
                      <button className="text-blue-600 hover:text-blue-800">
                        <FaEye />
                      </button>
                      <button className="text-green-600 hover:text-green-800">
                        <FaDownload />
                      </button>
                      <button className="text-gray-600 hover:text-gray-800">
                        <FaPrint />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center p-4 text-gray-500">
                  No reports found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}