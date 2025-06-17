import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewReports = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    axios.get('/api/reports')
      .then(res => setReports(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-blue-700">My Medical Reports</h2>
      <div className="grid gap-4">
        {reports.map((report, index) => (
          <div key={index} className="bg-white p-4 rounded-xl shadow">
            <p><strong>File:</strong> {report.filename}</p>
            <a href={report.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewReports;