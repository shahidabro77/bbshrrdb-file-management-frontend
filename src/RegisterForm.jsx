import React, { useState, useEffect } from 'react';
import logo from './assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, resetRegistration } from './redux/authSlice';


const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, registrationSuccess } = useSelector(state => state.auth);

  const [form, setForm] = useState({
    full_name: '',
    cnic: '',
    email: '',
    mobile: '',
    password: '',
    password_confirmation: '',
    role: 'user',
    confirmation: true,
  });
  const [formError, setFormError] = useState('');

  useEffect(() => {
    if (registrationSuccess) {
      // Optionally, redirect to login page after registration
      setTimeout(() => {
        dispatch(resetRegistration());
        navigate('/login');
      }, 1500);
    }
  }, [registrationSuccess, dispatch, navigate]);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const validate = () => {
    if (!form.full_name.match(/^[a-zA-Z\s]+$/)) return 'Please enter your full name (letters and spaces only)';
    if (!form.cnic.match(/^4\d{4}-\d{7}-\d{1}$/)) return 'Please enter a valid CNIC of Sindh province (e.g., 41234-1234567-1)';
    if (!form.email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) return 'Please enter a valid email address (e.g., user@example.com)';
    if (!form.mobile.match(/^03\d{9}$/)) return 'Please enter a valid mobile number starting with 03 (11 digits)';
    if (form.password.length < 8) return 'Password must be at least 8 characters';
    if (form.password !== form.password_confirmation) return 'Passwords must match';
    if (!form.confirmation) return 'You must confirm that all information is correct';
    return '';
  };

  const handleSubmit = e => {
    e.preventDefault();
    const errMsg = validate();
    if (errMsg) {
      setFormError(errMsg);
      return;
    }
    setFormError('');
    // Only send required fields
    const { password_confirmation, confirmation, ...submitData } = form;
    dispatch(registerUser(submitData));
  };

  return (
    <div className="bg-gray-200 min-h-screen flex flex-col items-center justify-start py-10">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img className="mx-auto h-20 w-auto" src={logo} alt="Workflow Logo" />
        <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900">
          Register Your Account
        </h2>
      </div>

      {/* Top Error Messages */}
      <div className="mx-auto max-w-md">
        {formError && (
          <div className="mb-4 text-red-600 text-sm bg-white p-3 rounded shadow text-center" role="alert" aria-live="assertive">
            {formError}
          </div>
        )}
        {error && (
          <div className="mb-4 text-red-600 text-sm bg-white p-3 rounded shadow text-center" role="alert" aria-live="assertive">
            {error}
          </div>
        )}
        {registrationSuccess && (
          <div className="mb-4 text-green-600 text-sm bg-white p-3 rounded shadow text-center" role="alert" aria-live="assertive">
            Registration successful! Redirecting to login...
          </div>
        )}
      </div>

      {/* Form */}
      <div className="mt-4 mx-auto w-full max-w-md">
        <form className="w-full px-6 py-6 bg-white shadow-md rounded-md" noValidate onSubmit={handleSubmit}>
          {/* Row 1: Name + CNIC */}
          <div className="flex flex-col sm:flex-row sm:space-x-4">
            <div className="flex-1 mb-4 sm:mb-0">
              <label htmlFor="full_name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                id="full_name"
                name="full_name"
                type="text"
                placeholder="Full Name"
                required
                pattern="^[a-zA-Z\s]+$"
                autoComplete="name"
                value={form.full_name}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div className="flex-1">
              <label htmlFor="cnic" className="block text-sm font-medium text-gray-700">
                CNIC
              </label>
              <input
                id="cnic"
                name="cnic"
                type="text"
                placeholder="4XXXX-XXXXXXX-X"
                required
                maxLength="15"
                pattern="^4\d{4}-\d{7}-\d{1}$"
                autoComplete="off"
                value={form.cnic}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>

          {/* Row 2: Email + Mobile */}
          <div className="flex flex-col sm:flex-row sm:space-x-4 mt-6">
            <div className="flex-1 mb-4 sm:mb-0">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="user@example.com"
                required
                autoComplete="email"
                value={form.email}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div className="flex-1">
              <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">
                Mobile Number
              </label>
              <input
                id="mobile"
                name="mobile"
                type="tel"
                placeholder="03XXXXXXXXX"
                required
                maxLength="11"
                pattern="^03\d{9}$"
                autoComplete="tel"
                value={form.mobile}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>

          {/* Row 3: Passwords */}
          <div className="flex flex-col sm:flex-row sm:space-x-4 mt-6">
            <div className="flex-1 mb-4 sm:mb-0">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                minLength="8"
                autoComplete="new-password"
                value={form.password}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div className="flex-1">
              <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                id="password_confirmation"
                name="password_confirmation"
                type="password"
                required
                autoComplete="new-password"
                value={form.password_confirmation}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>

          {/* Checkbox */}
          <div className="mt-6 flex items-center">
            <input
              id="confirmation"
              name="confirmation"
              type="checkbox"
              required
              checked={form.confirmation}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="confirmation" className="ml-2 block text-sm text-gray-700">
              I confirm that all the information entered is correct.
            </label>
          </div>

          {/* Submit Button */}
          <div className="mt-8">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            >
              {loading ? 'Registering...' : 'Register'}
            </button>
          </div>

          {/* Login Link */}
          <div className="min-w-[270px]">
            <div className="mt-4 text-center text-gray-700">
              Already Registered Users?{' '}
              <Link to="/login" className="text-blue-500 underline hover:text-blue-600">
                Login
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
