import React, { useState } from 'react';
import { FaCalendarAlt } from 'react-icons/fa';
import axios from 'axios';

const hospitals = [
  { id: 1, name: 'City Hospital' },
  { id: 2, name: 'Green Valley Clinic' },
  { id: 3, name: 'Sunrise Medical Center' },
];

const doctorsByHospital = {
  1: [
    { id: 101, name: 'Dr. Anjali Perera' },
    { id: 102, name: 'Dr. Nimal Fernando' },
  ],
  2: [
    { id: 201, name: 'Dr. Tharushi Wijesinghe' },
    { id: 202, name: 'Dr. Ravi Seneviratne' },
  ],
  3: [
    { id: 301, name: 'Dr. Malith Jayasena' },
  ],
};

const availableSlots = [
  '09:00 AM', '10:00 AM', '11:00 AM',
  '01:00 PM', '02:00 PM', '03:00 PM',
];

const mockBookedSlots = {
  101: {
    '2025-06-20': ['10:00 AM', '01:00 PM'],
    '2025-06-21': ['09:00 AM'],
  },
  102: {
    '2025-06-20': ['11:00 AM'],
  },
  201: {},
  202: {
    '2025-06-20': ['09:00 AM', '02:00 PM'],
  },
  301: {
    '2025-06-20': ['03:00 PM'],
  },
};

