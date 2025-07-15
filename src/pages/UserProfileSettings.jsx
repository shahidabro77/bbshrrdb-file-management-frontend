import React, { useState } from 'react';

const UserProfileSettings = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full Name is required.';
    if (!formData.email.trim()) errs.email = 'Email is required.';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errs.email = 'Email is invalid.';
    if (formData.newPassword || formData.confirmNewPassword) {
      if (formData.newPassword.length < 6) errs.newPassword = 'Password must be at least 6 characters.';
      if (formData.newPassword !== formData.confirmNewPassword) errs.confirmNewPassword = 'Passwords do not match.';
    }
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      setErrors({});
      setSuccessMsg('Profile updated successfully!');
      // TODO: Submit form data to server here
    } else {
      setErrors(validationErrors);
      setSuccessMsg('');
    }
  };

  return (
    <main className="flex justify-center items-start min-h-screen bg-gray-100 pt-[20px] px-4">
      <div className="w-full max-w-2xl bg-white shadow-md rounded-xl p-8 mt-8">
        <h1 className="text-4xl font-bold text-center mb-2">User Profile Settings</h1>
        <p className="text-center text-gray-600 mb-8">
          Update your personal details and change your password below.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          {successMsg && (
            <div className="p-3 bg-green-100 text-green-700 rounded text-center">
              {successMsg}
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
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="John Doe"
              className={`w-full px-4 py-2 border rounded-md ${
                errors.fullName ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring`}
            />
            {errors.fullName && (
              <p className="text-red-600 text-sm mt-1">{errors.fullName}</p>
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
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              className={`w-full px-4 py-2 border rounded-md ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring`}
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">{errors.email}</p>
            )}
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
              value={formData.currentPassword}
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
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="••••••••"
              className={`w-full px-4 py-2 border rounded-md ${
                errors.newPassword ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring`}
            />
            {errors.newPassword && (
              <p className="text-red-600 text-sm mt-1">{errors.newPassword}</p>
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
              value={formData.confirmNewPassword}
              onChange={handleChange}
              placeholder="••••••••"
              className={`w-full px-4 py-2 border rounded-md ${
                errors.confirmNewPassword ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring`}
            />
            {errors.confirmNewPassword && (
              <p className="text-red-600 text-sm mt-1">
                {errors.confirmNewPassword}
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
