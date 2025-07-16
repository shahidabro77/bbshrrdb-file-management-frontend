import React, { useEffect, useState } from 'react';
import axios from '../api';

const UserProfileSettings = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/users/settings', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProfile(res.data);
      } catch (err) {
        setError('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    try {
      const token = localStorage.getItem('token');
      await axios.put('/users/settings', profile, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSuccess('Profile updated successfully!');
    } catch (err) {
      setError('Failed to update profile');
    }
  };

  if (loading) return <div className="p-6">Loading profile...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <main className="flex justify-center items-start min-h-screen bg-gray-100 pt-[20px] px-4">
      <div className="w-full max-w-2xl bg-white shadow-md rounded-xl p-8 mt-8">
        <h1 className="text-4xl font-bold text-center mb-2">User Profile Settings</h1>
        <p className="text-center text-gray-600 mb-8">
          Update your personal details and change your password below.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          {success && (
            <div className="p-3 bg-green-100 text-green-700 rounded text-center">
              {success}
            </div>
          )}

          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="block font-semibold mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="full_name"
              value={profile.full_name || ''}
              onChange={handleChange}
              placeholder="John Doe"
              className={`w-full px-4 py-2 border rounded-md ${
                error ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring`}
              required
            />
            {error && (
              <p className="text-red-600 text-sm mt-1">{error}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block font-semibold mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={profile.email || ''}
              onChange={handleChange}
              placeholder="john@example.com"
              className={`w-full px-4 py-2 border rounded-md ${
                error ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring`}
              required
            />
            {error && (
              <p className="text-red-600 text-sm mt-1">{error}</p>
            )}
          </div>

          {/* Mobile */}
          <div>
            <label htmlFor="mobile" className="block font-semibold mb-1">
              Mobile
            </label>
            <input
              type="text"
              id="mobile"
              name="mobile"
              value={profile.mobile || ''}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-4 py-2"
            />
          </div>

          <hr className="border-t my-8" />

          {/* Change Password Section */}
          <h2 className="text-2xl font-semibold mb-4">Change Password</h2>

          {/* Current Password */}
          <div>
            <label htmlFor="currentPassword" className="block font-semibold mb-1">
              Current Password
            </label>
            <input
              type="password"
              id="currentPassword"
              name="currentPassword"
              value={profile.currentPassword}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring"
            />
          </div>

          {/* New Password */}
          <div>
            <label htmlFor="newPassword" className="block font-semibold mb-1">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={profile.newPassword}
              onChange={handleChange}
              placeholder="••••••••"
              className={`w-full px-4 py-2 border rounded-md ${
                error ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring`}
            />
            {error && (
              <p className="text-red-600 text-sm mt-1">{error}</p>
            )}
          </div>

          {/* Confirm New Password */}
          <div>
            <label htmlFor="confirmNewPassword" className="block font-semibold mb-1">
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirmNewPassword"
              name="confirmNewPassword"
              value={profile.confirmNewPassword}
              onChange={handleChange}
              placeholder="••••••••"
              className={`w-full px-4 py-2 border rounded-md ${
                error ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring`}
            />
            {error && (
              <p className="text-red-600 text-sm mt-1">
                {error}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 rounded-md transition"
          >
            Save Changes
          </button>
        </form>
      </div>
    </main>
  );
};

export default UserProfileSettings;
