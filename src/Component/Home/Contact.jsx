// components/Home/Contact.jsx
export default function Contact() {
  return (
    <div className="w-full bg-blue-500 text-white py-10 px-4">
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">Contact Us</h2>
          <p className="text-gray-300">Reach out with any questions or feedback.</p>
        </div>
        <form className="space-y-3">
          <input
            type="text"
            placeholder="Name"
            className="w-full p-2 rounded bg-gray-300 text-white placeholder-gray-400"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 rounded bg-gray-300 text-white placeholder-gray-400"
          />
          <textarea
            rows="2"
            placeholder="Message"
            className="w-full p-2 rounded bg-gray-300 text-white placeholder-gray-400"
          />
          <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white w-full">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
