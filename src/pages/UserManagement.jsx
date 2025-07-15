import React, { useEffect, useState, useCallback } from 'react';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState(null); // { text: '', isError: true/false }
  const [loading, setLoading] = useState(false);

  // Show message for 5 seconds
  const showMessage = (text, isError = true) => {
    setMessage({ text, isError });
    setTimeout(() => setMessage(null), 5000);
  };

  const loadUsers = useCallback(async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        showMessage('Please log in to view users.');
        setTimeout(() => window.location.href = '/login', 2000);
        return;
      }

      const response = await fetch('http://localhost:3000/api/users', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          showMessage('Unauthorized. Please log in again.');
          setTimeout(() => window.location.href = '/login', 2000);
          return;
        }
        throw new Error('Failed to fetch users');
      }

      const data = await response.json();
      setUsers(data);
    } catch (error) {
      showMessage(error.message || 'An error occurred while fetching users.');
      console.error('🚨 Failed to fetch users:', error);
    } finally {
      setLoading(false);
    }
  }, []); // Empty dependencies since token and showMessage are stable here

  const toggleUserStatus = async (userId, currentStatus) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        showMessage('Please log in to perform this action.');
        setTimeout(() => window.location.href = '/login', 2000);
        return;
      }

      const response = await fetch(`http://localhost:3000/api/users/${userId}/status`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ is_active: !currentStatus }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          showMessage('Unauthorized. Please log in again.');
          setTimeout(() => window.location.href = '/login', 2000);
          return;
        }
        throw new Error('Failed to update user status');
      }

      const result = await response.json();
      showMessage(result.message, false);
      loadUsers();
    } catch (error) {
      showMessage(error.message || 'An error occurred while updating user status.');
      console.error('🚨 Failed to update status:', error);
    }
  };

  useEffect(() => {
    loadUsers();
  }, [loadUsers]); // Now loadUsers is stable due to useCallback

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 text-gray-900">
      {/* Header and Sidebar can be added here */}
      <div className="flex flex-1">
        <main className="flex-1 p-6 pt-[80px] ml-0 flex items-start">
          <section className="bg-white rounded-2xl shadow p-6 w-full max-w-5xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold">User Management</h2>
            </div>

            {/* Message */}
            {message && (
              <div
                className={`mb-4 px-4 py-2 rounded border ${
                  message.isError
                    ? 'bg-red-100 border-red-400 text-red-700'
                    : 'bg-green-100 border-green-400 text-green-700'
                }`}
              >
                {message.text}
              </div>
            )}

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 text-sm">
                <thead className="bg-gray-100 text-left text-gray-700 uppercase tracking-wider">
                  <tr>
                    <th className="px-4 py-2">User ID</th>
                    <th className="px-4 py-2">Full Name</th>
                    <th className="px-4 py-2">Email</th>
                    <th className="px-4 py-2">Status</th>
                    <th className="px-4 py-2">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {loading ? (
                    <tr>
                      <td colSpan="5" className="text-center py-4">
                        Loading users...
                      </td>
                    </tr>
                  ) : users.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center py-4">
                        No users found.
                      </td>
                    </tr>
                  ) : (
                    users.map((user) => (
                      <tr key={user.user_id}>
                        <td className="px-4 py-2">{user.user_id}</td>
                        <td className="px-4 py-2">{user.full_name}</td>
                        <td className="px-4 py-2">{user.email}</td>
                        <td
                          className={`px-4 py-2 font-medium ${
                            user.is_active ? 'text-green-600' : 'text-red-600'
                          }`}
                        >
                          {user.is_active ? 'Active' : 'Inactive'}
                        </td>
                        <td className="px-4 py-2">
                          <button
                            onClick={() => toggleUserStatus(user.user_id, user.is_active)}
                            className={`px-3 py-1 text-sm rounded text-white ${
                              user.is_active
                                ? 'bg-red-600 hover:bg-red-700'
                                : 'bg-green-600 hover:bg-green-700'
                            }`}
                          >
                            {user.is_active ? 'Deactivate' : 'Activate'}
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default UserManagement;
