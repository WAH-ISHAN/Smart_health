import { useEffect, useState } from "react";
import axios from "axios";

export default function EditHospital() {
  const [hospitals, setHospitals] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    location: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchHospitals();
  }, []);

  const fetchHospitals = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/hospitals");
      setHospitals(res.data);
    } catch (error) {
      console.error("Failed to fetch hospitals:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddHospital = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await axios.post("http://localhost:8080/api/hospitals", formData);
      if (res.status === 201 || res.status === 200) {
        setMessage("Hospital added successfully.");
        setFormData({ name: "", address: "", location: "" });
        fetchHospitals();
      }
    } catch (err) {
      console.error("Failed to add hospital:", err);
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-green-800">Hospital Management</h1>

      {/* Add Hospital Form */}
      <div className="bg-gray-600 p-6 rounded-xl shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Add New Hospital</h2>

        {message && (
          <div className="mb-4 text-center text-green-600">{message}</div>
        )}

        <form onSubmit={handleAddHospital} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Hospital Name"
            className="border p-2 rounded w-full"
            required
          />
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
            className="border p-2 rounded w-full"
            required
          />
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Location"
            className="border p-2 rounded w-full"
            required
          />
          <button
            type="submit"
            className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 col-span-full md:col-auto"
          >
            Add Hospital
          </button>
        </form>
      </div>

      {/* Hospital List */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">Hospital List</h2>
        {hospitals.length === 0 ? (
          <p className="text-gray-500">No hospitals found.</p>
        ) : (
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-green-100 text-left">
                <th className="p-3 border">ID</th>
                <th className="p-3 border">Name</th>
                <th className="p-3 border">Address</th>
                <th className="p-3 border">Location</th>
              </tr>
            </thead>
            <tbody>
              {hospitals.map((hospital) => (
                <tr key={hospital.id} className="border-t hover:bg-green-50">
                  <td className="p-3 border">{hospital.id}</td>
                  <td className="p-3 border">{hospital.name}</td>
                  <td className="p-3 border">{hospital.address}</td>
                  <td className="p-3 border">{hospital.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
