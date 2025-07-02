import { useEffect, useState } from "react";
import axios from "axios";
import { FaHospitalSymbol, FaMapMarkerAlt } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

export default function HospitalList() {
  const [search, setSearch] = useState("");
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch hospitals from backend with optional search param
  const fetchHospitals = async (searchTerm) => {
    setLoading(true);
    setError("");
    try {
      let url = import.meta.env.VITE_API_URL + "/hospitals/search";
      if (searchTerm) {
        url += `?search=${encodeURIComponent(searchTerm)}`;
      }
      console.log("Fetching from:", url);
      const res = await axios.get(url);
      setHospitals(res.data);
    } catch (err) {
      setError("Failed to load hospitals. Please try again later.");
      console.error(err);
      toast.error("Failed to load hospitals.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch hospitals initially and whenever search changes (debounced)
  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      fetchHospitals(search.trim());
    }, 500);

    return () => clearTimeout(debounceTimeout);
  }, [search]);

  const handleViewDetails = (hospitalName) => {
    toast.success(`Details for ${hospitalName} coming soon!`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Toaster position="top-right" reverseOrder={false} />

      <main className="pt-10 pb-20 px-6 md:px-12 lg:px-24">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-blue-800 mb-8">
          Find a Hospital
        </h1>

        <div className="flex justify-center mb-12">
          <input
            type="text"
            placeholder="Search by hospital name or city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-xl text-lg px-4 py-2 rounded border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {loading ? (
          <p className="text-center text-gray-600">Loading hospitals...</p>
        ) : error ? (
          <p className="text-center text-red-600">{error}</p>
        ) : hospitals.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">No hospitals match your search.</p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {hospitals.map((hospital) => (
              <div
                key={hospital.id}
                className="rounded-xl bg-white shadow-md hover:shadow-xl transition-shadow p-6 flex flex-col"
              >
                <div className="flex items-center mb-3 text-blue-700 text-xl font-bold">
                  <FaHospitalSymbol className="mr-3" />
                  {hospital.name}
                </div>
                <div className="flex items-center text-gray-600 mb-4">
                  <FaMapMarkerAlt className="mr-2" />
                  <span>{hospital.location || "No location info"}</span>
                </div>
                <p className="text-gray-700 mb-4">{hospital.address || "No address provided"}</p>
                <button
                  className="mt-auto border border-blue-600 text-blue-600 px-4 py-2 rounded hover:bg-blue-50 transition"
                  onClick={() => handleViewDetails(hospital.name)}
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
