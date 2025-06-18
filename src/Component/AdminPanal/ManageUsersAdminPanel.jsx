// === React Frontend: src/ManageUsersAdminPanel.jsx ===
import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';

const statusColors = {
  online: 'bg-green-500',
  offline: 'bg-gray-400',
  busy: 'bg-red-500',
  away: 'bg-yellow-400',
};

const formatLastSeen = (isoString) => {
  const date = new Date(isoString);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins} min${diffMins === 1 ? '' : 's'} ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`;
  return date.toLocaleDateString();
};

const API_URL = 'http://localhost:8080/api/users';

export default function ManageUsersAdminPanel() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get(API_URL).then(res => setUsers(res.data)).catch(console.error);
  }, []);

  const filteredUsers = useMemo(() =>
    users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm)
    ), [users, searchTerm]
  );

  const toggleMute = (id) => {
    axios.patch(`${API_URL}/${id}/mute`).then(res => {
      setUsers(prev => prev.map(u => u.id === id ? res.data : u));
    });
  };

  const deleteUserById = (id) => {
    if (window.confirm('Are you sure?')) {
      axios.delete(`${API_URL}/${id}`).then(() => {
        setUsers(prev => prev.filter(u => u.id !== id));
      });
    }
  };

  const editUser = (id) => {
    alert(`Edit user functionality for user ID: ${id} (not implemented)`);
  };

  return (
    <div className="min-h-screen bg-white text-gray-700 font-sans p-8 max-w-7xl mx-auto">
      <header className="mb-10 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-4xl font-extrabold tracking-tight mb-4 sm:mb-0 select-none">
          Manage Users
        </h1>
        <div className="relative w-full sm:w-80">
          <input
            type="search"
            aria-label="Search users"
            placeholder="Search by name, email or phone..."
            className="w-full rounded-xl border border-gray-300 pl-12 pr-4 py-3"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
      </header>

      <section className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {filteredUsers.length === 0 ? (
          <p className="col-span-full text-center text-gray-500 mt-20 select-none">
            No users found matching “{searchTerm}”.
          </p>
        ) : filteredUsers.map(user => (
          <article key={user.id} className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center mb-4">
              <div className="relative">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-20 h-20 rounded-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = 'https://via.placeholder.com/80';
                  }}
                />
                <span
                  className={`absolute bottom-0 right-0 w-6 h-6 rounded-full ring-2 ring-white ${statusColors[user.status]} ${user.status === 'online' ? 'animate-pulse' : ''}`}></span>
              </div>
              <div className="ml-4">
                <h2 className="text-xl font-semibold">{user.name}</h2>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>
            <div className="mb-4">
              <p className="text-sm">📞 {user.phone}</p>
              <p className="text-xs text-gray-400">Last seen: {formatLastSeen(user.lastSeen)}</p>
              {user.isTyping && <p className="text-xs text-green-600 italic">Typing...</p>}
            </div>
            <div className="flex justify-between items-center border-t pt-4">
              <button onClick={() => editUser(user.id)} className="text-sm text-green-700 border px-3 py-1 rounded">Edit</button>
              <button onClick={() => toggleMute(user.id)} className={`text-sm border px-3 py-1 rounded ${user.isMuted ? 'text-red-600' : 'text-green-700'}`}>{user.isMuted ? 'Unmute' : 'Mute'}</button>
              <button onClick={() => deleteUserById(user.id)} className="text-sm text-gray-700 border px-3 py-1 rounded">Delete</button>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

