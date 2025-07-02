import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function DoctorSchedulePage() {
  const [hospitals, setHospitals] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [bookedSlots, setBookedSlots] = useState([]);

  const [hospitalId, setHospitalId] = useState('');
  const [doctorId, setDoctorId] = useState('');
  const [date, setDate] = useState('');

  const availableSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM',
    '01:00 PM', '02:00 PM', '03:00 PM',
  ];

  // Load hospitals on page load
  useEffect(() => {
    axios.get(import.meta.env.VITE_API_URL + "/hospitals")
      .then(res => setHospitals(res.data))
      .catch(err => console.error('Hospital fetch error:', err));
  }, []);

  // Load doctors when hospitalId changes
  useEffect(() => {
    if (hospitalId) {
      axios.get(import.meta.env.VITE_API_URL + `/doctors/${hospitalId}`)
        .then(res => setDoctors(res.data))
        .catch(err => console.error('Doctor fetch error:', err));
    } else {
      setDoctors([]);
    }
    setDoctorId('');
    setDate('');
    setBookedSlots([]);
  }, [hospitalId]);

  // Load booked slots when doctorId and date selected
  useEffect(() => {
    if (doctorId && date) {
      axios.get(import.meta.env.VITE_API_URL + `/appointments/${doctorId}/${date}`)
        .then(res => setBookedSlots(res.data))
        .catch(err => console.error('Slot fetch error:', err));
    } else {
      setBookedSlots([]);
    }
  }, [doctorId, date]);

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-xl w-full space-y-6">
        <h1 className="text-3xl font-bold text-center text-blue-700">Doctor's Schedule Viewer</h1>

        {/* Hospital Select */}
        <div>
          <label className="block font-semibold text-gray-700 mb-1">Select Hospital</label>
          <select
            value={hospitalId}
            onChange={e => setHospitalId(e.target.value)}
            className="w-full border border-blue-300 rounded px-4 py-2 focus:ring-2 focus:ring-blue-500"
          >
            <option value="">-- Select Hospital --</option>
            {hospitals.map(h => (
              <option key={h.id} value={h.id}>{h.name}</option>
            ))}
          </select>
        </div>

        {/* Doctor Select */}
        <div>
          <label className="block font-semibold text-gray-700 mb-1">Select Doctor</label>
          <select
            value={doctorId}
            onChange={e => setDoctorId(e.target.value)}
            className="w-full border border-blue-300 rounded px-4 py-2 focus:ring-2 focus:ring-blue-500"
            disabled={!hospitalId}
          >
            <option value="">-- Select Doctor --</option>
            {doctors.map(doc => (
              <option key={doc.id} value={doc.id}>{doc.name}</option>
            ))}
          </select>
        </div>

        {/* Date Picker */}
        <div>
          <label className="block font-semibold text-gray-700 mb-1">Select Date</label>
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            className="w-full border border-blue-300 rounded px-4 py-2 focus:ring-2 focus:ring-blue-500"
            disabled={!doctorId}
          />
        </div>

        {/* Display Slots */}
        {doctorId && date && (
          <div>
            <h2 className="text-xl font-bold text-blue-600 mb-2">Time Slots on {date}</h2>
            <div className="grid grid-cols-3 gap-3">
              {availableSlots.map(slot => {
                const isBooked = bookedSlots.includes(slot);
                return (
                  <div
                    key={slot}
                    className={`px-3 py-2 rounded-full border text-center
                      ${isBooked ? 'bg-red-100 text-red-600 border-red-300' : 'bg-green-100 text-green-700 border-green-300'}`}
                  >
                    {slot} {isBooked ? '(Booked)' : '(Available)'}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
