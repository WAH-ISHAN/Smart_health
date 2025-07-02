import React, { useState } from 'react';
import axios from 'axios';

export function Feedback () {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    if (!userName || !email || !message) {
      alert('Please fill all fields');
      return;
    }

    try {
      const today = new Date().toISOString().split('T')[0]; // yyyy-mm-dd format

      await axios.post(import.meta.env.VITE_API_URL + "/feedback", {
        userName,
        email,
        message,
        date: today,
      });

      alert('Feedback submitted');
      setUserName('');
      setEmail('');
      setMessage('');
    } catch (err) {
      console.error(err);
      alert('Submission failed');
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-blue-700">Submit Feedback</h2>
      <div className="bg-white p-6 rounded-xl shadow-md">
        <label className="block mb-2">Name:</label>
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="mb-4 border p-2 rounded w-full"
          placeholder="Your name"
        />
        <label className="block mb-2">Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 border p-2 rounded w-full"
          placeholder="Your email"
        />
        <label className="block mb-2">Message:</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-3 border rounded mb-4"
          placeholder="Write your feedback..."
          rows="4"
        ></textarea>
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Feedback;
