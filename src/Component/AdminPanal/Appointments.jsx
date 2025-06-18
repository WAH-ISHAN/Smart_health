import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AppointmentsManager() {
  const [appointments, setAppointments] = useState([]);
  const [search, setSearch] = useState('');

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

  const filteredAppointments = appointments.filter((a) =>
    `${a.customer_name} ${a.service_type}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Appointments Manager
      </h2>

      {/* Search Bar */}
      <div className="flex items-center bg-white shadow rounded-md p-3 mb-6 w-full md:w-1/2 mx-auto">
        <input
          type="text"
          className="w-full outline-none"
          placeholder="Search appointments..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto shadow rounded-xl bg-white max-w-6xl mx-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3 text-left">#</th>
              <th className="p-3 text-left">Customer</th>
              <th className="p-3 text-left">Service</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Time</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Change Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.length > 0 ? (
              filteredAppointments.map((appt, index) => (
                <tr key={appt.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3">{appt.customer_name}</td>
                  <td className="p-3">{appt.service_type}</td>
                  <td className="p-3">{appt.appointment_date}</td>
                  <td className="p-3">{appt.appointment_time}</td>
                  <td className="p-3">
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded-full ${
                        appt.status === 'Completed'
                          ? 'bg-green-100 text-green-800'
                          : appt.status === 'Pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : appt.status === 'Rejected'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {appt.status}
                    </span>
                  </td>
                  <td className="p-3">
                    <select
                      value={appt.status}
                      onChange={(e) =>
                        handleStatusChange(appt.id, e.target.value)
                      }
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
                <td colSpan="7" className="text-center p-6 text-gray-500">
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
