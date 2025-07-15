import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, toggleUserStatus, clearMessage } from '../redux/userAdminSlice';

const UserManagement = () => {
  const dispatch = useDispatch();
  const { users, loading, error, message } = useSelector(state => state.userAdmin);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    if (message || error) {
      const timer = setTimeout(() => {
        dispatch(clearMessage());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message, error, dispatch]);

  const handleToggleStatus = (userId, currentStatus) => {
    dispatch(toggleUserStatus({ userId, is_active: !currentStatus }));
  };

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
            {(message || error) && (
              <div
                className={`mb-4 px-4 py-2 rounded border ${
                  error
                    ? 'bg-red-100 border-red-400 text-red-700'
                    : 'bg-green-100 border-green-400 text-green-700'
                }`}
              >
                {error || message}
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
                            onClick={() => handleToggleStatus(user.user_id, user.is_active)}
                            className={`px-3 py-1 text-sm rounded text-white ${
                              user.is_active
                                ? 'bg-red-600 hover:bg-red-700'
                                : 'bg-green-600 hover:bg-green-700'
                            }`}
                            disabled={loading}
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
