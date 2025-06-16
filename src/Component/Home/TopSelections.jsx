import React from "react";


export function TopSelections() {
  const specializations = [
    {
      icon: "🫀",
      name: "Cardiologist",
      color: "from-red-100 to-red-200",
    },
    {
      icon: "🧠",
      name: "Neurologist",
      color: "from-purple-100 to-purple-200",
    },
    {
      icon: "🦴",
      name: "Orthopedic",
      color: "from-yellow-100 to-yellow-200",
    },
    {
      icon:"👁",
      name: "Eye Specialist",
      color: "from-blue-100 to-blue-200",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <main className="pt-10 pb-20 px-6 md:px-12 lg:px-24">
        <h2 className="text-4xl font-extrabold text-center text-green-800 mb-10">
          Top Specializations
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {specializations.map((spec) => (
            <div
              key={spec.name}
              className="flex flex-col items-center bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition"
            >
              <div
                className={`p-5 mb-4 rounded-full bg-gradient-to-br ${spec.color} text-green-800 text-3xl`}
              >
                {spec.icon}
              </div>
              <h3 className="font-semibold text-xl text-gray-800 mb-2">
                {spec.name}
              </h3>
              <p className="text-center text-gray-600 text-sm">
                Browse top-rated {spec.name.toLowerCase()} specialists near you.
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}