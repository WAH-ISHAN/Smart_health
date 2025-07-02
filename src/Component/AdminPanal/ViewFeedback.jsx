import React, { useEffect, useState } from 'react';
import axios from 'axios';

export function ViewFeedback  () {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_API_URL + '/feedback');
        setFeedbacks(response.data);
      } catch (error) {
        console.error('Failed to fetch feedback:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  if (loading) {
    return (
      <p className="text-center mt-10 text-lg text-gray-600">Loading feedback...</p>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">User Feedback</h2>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        {feedbacks.map((fb) => (
          <div
            key={fb.id}
            className="p-4 bg-white rounded-xl shadow-md border border-gray-200"
          >
            <h3 className="text-lg font-semibold text-gray-800">{fb.userName}</h3>
            <p className="text-sm text-gray-500">{fb.email}</p>
            <p className="mt-2 text-gray-700">{fb.message}</p>
            <p className="text-xs text-right text-gray-400 mt-4">{fb.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewFeedback;
