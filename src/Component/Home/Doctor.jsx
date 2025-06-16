import React, { useState } from 'react';
import { FaUserMd, FaMapMarkerAlt } from 'react-icons/fa';

const doctors = [
  {
    name: 'Dr. Anjali Perera',
    specialization: 'Cardiologist',
    location: 'Colombo',
    description: 'Expert in heart-related conditions with 15+ years of experience.',
  },
  {
    name: 'Dr. Nimal Fernando',
    specialization: 'Pediatrician',
    location: 'Kandy',
    description: 'Trusted children’s specialist known for gentle care.',
  },
  {
    name: 'Dr. Tharushi Wijesinghe',
    specialization: 'Dermatologist',
    location: 'Galle',
    description: 'Skincare expert providing laser and cosmetic treatments.',
  },
  {
    name: 'Dr. Ravi Seneviratne',
    specialization: 'Neurologist',
    location: 'Jaffna',
    description: 'Specialist in brain and nerve disorders.',
  },
];

export default function DoctorList() {
  const [search, setSearch] = useState('');

  const filtered = doctors.filter(d =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.specialization.toLowerCase().includes(search.toLowerCase()) ||
    d.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white wapper">
      <main className="pt-10 pb-20 px-6 md:px-12 lg:px-24">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-green-800 mb-8">
          Find a Doctor
        </h1>

        {/* 🔍 Search Bar */}
        <div className="flex justify-center mb-12">
          <input
            type="text"
            placeholder="Search by name, specialization, or city..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full max-w-xl text-lg px-4 py-2 rounded border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* 🩺 Doctor Cards */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.length ? (
            filtered.map((d, idx) => (
              <div key={idx} className="rounded-xl bg-white shadow-md hover:shadow-xl transition-shadow p-6">
                <div className="flex items-center mb-3 text-green-700 text-xl font-bold">
                  <FaUserMd className="mr-3" />
                  {d.name}
                </div>
                <div className="text-sm text-green-600 font-semibold mb-2">
                  {d.specialization}
                </div>
                <div className="flex items-center text-gray-600 mb-4">
                  <FaMapMarkerAlt className="mr-2" />
                  <span>{d.location}</span>
                </div>
                <p className="text-gray-700 mb-4">{d.description}</p>
                <button
                  className="mt-auto border border-green-600 text-green-600 px-4 py-2 rounded hover:bg-green-50 transition"
                >
                  View Profile
                </button>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500 text-lg">
              No doctors match your search.
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
