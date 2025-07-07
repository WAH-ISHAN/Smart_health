import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaCalendarAlt } from 'react-icons/fa';

const BookingPage = () => {
  const [hospitals, setHospitals] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [selectedHospitalId, setSelectedHospitalId] = useState('');
  const [selectedDoctorId, setSelectedDoctorId] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTimeSlotId, setSelectedTimeSlotId] = useState('');
  const [patientName, setPatientName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetchingHospitals, setFetchingHospitals] = useState(false);
  const [fetchingDoctors, setFetchingDoctors] = useState(false);
  const [error, setError] = useState('');

  const userId = 1; // Replace with actual logged-in user id

  const timeSlots = [
    { id: 1, timeRange: '09:00 AM - 10:00 AM' },
    { id: 2, timeRange: '10:00 AM - 11:00 AM' },
    { id: 3, timeRange: '11:00 AM - 12:00 PM' },
    { id: 4, timeRange: '02:00 PM - 03:00 PM' },
    { id: 5, timeRange: '03:00 PM - 04:00 PM' },
  ];

  // Fetch hospitals on mount
  useEffect(() => {
    const fetchHospitals = async () => {
      setError('');
      setFetchingHospitals(true);
      try {
        const hospitalRes = await axios.get(import.meta.env.VITE_API_URL + '/hospitals/search');
        setHospitals(hospitalRes.data);
      } catch (err) {
        console.error('Error loading hospitals:', err);
        setError('Failed to load hospitals.');
      } finally {
        setFetchingHospitals(false);
      }
    };

    fetchHospitals();
  }, []);

  // Fetch doctors on mount
  useEffect(() => {
    const fetchDoctors = async () => {
      setError('');
      setFetchingDoctors(true);
      try {
        const doctorRes = await axios.get(import.meta.env.VITE_API_URL + '/doctor');
        setDoctors(doctorRes.data);
      } catch (err) {
        console.error('Error loading doctors:', err);
        setError('Failed to load doctors.');
        setDoctors([]);
      } finally {
        setFetchingDoctors(false);
      }
    };

    fetchDoctors();
  }, []);

  // Reset selected doctor when hospital changes
  useEffect(() => {
    setSelectedDoctorId('');
  }, [selectedHospitalId]);

  const handleBooking = async (e) => {
    e.preventDefault();

    if (!selectedHospitalId || !selectedDoctorId || !selectedDate || !selectedTimeSlotId || !patientName.trim()) {
      setError('Please fill all fields.');
      return;
    }

    setLoading(true);
    setError('');

    const payload = {
      userId,
      hospitalId: Number(selectedHospitalId),
      doctorId: Number(selectedDoctorId),
      appointmentDate: selectedDate,
      timeSlotId: Number(selectedTimeSlotId),
      patientName: patientName.trim(),
    };

    try {
      const response = await axios.post(import.meta.env.VITE_API_URL + '/appointment', payload);
      if (response.status === 201 || response.status === 200) {
        setSubmitted(true);
      } else {
        setError('Booking failed. Please try again.');
      }
    } catch (err) {
      console.error('Booking error:', err);
      setError('Server error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Filter doctors by selected hospital
  const filteredDoctors = doctors.filter(d => {
    const hospitalId = d.hospitalId ?? d.hospital?.id;
    return Number(hospitalId) === Number(selectedHospitalId);
  });

  const selectedDoctor = doctors.find(d => Number(d.id) === Number(selectedDoctorId));
  const selectedHospital = hospitals.find(h => Number(h.id) === Number(selectedHospitalId));

  if (submitted) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-green-100 p-8">
        <div className="bg-white p-6 rounded-xl text-center shadow">
          <h2 className="text-2xl text-green-700 font-bold">Booking Confirmed!</h2>
          <p className="mt-4">Thank you, {patientName}. Your appointment has been saved.</p>
          <p className="text-sm text-gray-700 mt-2">
            <strong>Doctor:</strong> {selectedDoctor?.name}<br />
            <strong>Hospital:</strong> {selectedHospital?.name}<br />
            <strong>Date:</strong> {selectedDate}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 px-4 py-2 border border-green-700 rounded text-green-700 hover:bg-green-50"
          >
            Book Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center p-4">
      <form onSubmit={handleBooking} className="bg-white rounded-xl shadow p-8 w-full max-w-lg space-y-6">
        <h1 className="text-3xl font-bold text-center text-green-800">Book Appointment</h1>

        {error && <div className="bg-red-100 text-red-600 p-3 rounded">{error}</div>}

        {/* Hospital Selection */}
        <div>
          <label className="block mb-1 font-medium">Select Hospital</label>
          {fetchingHospitals ? (
            <p>Loading hospitals...</p>
          ) : (
            <select
              value={selectedHospitalId}
              onChange={e => setSelectedHospitalId(e.target.value)}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">-- Select Hospital --</option>
              {hospitals.map(h => (
                <option key={h.id} value={h.id}>{h.name}</option>
              ))}
            </select>
          )}
        </div>

        {/* Doctor Selection */}
        <div>
          <label className="block mb-1 font-medium">Select Doctor</label>
          {fetchingDoctors ? (
            <p>Loading doctors...</p>
          ) : (
            <select
              value={selectedDoctorId}
              onChange={e => setSelectedDoctorId(e.target.value)}
              className="w-full border rounded px-3 py-2"
              disabled={!selectedHospitalId}
            >
              <option value="">-- Select Doctor --</option>
              {filteredDoctors.length > 0 ? (
                filteredDoctors.map(d => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))
              ) : (
                <option disabled>No doctors available for selected hospital</option>
              )}
            </select>
          )}
        </div>

        {/* Appointment Date */}
        <div>
          <label className="block mb-1 font-medium">Appointment Date</label>
          <div className="flex items-center gap-2">
            <FaCalendarAlt className="text-green-600" />
            <input
              type="date"
              value={selectedDate}
              onChange={e => setSelectedDate(e.target.value)}
              className="border rounded px-3 py-2 w-full"
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
        </div>

        {/* Time Slot */}
        <div>
          <label className="block mb-1 font-medium">Time Slot</label>
          <select
            value={selectedTimeSlotId}
            onChange={e => setSelectedTimeSlotId(e.target.value)}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">-- Select Time Slot --</option>
            {timeSlots.map(slot => (
              <option key={slot.id} value={slot.id}>{slot.timeRange}</option>
            ))}
          </select>
        </div>

        {/* Patient Name */}
        <div>
          <label className="block mb-1 font-medium">Your Name</label>
          <input
            type="text"
            value={patientName}
            onChange={e => setPatientName(e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="Full name"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded text-white ${loading ? 'bg-green-300' : 'bg-green-600 hover:bg-green-700'}`}
        >
          {loading ? 'Booking...' : 'Confirm Booking'}
        </button>
      </form>
    </div>
  );
};

export default BookingPage;
