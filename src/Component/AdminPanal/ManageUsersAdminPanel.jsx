import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/users';

export default function ManageUsersAdminPanel() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('You must be logged in to view users.');
      setLoading(false);
      return;
    }

    axios.get(API_URL, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      setUsers(res.data);
      setError(null);
    })
    .catch(err => {
      console.error(err);
      setError('Failed to load users. Maybe your session expired.');
    })
    .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p style={{color: 'red'}}>{error}</p>;
  if (users.length === 0) return <p>No users found.</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1>User List</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <strong>{user.name || 'N/A'}</strong> - {user.email || 'N/A'} - {user.phone || 'N/A'}
          </li>
        ))}
      </ul>
    </div>
  );
}
