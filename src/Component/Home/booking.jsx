import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaCalendarAlt } from 'react-icons/fa';

const BookingPage = () => {
  /* ──────────────────── State ──────────────────── */
  const [hospitals, setHospitals]     = useState([]);
  const [doctors, setDoctors]         = useState([]);

  const [selectedHospitalId, setSelectedHospitalId] = useState('');
  const [selectedDoctorId,   setSelectedDoctorId]   = useState('');
  const [selectedDate,       setSelectedDate]       = useState('');
  const [selectedTimeSlotId, setSelectedTimeSlotId] = useState('');
  const [patientName,        setPatientName]        = useState('');

  const [submitted,         setSubmitted]        = useState(false);
  const [loading,           setLoading]          = useState(false);
  const [fetchingHospitals, setFetchingHospitals]= useState(false);
  const [fetchingDoctors,   setFetchingDoctors]  = useState(false);
  const [error,             setError]            = useState('');

  const userId = 1; // ── replace with actual logged‑in user id

  /* Dummy static time‑slot list */
  const timeSlots = [
    { id: 1, timeRange: '09:00 AM - 10:00 AM' },
    { id: 2, timeRange: '10:00 AM - 11:00 AM' },
    { id: 3, timeRange: '11:00 AM - 12:00 PM' },
    { id: 4, timeRange: '02:00 PM - 03:00 PM' },
    { id: 5, timeRange: '03:00 PM - 04:00 PM' },
  ];

  /* ──────────────────── 1. Load hospital list ──────────────────── */
  useEffect(() => {
    const fetchHospitals = async () => {
      setError('');
      setFetchingHospitals(true);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/hospitals/search`
        );
        setHospitals(res.data);
      } catch (err) {
        console.error('Error loading hospitals:', err);
        setError('Failed to load hospitals.');
      } finally {
        setFetchingHospitals(false);
      }
    };
    fetchHospitals();
  }, []);

  /* ──────────────────── 2. Load doctors when hospital changes ──────────────────── */
  useEffect(() => {
    if (!selectedHospitalId) {
      setDoctors([]);
      setSelectedDoctorId('');
      return;
    }

    /**
     * fetchDoctors() – uses hospital **name** (not ID) because
     * backend endpoint = `/api/doctor/hospital/{hospitalName}`
     */
    const fetchDoctors = async (hospitalName) => {
      setError('');
      setFetchingDoctors(true);
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/doctor/hospital/${encodeURIComponent(
            hospitalName
          )}`
        );
        if (!res.ok) throw new Error('Network response was not ok');
        const doctorArray = await res.json(); // returns []
        setDoctors(doctorArray);
      } catch (err) {
        console.error('Error loading doctors:', err);
        setError('Failed to load doctors for selected hospital.');
        setDoctors([]);
      } finally {
        setFetchingDoctors(false);
      }
    };

    // look up selected hospital's *name* from its id
    const chosenHospital = hospitals.find(
      (h) => Number(h.id) === Number(selectedHospitalId)
    );
    if (chosenHospital?.name) {
      fetchDoctors(chosenHospital.name);
    }
    setSelectedDoctorId('');
  }, [selectedHospitalId, hospitals]);

  /* ──────────────────── 3. Submit booking ──────────────────── */
  const handleBooking = async (e) => {
    e.preventDefault();
    if (
      !selectedHospitalId ||
      !selectedDoctorId ||
      !selectedDate ||
      !selectedTimeSlotId ||
      !patientName.trim()
    ) {
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
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/appointment`,
        payload
      );
      if (res.status === 200 || res.status === 201) {
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

  /* helpers for confirmation screen */
  const selectedDoctor = doctors.find(
    (d) => Number(d.id) === Number(selectedDoctorId)
  );
  const selectedHospital = hospitals.find(
    (h) => Number(h.id) === Number(selectedHospitalId)
  );

  /* ──────────────────── 4. Confirmation Screen ──────────────────── */
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

  /* ──────────────────── 5. Booking Form ──────────────────── */
  return (
    <div className="min-h-screen bg-gray-50 flex justify-center p-4">
      <form
        onSubmit={handleBooking}
        className="bg-white rounded-xl shadow p-8 w-full max-w-lg space-y-6"
      >
        <h1 className="text-3xl font-bold text-center text-green-800">Book Appointment</h1>

        {error && <div className="bg-red-100 text-red-600 p-3 rounded">{error}</div>}

        {/* Hospital Dropdown */}
        <div>
          <label className="block mb-1 font-medium">Select Hospital</label>
          {fetchingHospitals ? (
            <p>Loading hospitals...</p>
          ) : (
            <select
              value={selectedHospitalId}
              onChange={(e) => setSelectedHospitalId(e.target.value)}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">-- Select Hospital --</option>
              {hospitals.map((h) => (
                <option key={h.id} value={h.id}>
                  {h.name}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Doctor Dropdown */}
        <div>
          <label className="block mb-1 font-medium">Select Doctor</label>
          {fetchingDoctors ? (
            <p>Loading doctors...</p>
          ) : (
            <select
              value={selectedDoctorId}
              onChange={(e) => setSelectedDoctorId(e.target.value)}
              className="w-full border rounded px-3 py-2"
              disabled={!selectedHospitalId || doctors.length === 0}
            >
              <option value="">-- Select Doctor --</option>
              {doctors.length > 0 ? (
                doctors.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
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
              onChange={(e) => setSelectedDate(e.target.value)}
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
            onChange={(e) => setSelectedTimeSlotId(e.target.value)}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">-- Select Time Slot --</option>
            {timeSlots.map((slot) => (
              <option key={slot.id} value={slot.id}>
                {slot.timeRange}
              </option>
            ))}
          </select>
        </div>

        {/* Patient Name */}
        <div>
          <label className="block mb-1 font-medium">Your Name</label>
          <input
            type="text"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="Full name"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded text-white ${
            loading ? 'bg-green-300' : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {loading ? 'Booking...' : 'Confirm Booking'}
        </button>
      </form>
    </div>
  );
};

export default BookingPage;
