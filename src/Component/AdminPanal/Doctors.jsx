import React, { useEffect, useState } from "react";
import axios from "axios";

export function Doctors() {
  const [doctor, setDoctor] = useState({
    name: "",
    specialization: "",
    email: "",
    phone: "", 
    profile: "", 
    hospitalId: "",
  });

  const [hospitals, setHospitals] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Fetch hospitals (replace with your backend endpoint)
    axios.get("http://localhost:8080/api/hospitals")
      .then(res => setHospitals(res.data))
      .catch(() => setHospitals([]));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctor(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await axios.post("http://localhost:8080/api/doctors", doctor);
      if (res.status === 201 || res.status === 200) {
        setMessage("Doctor added successfully!");
        setDoctor({ name: "", specialization: "", email: "", phone: "", profile: "", hospitalId: "" });
      }
    } catch (err) {
      console.error("Failed to add doctor:", err);
      setMessage("Failed to add doctor. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Add Doctor</h2>

        {message && <div className="mb-4 text-center text-green-600">{message}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">Doctor Name</label>
            <input
              type="text"
              name="name"
              value={doctor.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter name"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Specialization</label>
            <input
              type="text"
              name="specialization"
              value={doctor.specialization}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. Cardiologist"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={doctor.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="doctor@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={doctor.phone}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter phone number"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Profile</label>
            <textarea
              name="profile"
              value={doctor.profile}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter profile description"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Select Hospital</label>
            <select
              name="hospitalId"
              value={doctor.hospitalId}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">-- Select Hospital --</option>
              {hospitals.map((hospital) => (
                <option key={hospital.id} value={hospital.id}>
                  {hospital.name}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            Add Doctor
          </button>
        </form>
      </div>
    </div>
  );
}

export default Doctors;
