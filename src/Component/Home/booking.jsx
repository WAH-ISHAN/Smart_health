import React, { useState } from 'react';
import { FaCalendarAlt, FaClock, FaUserMd } from 'react-icons/fa';

const availableSlots = [
  '09:00 AM', '10:00 AM', '11:00 AM',
  '01:00 PM', '02:00 PM', '03:00 PM',
];

export default function BookingPage() {
  const [selectedDoctor, setSelectedDoctor] = useState('Dr. Anjali Perera');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [patientName, setPatientName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Integrate with backend via axios/post
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-green-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-md max-w-md text-center">
          <h2 className="text-2xl font-bold text-green-700 mb-4">Booking Confirmed!</h2>
          <p className="text-gray-700 mb-2">Thank you, {patientName}.</p>
          <p className="text-gray-700 mb-4">
            Your appointment with {selectedDoctor} on {selectedDate} at {selectedSlot} is booked.
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 border border-green-600 text-green-600 rounded hover:bg-green-50 transition"
          >
            Book Another
n          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center">
      <form 
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg max-w-lg w-full space-y-6"
      >
        <h1 className="text-3xl font-extrabold text-center text-green-800">
          Book an Appointment
        </h1>

        {/* Doctor Selection */}
        <div>
          <label className="block text-gray-700 mb-2">Select Doctor</label>
          <select
            value={selectedDoctor}
            onChange={e => setSelectedDoctor(e.target.value)}
            className="w-full border border-green-300 rounded px-4 py-2 focus:ring-2 focus:ring-green-500"
          >
            <option>Dr. Anjali Perera</option>
            <option>Dr. Nimal Fernando</option>
            <option>Dr. Tharushi Wijesinghe</option>
            <option>Dr. Ravi Seneviratne</option>
          </select>
        </div>

        {/* Date Picker */}
        <div className="flex items-center space-x-4">
          <FaCalendarAlt className="text-green-500 text-xl" />
          <input
            type="date"
            value={selectedDate}
            onChange={e => setSelectedDate(e.target.value)}
            className="w-full border border-green-300 rounded px-4 py-2 focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        {/* Time Slot Selection */}
        <div>
          <label className="block text-gray-700 mb-2">Select Time Slot</label>
          <div className="grid grid-cols-3 gap-3">
            {availableSlots.map(slot => (
              <button
                key={slot}
                type="button"
                onClick={() => setSelectedSlot(slot)}
                className={`px-3 py-2 rounded-full border ${
                  selectedSlot === slot ? 'bg-green-600 text-white' : 'border-green-300 text-green-600'
                } hover:bg-green-50 transition`}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>

        {/* Patient Name */}
        <div>
          <label className="block text-gray-700 mb-2">Patient Name</label>
          <input
            type="text"
            placeholder="Your Full Name"
            value={patientName}
            onChange={e => setPatientName(e.target.value)}
            className="w-full border border-green-300 rounded px-4 py-2 focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-600 text-white px-4 py-3 rounded-xl text-lg hover:bg-green-700 transition"
        >
          Confirm Booking
        </button>
      </form>
    </div>
  );
}
