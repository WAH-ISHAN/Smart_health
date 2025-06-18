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
        setMessage("✅ Hospital added successfully.");
        setFormData({ name: "", address: "", location: "" });
        fetchHospitals();
      }
    } catch (err) {
      console.error("Failed to add hospital:", err);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-green-800">Hospital Management</h1>

      {/* Add Hospital Form */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-10 max-w-4xl mx-auto">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Add New Hospital</h2>

        {message && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded text-center shadow">
            {message}
          </div>
        )}

        <form
          onSubmit={handleAddHospital}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end"
        >
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-600">Hospital Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-600">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Address"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-600">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Location"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div className="md:col-span-3">
            <button
              type="submit"
              className="bg-green-600 text-white py-2 px-6 rounded hover:bg-green-700 transition"
            >
              Add Hospital
            </button>
          </div>
        </form>
      </div>

      {/* Hospital List Table */}
      <div className="bg-white p-6 rounded-xl shadow-md max-w-6xl mx-auto">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Hospital List</h2>

        {hospitals.length === 0 ? (
          <p className="text-gray-500 text-center">No hospitals found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border border-gray-200">
              <thead className="bg-green-600 text-white">
                <tr>
                  <th className="p-3 text-left">ID</th>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Address</th>
                  <th className="p-3 text-left">Location</th>
                </tr>
              </thead>
              <tbody>
                {hospitals.map((hospital) => (
                  <tr key={hospital.id} className="border-b hover:bg-green-50">
                    <td className="p-3">{hospital.id}</td>
                    <td className="p-3 font-medium">{hospital.name}</td>
                    <td className="p-3">{hospital.address}</td>
                    <td className="p-3">{hospital.location}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
