import React, { useState } from 'react';
import axios from 'axios';

const UploadReport = () => {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('report', file);
    try {
      await axios.post('/api/reports/upload', formData);
      alert('Upload successful');
    } catch (err) {
      console.error(err);
      alert('Upload failed');
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-blue-700">Upload Medical Report</h2>
      <div className="bg-white p-6 rounded-xl shadow-md">
        <input type="file" onChange={(e) => setFile(e.target.files[0])} className="mb-4" />
        <button onClick={handleUpload} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Upload</button>
      </div>
    </div>
  );
};

export default UploadReport;