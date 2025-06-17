import React from 'react';

const Profile = () => {
  const user = JSON.parse(localStorage.getItem('user')) || {};

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-blue-700">My Profile</h2>
      <div className="bg-white p-6 rounded-xl shadow-md space-y-2">
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Full Name:</strong> {user.firstname} {user.lastname}</p>
      </div>
    </div>
  );
};

export default Profile;