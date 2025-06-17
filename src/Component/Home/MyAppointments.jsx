
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    axios.get('/api/appointments')
      .then(res => setAppointments(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-blue-700">My Appointments</h2>
      <div className="grid gap-4">
        {appointments.map((a, i) => (
          <div key={i} className="bg-white shadow-lg rounded-xl p-4">
            <p><strong>Doctor:</strong> {a.doctorName}</p>
            <p><strong>Hospital:</strong> {a.hospitalName}</p>
            <p><strong>Date:</strong> {new Date(a.date).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;






