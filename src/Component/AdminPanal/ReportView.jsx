import { useState, useEffect } from "react";
import { FaDownload, FaPrint, FaSearch, FaEye } from "react-icons/fa";

export default function ReportsViewer() {
  const [search, setSearch] = useState("");
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch reports from backend
  useEffect(() => {
    fetch("http://localhost:8080/reports")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch reports");
        return res.json();
      })
      .then((data) => {
        setReports(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching reports:", err);
        setLoading(false);
      });
  }, []);

  // Filter reports by filename or uploadedBy (search input)
  const filteredReports = reports.filter((r) =>
    (r.filename + " " + r.uploadedBy).toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl font-bold">SmartHealth Reports Viewer</h1>
      </header>

      {/* Main Content */}
      <main className="flex-grow p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Reports Viewer</h1>

        {/* Search Bar */}
        <div className="flex items-center bg-white shadow rounded-md p-3 mb-6 w-full md:w-1/2">
          <FaSearch className="text-gray-400 mr-2" />
          <input
            type="text"
            className="w-full outline-none"
            placeholder="Search by filename or uploader..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Table */}
        <div className="bg-white shadow rounded-xl overflow-hidden">
          {loading ? (
            <div className="text-center p-6 text-gray-500">Loading reports...</div>
          ) : filteredReports.length > 0 ? (
            <table className="min-w-full text-sm">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="p-3">#</th>
                  <th className="p-3">Title</th>
                  <th className="p-3">Uploaded By</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredReports.map((report, index) => (
                  <tr key={report.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">{index + 1}</td>
                    <td className="p-3 font-medium">{report.filename}</td>
                    <td className="p-3">{report.uploadedBy}</td>
                    <td className="p-3">{report.uploadDate?.slice(0, 10)}</td>
                    <td className="p-3">
                      <span className="text-xs font-semibold px-2 py-1 rounded-full bg-green-100 text-green-800">
                        Completed
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <div className="flex justify-center gap-2">
                        <a
                          href={`http://localhost:8080/reports/download/${report.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-green-600 hover:text-green-800"
                          title="Download"
                        >
                          <FaDownload />
                        </a>
                        <button
                          className="text-gray-600 hover:text-gray-800"
                          onClick={() => window.print()}
                          title="Print"
                        >
                          <FaPrint />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center p-6 text-gray-500">No reports found.</div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-200 text-center p-4">
        <p className="text-gray-600">© 2025 SmartHealth. All rights reserved.</p>
      </footer>
    </div>
  );
}
