import React, { useEffect, useState } from "react";
import axios from "axios";

const ViewReports = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/reports")
      .then((res) => setReports(res.data))
      .catch((err) => console.error("Failed to fetch reports:", err));
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-blue-700">My Medical Reports</h2>

      <div className="grid gap-4">
        {reports.length === 0 ? (
          <p className="text-gray-600">No reports available.</p>
        ) : (
          reports.map((report, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-xl shadow border border-gray-200"
            >
              <p className="text-gray-800 font-semibold">
                📄 {report.filename}
              </p>
              <p className="text-sm text-gray-500 mb-2">
                Uploaded by: {report.uploadedBy} | Date:{" "}
                {report.uploadDate?.slice(0, 10)}
              </p>
              <a
                href={`http://localhost:8080/reports/download/${report.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 text-blue-600 hover:underline"
              >
                View / Download Report
              </a>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ViewReports;
