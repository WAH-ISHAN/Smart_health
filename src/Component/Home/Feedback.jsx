import React, { useState } from 'react';
import axios from 'axios';

const Feedback = () => {
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    try {
      await axios.post('/api/feedback', { rating, message });
      alert('Feedback submitted');
      setRating(0);
      setMessage('');
    } catch (err) {
      console.error(err);
      alert('Submission failed');
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-blue-700">Submit Feedback</h2>
      <div className="bg-white p-6 rounded-xl shadow-md">
        <label className="block mb-2">Rating (1-5):</label>
        <input type="number" min="1" max="5" value={rating} onChange={(e) => setRating(e.target.value)} className="mb-4 border p-2 rounded w-full" />
        <textarea value={message} onChange={(e) => setMessage(e.target.value)} className="w-full p-3 border rounded mb-4" placeholder="Write your feedback..." rows="4"></textarea>
        <button onClick={handleSubmit} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Submit</button>
      </div>
    </div>
  );
};

export default Feedback;