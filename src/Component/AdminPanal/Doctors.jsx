import React, { useState, useEffect } from "react";
import axios from "axios";

export function AddDoctor() {
  const [doctors, setDoctors] = useState([]);
  const [doctor, setDoctor] = useState({
    name: "",
    gender: "",
    speciality: "",
    hospital: "",
    status: "",
  });
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingDoctors, setLoadingDoctors] = useState(false);
  const [error, setError] = useState("");

  // Get auth header config with token
  const getAuthConfig = () => {
    const token = localStorage.getItem("token");
    return {
      headers: { Authorization: `Bearer ${token}` },
    };
  };

  // Fetch doctors from backend on component mount
  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    setLoadingDoctors(true);
    setError("");
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/doctor`,
        getAuthConfig()
      );
      setDoctors(res.data);
    } catch (err) {
      setError("❌ Failed to load doctors.");
      console.error(err);
    } finally {
      setLoadingDoctors(false);
    }
  };

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctor((prev) => ({ ...prev, [name]: value }));
    setMessage(""); // Clear any existing messages on input change
  };

  // Handle form submission (add or update doctor)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("❌ You must be logged in to add or edit a doctor.");
      setLoading(false);
      return;
    }

    try {
      if (editId !== null) {
        // Update existing doctor
        const res = await axios.put(
          `${import.meta.env.VITE_API_URL}/doctor/${editId}`,
          doctor,
          getAuthConfig()
        );
        if (res.status === 200) {
          setMessage("✅ Doctor updated successfully!");
          setEditId(null);
          setDoctor({
            name: "",
            gender: "",
            speciality: "",
            hospital: "",
            status: "",
          });
          fetchDoctors();
        }
      } else {
        // Create new doctor
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/doctor`,
          doctor,
          getAuthConfig()
        );
        if (res.status === 201 || res.status === 200) {
          setMessage("✅ Doctor added successfully!");
          setDoctor({
            name: "",
            gender: "",
            speciality: "",
            hospital: "",
            status: "",
          });
          fetchDoctors();
        }
      }
    } catch (error) {
      console.error("❌ Error saving doctor:", error);
      setMessage("❌ Failed to save doctor. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Prepare form to edit a doctor
  const handleEditClick = (doc) => {
    setEditId(doc.id);
    setDoctor({
      name: doc.name,
      gender: doc.gender,
      speciality: doc.speciality,
      hospital: doc.hospital,
      status: doc.status,
    });
    setMessage("");
  };

  // Cancel editing mode and reset form
  const handleCancelEdit = () => {
    setEditId(null);
    setDoctor({
      name: "",
      gender: "",
      speciality: "",
      hospital: "",
      status: "",
    });
    setMessage("");
  };

  // Delete a doctor after confirmation
  const handleDeleteClick = async (id) => {
    if (!window.confirm("Are you sure you want to delete this doctor?")) return;

    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/doctor/${id}`,
        getAuthConfig()
      );
      setMessage("✅ Doctor deleted successfully!");
      if (editId === id) handleCancelEdit();
      fetchDoctors();
    } catch (error) {
      console.error("❌ Failed to delete doctor:", error);
      setMessage("❌ Failed to delete doctor. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 text-black font-sans">
      {/* Doctor List */}
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-4xl mb-8">
        <h3 className="text-xl font-semibold mb-4 text-black text-center">
          Doctor List
        </h3>

        {loadingDoctors ? (
          <p className="text-center text-gray-600">Loading doctors...</p>
        ) : error ? (
          <p className="text-center text-red-600">{error}</p>
        ) : doctors.length === 0 ? (
          <p className="text-center text-gray-500">No doctors found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 text-left text-sm text-black">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="p-3">Name</th>
                  <th className="p-3">Gender</th>
                  <th className="p-3">Speciality</th>
                  <th className="p-3">Hospital</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {doctors.map((doc) => (
                  <tr key={doc.id} className="border-b hover:bg-blue-50">
                    <td className="p-3">{doc.name}</td>
                    <td className="p-3">{doc.gender}</td>
                    <td className="p-3">{doc.speciality}</td>
                    <td className="p-3">{doc.hospital}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded-full text-white text-xs ${
                          doc.status === "Active"
                            ? "bg-green-600"
                            : doc.status === "On Leave"
                            ? "bg-yellow-500"
                            : "bg-gray-600"
                        }`}
                      >
                        {doc.status}
                      </span>
                    </td>
                    <td className="p-3 space-x-2">
                      <button
                        onClick={() => handleEditClick(doc)}
                        className="text-blue-600 hover:underline"
                        type="button"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteClick(doc.id)}
                        className="text-red-600 hover:underline"
                        type="button"
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

      {/* Add/Edit Doctor Form */}
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-black">
          {editId !== null ? "Edit Doctor" : "Add New Doctor"}
        </h2>

        {message && (
          <div
            className={`mb-4 text-center text-sm ${
              message.startsWith("✅") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-black">Name</label>
            <input
              type="text"
              name="name"
              value={doctor.name}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              placeholder="Dr. John Doe"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black">Gender</label>
            <select
              name="gender"
              value={doctor.gender}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              required
            >
              <option value="">-- Select Gender --</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-black">Speciality</label>
            <input
              type="text"
              name="speciality"
              value={doctor.speciality}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              placeholder="Cardiologist"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black">Hospital Name</label>
            <input
              type="text"
              name="hospital"
              value={doctor.hospital}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              placeholder="National Hospital"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black">Status</label>
            <select
              name="status"
              value={doctor.status}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              required
            >
              <option value="">-- Select Status --</option>
              <option value="Active">Active</option>
              <option value="On Leave">On Leave</option>
              <option value="Retired">Retired</option>
            </select>
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-grow py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 transition disabled:opacity-50"
            >
              {loading
                ? editId !== null
                  ? "Updating..."
                  : "Adding..."
                : editId !== null
                ? "Update Doctor"
                : "Add Doctor"}
            </button>

            {editId !== null && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="py-2 px-4 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddDoctor;
