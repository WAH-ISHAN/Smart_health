import { Header } from "../AdminPanal/unit/Header";
import SearchBar from "../AdminPanal/unit/Searchbar"
import Contact from "../Home/Contact"
import DoctorList from "./Doctor";
import HospitalList from "./HospitalList";

export function Userpage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <SearchBar />
        
    <div className="w-full min-h-[300px] flex flex-wrap justify-center gap-6 bg-gray-100 p-6">
  {/* Find a Hospital */}
  <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm">
    <h2 className="text-2xl font-bold mb-4 text-blue-800">🏥 Find a Hospital</h2>
    <p className="text-gray-600 mb-4">
      Locate nearby hospitals quickly using your current location or search by city or area.
    </p>
    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
      Search Hospitals
    </button>
  </div>

  {/* Find a Doctor */}
  <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm">
    <h2 className="text-2xl font-bold mb-4 text-green-800">👨‍⚕️ Find a Doctor</h2>
    <p className="text-gray-600 mb-4">
      Search for specialists, general physicians, or doctors based on your symptoms.
    </p>
    <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
      Search Doctors
    </button>
  </div>

  {/* Book Appointment */}
  <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm">
    <h2 className="text-2xl font-bold mb-4 text-purple-800">📅 Book Appointment</h2>
    <p className="text-gray-600 mb-4">
      Schedule a consultation with your preferred doctor or hospital at your convenience.
    </p>
    <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
      Book Now
    </button>
  </div>

  {/* Health Tips */}
  <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm">
    <h2 className="text-2xl font-bold mb-4 text-red-800">💡 Health Tips</h2>
    <p className="text-gray-600 mb-4">
      Stay updated with daily health tips, nutrition advice, and seasonal health alerts.
    </p>
    <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">
      View Tips
    </button>
  </div>
</div>

      <div>
        <h2 className="text-4xl font-bold mb-6 text-gray-800">Our Services</h2>
        <p className="text-gray-600">Welcome to the user page!</p>
      </div>
         <HospitalList />
         <DoctorList />
    </div>
  );
}