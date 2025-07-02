import React, { useEffect, useState } from 'react';
import axios from 'axios';

export function ViewFeedback() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(import.meta.env.VITE_API_URL + '/feedback');
      setFeedbacks(response.data);
    } catch (error) {
      console.error('Failed to fetch feedback:', error);
      setError('Failed to load feedback.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this feedback?')) return;

    setDeletingId(id);
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/feedback/${id}`);
      // Remove deleted feedback from state
      setFeedbacks((prev) => prev.filter((fb) => fb.id !== id));
    } catch (error) {
      console.error('Failed to delete feedback:', error);
      alert('Failed to delete feedback.');
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return <p className="text-center mt-10 text-lg text-gray-600">Loading feedback...</p>;
  }

  if (error) {
    return <p className="text-center mt-10 text-lg text-red-600">{error}</p>;
  }

  if (feedbacks.length === 0) {
    return <p className="text-center mt-10 text-lg text-gray-600">No feedback found.</p>;
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">User Feedback</h2>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        {feedbacks.map((fb) => (
          <div
            key={fb.id}
            className="p-4 bg-white rounded-xl shadow-md border border-gray-200 relative"
          >
            <h3 className="text-lg font-semibold text-gray-800">{fb.userName}</h3>
            <p className="text-sm text-gray-500">{fb.email}</p>
            <p className="mt-2 text-gray-700">{fb.message}</p>
            <p className="text-xs text-right text-gray-400 mt-4">
              {new Date(fb.date).toLocaleDateString()}
            </p>
            <button
              disabled={deletingId === fb.id}
              onClick={() => handleDelete(fb.id)}
              className="absolute top-4 right-4 text-red-600 hover:text-red-800 font-semibold"
            >
              {deletingId === fb.id ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewFeedback;
