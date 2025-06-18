import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AppointmentsManager() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get('/api/appointments');

      const data = response.data;
      const appointmentsArray = Array.isArray(data)
        ? data
        : Array.isArray(data.data)
        ? data.data
        : [];

      setAppointments(appointmentsArray);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.post('/api/appointments/update', {
        appointment_id: id,
        status: newStatus
      });
      fetchAppointments();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Appointments Manager</h2>
      <div className="overflow-x-auto shadow rounded-lg border border-gray-200">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="py-3 px-4 text-left">ID</th>
              <th className="py-3 px-4 text-left">Customer</th>
              <th className="py-3 px-4 text-left">Service</th>
              <th className="py-3 px-4 text-left">Date</th>
              <th className="py-3 px-4 text-left">Time</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Change Status</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(appointments) && appointments.length > 0 ? (
              appointments.map((appt) => (
                <tr key={appt.id} className="border-t hover:bg-gray-50">
                  <td className="py-3 px-4">{appt.id}</td>
                  <td className="py-3 px-4">{appt.customer_name}</td>
                  <td className="py-3 px-4">{appt.service_type}</td>
                  <td className="py-3 px-4">{appt.appointment_date}</td>
                  <td className="py-3 px-4">{appt.appointment_time}</td>
                  <td className="py-3 px-4">{appt.status}</td>
                  <td className="py-3 px-4">
                    <select
                      value={appt.status}
                      onChange={(e) => handleStatusChange(appt.id, e.target.value)}
                      className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approved</option>
                      <option value="Rejected">Rejected</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-6 text-gray-500">
                  No appointments found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AppointmentsManager;
