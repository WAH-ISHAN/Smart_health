import { useState } from 'react';
// import axios from 'axios'; // Uncomment when backend ready
import { FaHospitalSymbol, FaMapMarkerAlt } from 'react-icons/fa';

export default function HospitalList() {
  const [search, setSearch] = useState('');
  const [hospitals] = useState([
    {
      name: 'City General Hospital',
      location: 'Colombo',
      description: '24/7 emergency, specialist care, and diagnostics.',
    },
    {
      name: 'Green Cross Medical Center',
      location: 'Kandy',
      description: 'Renowned for cardiology and internal medicine.',
    },
    {
      name: 'Sunrise Health Clinic',
      location: 'Galle',
      description: 'Pediatric, dermatology, and general consultations.',
    },
    {
      name: 'Mercy Care Hospital',
      location: 'Jaffna',
      description: 'Emergency services and surgical specialties.',
    },
  ]);

  // 🔄 Uncomment this when connecting to backend
  // useEffect(() => {
  //   axios.get('/api/hospitals')
  //     .then(res => setHospitals(res.data))
  //     .catch(err => console.error(err));
  // }, []);

  const filtered = hospitals.filter(h =>
    h.name.toLowerCase().includes(search.toLowerCase()) ||
    h.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <main className="pt-10 pb-20 px-6 md:px-12 lg:px-24">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-blue-800 mb-8">
          Find a Hospital
        </h1>

        {/* 🔍 Search Bar */}
        <div className="flex justify-center mb-12">
          <input
            type="text"
            placeholder="Search by name or city..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full max-w-xl text-lg px-4 py-2 rounded border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* 🏥 Hospital Cards */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.length ? (
            filtered.map((h, idx) => (
              <div key={idx} className="rounded-xl bg-white shadow-md hover:shadow-xl transition-shadow p-6">
                <div className="flex items-center mb-3 text-blue-700 text-xl font-bold">
                  <FaHospitalSymbol className="mr-3" />
                  {h.name}
                </div>
                <div className="flex items-center text-gray-600 mb-4">
                  <FaMapMarkerAlt className="mr-2" />
                  <span>{h.location}</span>
                </div>
                <p className="text-gray-700 mb-4">{h.description}</p>
                <button
                  className="mt-auto border border-blue-600 text-blue-600 px-4 py-2 rounded hover:bg-blue-50 transition"
                >
                  View Details
                </button>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500 text-lg">
              No hospitals match your search.
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
