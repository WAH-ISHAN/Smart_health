import React, { useEffect, useState } from "react";
import axios from "axios";

export function Doctors() {
  const [doctor, setDoctor] = useState({
    name: "",
    specialization: "",
    email: "",
    hospitalId: "",
  });

  const [hospitals, setHospitals] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/hospitals")
      .then((res) => setHospitals(res.data))
      .catch(() => setHospitals([]));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctor((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await axios.post("http://localhost:8080/api/doctors", doctor);
      if (res.status === 201 || res.status === 200) {
        setMessage("✅ Doctor added successfully!");
        setDoctor({ name: "", specialization: "", email: "", hospitalId: "" });
      }
    } catch (err) {
      console.error("Failed to add doctor:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-xl">
        <h1 className="text-3xl font-bold text-green-800 mb-6 text-center">
          Add Doctor
        </h1>

        {message && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 text-center rounded shadow">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Doctor Name
            </label>
            <input
              type="text"
              name="name"
              value={doctor.name}
              onChange={handleChange}
              placeholder="Dr. John Doe"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Specialization
            </label>
            <input
              type="text"
              name="specialization"
              value={doctor.specialization}
              onChange={handleChange}
              placeholder="Cardiologist"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={doctor.email}
              onChange={handleChange}
              placeholder="doctor@example.com"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Hospital
            </label>
            <select
              name="hospitalId"
              value={doctor.hospitalId}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            >
              <option value="">-- Choose Hospital --</option>
              {hospitals.map((hospital) => (
                <option key={hospital.id} value={hospital.id}>
                  {hospital.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
            >
              Add Doctor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Doctors;
