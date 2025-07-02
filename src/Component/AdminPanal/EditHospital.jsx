import { useEffect, useState } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

export default function EditHospital() {
  const [hospitals, setHospitals] = useState([]);
  const [search, setSearch] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    location: "",
  });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch hospitals from backend with optional search
  const fetchHospitals = async (searchTerm = "") => {
    setLoading(true);
    setError("");
    try {
      const url = searchTerm
        ? `${API_BASE_URL}/hospitals/search?search=${encodeURIComponent(searchTerm)}`
        : `${API_BASE_URL}/hospitals/search`;
      const res = await axios.get(url);
      setHospitals(res.data);
    } catch (err) {
      setError("Failed to fetch hospitals.");
      toast.error("Failed to fetch hospitals.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHospitals();
  }, []);

  // Search input change
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  // Search form submit
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchHospitals(search.trim());
  };

  // Form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Add or update hospital submit
  const handleAddOrUpdateHospital = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.name || !formData.address || !formData.location) {
      setError("Please fill all fields.");
      toast.error("Please fill all fields.");
      return;
    }

    try {
      if (editId) {
        // Update hospital
        const res = await axios.put(`${API_BASE_URL}/hospitals/${editId}`, formData);
        if (res.status === 200) {
          toast.success("✅ Hospital updated successfully.");
          setEditId(null);
          setFormData({ name: "", address: "", location: "" });
          fetchHospitals(search);
        }
      } else {
        // Add new hospital
        const res = await axios.post(`${API_BASE_URL}/hospitals`, formData);
        if (res.status === 201) {
          toast.success("✅ Hospital added successfully.");
          setFormData({ name: "", address: "", location: "" });
          fetchHospitals(search);
        }
      }
    } catch (err) {
      setError("❌ Failed to save hospital.");
      toast.error("❌ Failed to save hospital.");
      console.error(err);
    }
  };

  // Edit button click
  const handleEditClick = (hospital) => {
    setEditId(hospital.id);
    setFormData({
      name: hospital.name,
      address: hospital.address,
      location: hospital.location,
    });
    setError("");
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditId(null);
    setFormData({ name: "", address: "", location: "" });
    setError("");
  };

  // Delete hospital
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this hospital?")) return;

    setError("");

    try {
      await axios.delete(`${API_BASE_URL}/hospitals/${id}`);
      toast.success("✅ Hospital deleted successfully.");
      if (editId === id) {
        handleCancelEdit();
      }
      fetchHospitals(search);
    } catch (err) {
      setError("❌ Failed to delete hospital.");
      toast.error("❌ Failed to delete hospital.");
      console.error(err);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen text-black">
      <Toaster position="top-right" reverseOrder={false} />
      
      <h1 className="text-3xl font-bold mb-6 text-center text-green-800">
        Hospital Management
      </h1>

      {/* Search */}
      <form onSubmit={handleSearchSubmit} className="max-w-4xl mx-auto mb-6 flex gap-2">
        <input
          type="text"
          placeholder="Search hospitals..."
          value={search}
          onChange={handleSearchChange}
          className="flex-grow p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 rounded hover:bg-green-700"
        >
          Search
        </button>
      </form>

      {/* Add/Edit Hospital Form */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-10 max-w-4xl mx-auto">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          {editId ? "Edit Hospital" : "Add New Hospital"}
        </h2>

        {/* Removed inline message/error display as toast handles it */}

        <form
          onSubmit={handleAddOrUpdateHospital}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end"
        >
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-600">
              Hospital Name
            </label>
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
            <label className="block mb-1 text-sm font-medium text-gray-600">
              Address
            </label>
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
            <label className="block mb-1 text-sm font-medium text-gray-600">
              Location
            </label>
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

          <div className="md:col-span-3 flex items-center gap-2">
            <button
              type="submit"
              className="bg-green-600 text-white py-2 px-6 rounded hover:bg-green-700 transition"
            >
              {editId ? "Update Hospital" : "Add Hospital"}
            </button>
            {editId && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="bg-gray-400 text-white py-2 px-6 rounded hover:bg-gray-500 transition"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Hospital List Table */}
      <div className="bg-white p-6 rounded-xl shadow-md max-w-6xl mx-auto">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Hospital List</h2>

        {loading ? (
          <p className="text-center text-gray-600">Loading hospitals...</p>
        ) : error ? (
          <p className="text-center text-red-600">{error}</p>
        ) : hospitals.length === 0 ? (
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
                  <th className="p-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {hospitals.map((hospital) => (
                  <tr
                    key={hospital.id}
                    className="border-b hover:bg-green-50 cursor-pointer"
                  >
                    <td className="p-3">{hospital.id}</td>
                    <td className="p-3 font-medium">{hospital.name}</td>
                    <td className="p-3">{hospital.address}</td>
                    <td className="p-3">{hospital.location}</td>
                    <td className="p-3 flex gap-2">
                      <button
                        onClick={() => handleEditClick(hospital)}
                        className="text-blue-600 hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(hospital.id)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
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