export default function BookingPage() {
  const [selectedHospitalId, setSelectedHospitalId] = useState('');
  const [selectedDoctorId, setSelectedDoctorId] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [patientName, setPatientName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const doctors = selectedHospitalId ? doctorsByHospital[Number(selectedHospitalId)] || [] : [];
  const selectedDoctor = doctors.find(d => d.id === Number(selectedDoctorId)) || null;
  const bookedSlots = (selectedDoctorId && selectedDate)
    ? mockBookedSlots[Number(selectedDoctorId)]?.[selectedDate] || []
    : [];

  const canSubmit = selectedHospitalId && selectedDoctorId && selectedDate && selectedSlot && patientName.trim();

  const handleHospitalChange = (e) => {
    setSelectedHospitalId(e.target.value);
    setSelectedDoctorId('');
    setSelectedDate('');
    setSelectedSlot('');
    setErrorMessage('');
  };

  const handleDoctorChange = (e) => {
    setSelectedDoctorId(e.target.value);
    setSelectedDate('');
    setSelectedSlot('');
    setErrorMessage('');
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    setSelectedSlot('');
    setErrorMessage('');
  };

  const handleSlotClick = (slot) => {
    if (!bookedSlots.includes(slot)) {
      setSelectedSlot(slot);
      setErrorMessage('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;

    setLoading(true);
    setErrorMessage('');

    const bookingData = {
      hospitalId: Number(selectedHospitalId),
      doctorId: Number(selectedDoctorId),
      date: selectedDate,
      timeSlot: selectedSlot,
      patientName: patientName.trim(),
    };

    try {
      const response = await axios.post('http://localhost:8080/api/bookings', bookingData);

      if (response.status === 201 || response.status === 200) {
        setSubmitted(true);
      } else {
        setErrorMessage('Booking failed. Please try again.');
      }
    } catch (error) {
      if (error.response?.data?.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('Server error. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    const hospitalName = hospitals.find(h => h.id === Number(selectedHospitalId))?.name || '';
    return (
      <div className="min-h-screen bg-green-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-md max-w-md text-center">
          <h2 className="text-2xl font-bold text-green-700 mb-4">Booking Confirmed!</h2>
          <p className="text-gray-700 mb-2">Thank you, {patientName}.</p>
          <p className="text-gray-700 mb-4">
            Your appointment with {selectedDoctor?.name} at {hospitalName} on {selectedDate} at {selectedSlot} is booked.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 border border-green-600 text-green-600 rounded hover:bg-green-50 transition focus:outline-none focus:ring-2 focus:ring-green-600"
          >
            Book Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex flex-col items-center justify-start p-4">
      {/* Doctor Schedule Display */}
      {selectedDoctorId && selectedDate && (
        <div className="bg-white p-6 rounded-xl shadow-md mb-6 max-w-lg w-full">
          <h2 className="text-xl font-bold text-green-800 mb-2">Doctor's Schedule</h2>
          <p className="text-gray-700 mb-4">
            <strong>{selectedDoctor?.name}</strong> on <strong>{selectedDate}</strong>
          </p>
          <ul className="list-disc list-inside text-gray-700">
            {bookedSlots.length > 0 ? (
              bookedSlots.map((slot, index) => (
                <li key={index} className="text-red-600">{slot} (Booked)</li>
              ))
            ) : (
              <li className="text-green-600">No bookings yet for this day.</li>
            )}
          </ul>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg max-w-lg w-full space-y-6"
        aria-label="Book an appointment form"
      >
        <h1 className="text-3xl font-extrabold text-center text-green-800">
          Book an Appointment
        </h1>

        {errorMessage && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-center" role="alert">
            {errorMessage}
          </div>
        )}

        <div>
          <label htmlFor="hospital" className="block text-gray-700 mb-2 font-semibold">
            Select Hospital
          </label>
          <select
            id="hospital"
            value={selectedHospitalId}
            onChange={handleHospitalChange}
            className="w-full border border-green-300 rounded px-4 py-2 focus:ring-2 focus:ring-green-500"
            required
            aria-required="true"
          >
            <option value="" disabled>-- Select Hospital --</option>
            {hospitals.map(hospital => (
              <option key={hospital.id} value={hospital.id}>{hospital.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="doctor" className="block text-gray-700 mb-2 font-semibold">
            Select Doctor
          </label>
          <select
            id="doctor"
            value={selectedDoctorId}
            onChange={handleDoctorChange}
            className="w-full border border-green-300 rounded px-4 py-2 focus:ring-2 focus:ring-green-500"
            required
            disabled={!selectedHospitalId}
            aria-required="true"
          >
            <option value="" disabled>-- Select Doctor --</option>
            {doctors.map(doc => (
              <option key={doc.id} value={doc.id}>{doc.name}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center space-x-4">
          <FaCalendarAlt className="text-green-500 text-xl" aria-hidden="true" />
          <input
            id="date"
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            className="w-full border border-green-300 rounded px-4 py-2 focus:ring-2 focus:ring-green-500"
            required
            disabled={!selectedDoctorId}
            min={new Date().toISOString().split('T')[0]}
            aria-required="true"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2 font-semibold">Select Time Slot</label>
          <div className="grid grid-cols-3 gap-3" role="list" aria-label="Available time slots">
            {availableSlots.map(slot => {
              const isBooked = bookedSlots.includes(slot);
              return (
                <button
                  key={slot}
                  type="button"
                  onClick={() => handleSlotClick(slot)}
                  className={`px-3 py-2 rounded-full border 
                    ${selectedSlot === slot ? 'bg-green-600 text-white' : 'border-green-300 text-green-600'} 
                    ${isBooked ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-50 cursor-pointer'}
                    focus:outline-none focus:ring-2 focus:ring-green-600
                  `}
                  disabled={isBooked}
                  aria-disabled={isBooked}
                  aria-pressed={selectedSlot === slot}
                >
                  {slot}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label htmlFor="patientName" className="block text-gray-700 mb-2 font-semibold">
            Patient Name
          </label>
          <input
            id="patientName"
            type="text"
            placeholder="Your Full Name"
            value={patientName}
            onChange={e => setPatientName(e.target.value)}
            className="w-full border border-green-300 rounded px-4 py-2 focus:ring-2 focus:ring-green-500"
            required
            aria-required="true"
          />
        </div>

        <button
          type="submit"
          disabled={!canSubmit || loading}
          className={`w-full px-4 py-3 rounded-xl text-lg transition
            ${canSubmit && !loading ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-green-300 text-green-600 cursor-not-allowed'}
          `}
          aria-busy={loading}
        >
          {loading ? 'Booking...' : 'Confirm Booking'}
        </button>
      </form>
    </div>
  );
}
