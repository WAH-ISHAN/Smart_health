import React from "react";

export function TopSelections() {
  // Define your specializations, each with its own bg color class
  const specializations = [
    { icon: '🫀', name: 'Cardiologist', color: 'bg-blue-200' },
    { icon: '🧠', name: 'Neurologist', color: 'bg-blue-200' },
    { icon: '🦴', name: 'Orthopedic', color: 'bg-blue-200' },
    { icon: '👁️', name: 'Eye Specialist', color: 'bg-blue-200' },
  ];

  return (
    <div>
      {/* Specializations */}
      <section className="px-6 py-10">
        <h2 className="text-3xl font-semibold mb-4">Top Specializations</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {specializations.map((item) => (
            <div
              key={item.name}
              className="border rounded-lg p-6 flex flex-col items-center shadow hover:shadow-md transition"
            >
              {/* Icon wrapper with unique bg color */}
              <div className={` p-4  rounded-full mb-3 text-4xl ${item.color}`}>
                {item.icon}
              </div>
              <span className="font-medium text-lg">{item.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Trusted Hospitals */}
      <section className="px-6 pb-10">
        <h2 className="text-2xl font-semibold mb-4">Trusted Hospitals</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="border p-4 rounded shadow hover:shadow-md transition"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-200 rounded" />
                <div>
                  <h3 className="font-semibold">Hospital</h3>
                  <div className="text-yellow-500">★★★★★</div>
                  <p className="text-sm text-gray-600">Address line {i}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
