import { useState } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";

export default function Contact() {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);

    try {
      const response = await fetch("http://localhost:8080/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: formData.userName,
          email: formData.email,
          message: formData.message,
          date: new Date().toISOString().split("T")[0], // e.g., "2025-07-02"
        }),
      });

      if (response.ok) {
        setStatus("Feedback sent successfully!");
        setFormData({ userName: "", email: "", message: "" });
      } else {
        setStatus("Failed to send feedback.");
      }
    } catch (error) {
      console.error("Error sending feedback:", error);
      setStatus("Error sending feedback.");
    }
  };

  return (
    <div className="w-full bg-[#1e3264] text-white py-10 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8 text-sm">
        {/* DocMediCare Intro */}
        <div>
          <h2 className="text-2xl font-bold mb-3">DocMediCare</h2>
          <p className="mb-4">
            Providing exceptional healthcare services with compassion and
            expertise since 2010.
          </p>
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
            <li>
              <a href="#" className="hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Services
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Doctors
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Appointments
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contact
              </a>
            </li>
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

        {/* Feedback Form */}
        <div>
          <h3 className="font-semibold mb-3 text-lg">Send Your Feedback</h3>
          <form className="space-y-2" onSubmit={handleSubmit}>
            <input
              type="text"
              name="userName"
              placeholder="Your Name"
              value={formData.userName}
              onChange={handleChange}
              required
              className="w-full p-2 rounded bg-gray-100 text-black placeholder-gray-600"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-2 rounded bg-gray-100 text-black placeholder-gray-600"
            />
            <textarea
              rows="3"
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full p-2 rounded bg-gray-100 text-black placeholder-gray-600"
            />
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 transition text-white p-2 rounded"
            >
              Send Message
            </button>
          </form>
          {status && (
            <p
              className={`mt-2 ${
                status.includes("successfully") ? "text-green-400" : "text-red-400"
              }`}
            >
              {status}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
