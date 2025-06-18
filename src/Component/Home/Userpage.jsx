import { Header } from "../AdminPanal/unit/Header";
import SearchBar from "../AdminPanal/unit/Searchbar";
import DoctorList from "./Doctor";
import HospitalList from "./HospitalList";
import Contact from "./Contact";
import { TopSelections } from "./TopSelections";
import { useNavigate } from "react-router-dom";

const InfoCard = ({ icon, title, description, buttonText, buttonColor, onClick }) => (
  <section className="bg-white p-6 rounded-xl shadow-md flex flex-col justify-between hover:shadow-lg transition-shadow duration-300 transform hover:scale-105">
    <header>
      <div className="flex items-center mb-3">
        <span className="text-3xl mr-2">{icon}</span>
        <h2 className={`text-xl font-semibold ${buttonColor.textColor}`}>{title}</h2>
      </div>
      <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
    </header>
    <button
      onClick={onClick}
      className={`mt-4 py-2 rounded-lg text-white font-medium transition-colors duration-300 ${buttonColor.bg} hover:${buttonColor.hover}`}
      aria-label={buttonText}
    >
      {buttonText}
    </button>
  </section>
);

export function Userpage() {
  const navigate = useNavigate();

  const handleHospitalSearch = () =>{
    navigate("/HospitalList");
    
  }
  const handleDoctorSearch = () => {
    navigate("/DoctorList");
  };
  const handleBookAppointment = () => {
   
    navigate("/Booking");
  };

  const handleViewHealthTips = () => alert("View health tips clicked");

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <main className="flex-grow max-w-6xl mx-auto px-4 py-8">
        <SearchBar className="w-full mb-6" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <InfoCard
            icon="🏥"
            title="Find a Hospital"
            description="Locate nearby hospitals quickly using your current location or search by city or area."
            buttonText="Search"
            buttonColor={{ bg: "bg-blue-600", hover: "bg-blue-700", textColor: "text-blue-600" }}
            onClick={handleHospitalSearch}
          />
          <InfoCard
            icon="👨‍⚕️"
            title="Find a Doctor"
            description="Search for specialists, general physicians, or doctors based on your symptoms."
            buttonText="Search"
            buttonColor={{ bg: "bg-green-600", hover: "bg-green-700", textColor: "text-green-600" }}
            onClick={handleDoctorSearch}
          />
          <InfoCard
            icon="📅"
            title="Book Appointment"
            description="Schedule a consultation with your preferred doctor or hospital at your convenience."
            buttonText="Book"
            buttonColor={{ bg: "bg-purple-600", hover: "bg-purple-700", textColor: "text-purple-600" }}
            onClick={handleBookAppointment}
          />
          <InfoCard
            icon="💡"
            title="Health Tips"
            description="Stay updated with daily health tips, nutrition advice, and seasonal health alerts."
            buttonText="View"
            buttonColor={{ bg: "bg-red-600", hover: "bg-red-700", textColor: "text-red-600" }}
            onClick={handleViewHealthTips}
          />
        </div>

        <section className="mt-8">
          <TopSelections />
        </section>

        <section className="mt-8 space-y-8">
          <HospitalList />
          <DoctorList />
        </section>
      </main>
      <footer className="bg-white shadow mt-8 py-4">
        <Contact />
        <div className="max-w-6xl mx-auto text-center text-gray-600">
          &copy; {new Date().getFullYear()} HealthCare. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
