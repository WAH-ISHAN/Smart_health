import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

export default function Contact() {
  return (
    <div className="w-full bg-[#1e3264] text-white py-10 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8 text-sm">
        {/* DocMediCare Intro */}
        <div>
          <h2 className="text-2xl font-bold mb-3">DocMediCare</h2>
          <p className="mb-4">Providing exceptional healthcare services with compassion and expertise since 2010.</p>
          <div className="flex space-x-4 mt-2">
            <FaFacebookF className="hover:text-gray-300 cursor-pointer" />
            <FaTwitter className="hover:text-gray-300 cursor-pointer" />
            <FaInstagram className="hover:text-gray-300 cursor-pointer" />
            <FaLinkedin className="hover:text-gray-300 cursor-pointer" />
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold mb-3 text-lg">Quick Links</h3>
          <ul className="space-y-1">
            <li><a href="#" className="hover:underline">Home</a></li>
            <li><a href="#" className="hover:underline">Services</a></li>
            <li><a href="#" className="hover:underline">Doctors</a></li>
            <li><a href="#" className="hover:underline">Appointments</a></li>
            <li><a href="#" className="hover:underline">Contact</a></li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="font-semibold mb-3 text-lg">Services</h3>
          <ul className="space-y-1">
            <li>General Medicine</li>
            <li>Cardiology</li>
            <li>Neurology</li>
            <li>Pediatrics</li>
            <li>Dermatology</li>
          </ul>
        </div>

        {/* Contact Form */}
        <div>
          <h3 className="font-semibold mb-3 text-lg">Contact Us</h3>
          <div className="flex items-start space-x-2 mb-2">
            <FaMapMarkerAlt className="mt-1" />
            <p>123 Medical Street, Health City</p>
          </div>
          <div className="flex items-start space-x-2 mb-2">
            <FaPhoneAlt className="mt-1" />
            <p>+94 76 123 4567</p>
          </div>
          <div className="flex items-start space-x-2 mb-4">
            <FaEnvelope className="mt-1" />
            <p>info@docmedicare.com</p>
          </div>
          <form className="space-y-2">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-2 rounded bg-gray-100 text-black placeholder-gray-600"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-2 rounded bg-gray-100 text-black placeholder-gray-600"
            />
            <textarea
              rows="2"
              placeholder="Your Message"
              className="w-full p-2 rounded bg-gray-100 text-black placeholder-gray-600"
            />
            <button className="w-full bg-blue-600 hover:bg-blue-700 transition text-white p-2 rounded">
              Send Message
            </button>
          </form>
        </div>
      </div>

      
    </div>
  );
}
