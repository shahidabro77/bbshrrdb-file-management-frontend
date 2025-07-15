import React from 'react';
import logo from './assets/logo.png';
import { Link } from 'react-router-dom';

const RegisterForm = () => {
  return (
    <div className="bg-gray-200 min-h-screen flex flex-col items-center justify-start py-10">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img className="mx-auto h-20 w-auto" src={logo} alt="Workflow Logo" />
        <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900">
          Register Your Account
        </h2>
      </div>

      {/* Top Error Messages */}
      <div id="top-errors-container" className="mx-auto max-w-md">
        {[
          {
            id: 'name-top-error',
            text: 'Please enter your full name (letters and spaces only)',
          },
          {
            id: 'cnic-top-error',
            text: 'Please enter a valid CNIC of Sindh province (e.g., 41234-1234567-1)',
          },
          {
            id: 'email-top-error',
            text: 'Please enter a valid email address (e.g., user@example.com)',
          },
          {
            id: 'mobile-top-error',
            text: 'Please enter a valid mobile number starting with 03 (11 digits)',
          },
          {
            id: 'password-top-error',
            text: 'Password must be at least 8 characters and both passwords must match',
          },
          {
            id: 'checkbox-top-error',
            text: 'You must confirm that all information is correct',
          },
        ].map((error) => (
          <div
            key={error.id}
            id={error.id}
            className="mb-4 text-red-600 text-sm hidden bg-white p-3 rounded shadow text-center"
            role="alert"
            aria-live="assertive"
          >
            {error.text}
          </div>
        ))}
      </div>

      {/* Form */}
      <div className="mt-4 mx-auto w-full max-w-md">
        <form
          id="registrationForm"
          action="/api/register"
          method="POST"
          className="w-full px-6 py-6 bg-white shadow-md rounded-md"
          noValidate
        >
          <input type="hidden" id="user_uid" name="user_uid" />

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
                aria-describedby="name-error"
                autoComplete="name"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              <p id="name-error" className="text-red-600 text-sm mt-1 hidden" role="alert">
                Name is required and must contain only letters and spaces.
              </p>
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
                aria-describedby="cnic-error"
                autoComplete="off"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              <p id="cnic-error" className="text-red-600 text-sm mt-1 hidden" role="alert">
                CNIC must be in format 4XXXX-XXXXXXX-X
              </p>
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
                aria-describedby="email-error"
                autoComplete="email"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              <p id="email-error" className="text-red-600 text-sm mt-1 hidden" role="alert">
                Enter a valid email address.
              </p>
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
                aria-describedby="mobile-error"
                autoComplete="tel"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              <p id="mobile-error" className="text-red-600 text-sm mt-1 hidden" role="alert">
                Enter a valid mobile number starting with 03.
              </p>
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
                aria-describedby="password-error"
                autoComplete="new-password"
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
                aria-describedby="password-error"
                autoComplete="new-password"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              <p id="password-error" className="text-red-600 text-sm mt-1 hidden" role="alert">
                Passwords must match and be at least 8 characters.
              </p>
            </div>
          </div>

          {/* Checkbox */}
          <div className="mt-6 flex items-center">
            <input
              id="confirmation"
              name="confirmation"
              type="checkbox"
              required
              aria-describedby="checkbox-error"
              defaultChecked
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="confirmation" className="ml-2 block text-sm text-gray-700">
              I confirm that all the information entered is correct.
            </label>
          </div>
          <p id="checkbox-error" className="text-red-600 text-sm mt-1 hidden" role="alert">
            You must confirm your information.
          </p>

          {/* Submit Button */}
          <div className="mt-8">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Register
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
