import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from './redux/authSlice'; // ✅ import the login thunk
import logo from './assets/logo.png';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Local state for form
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { loading, error } = useSelector(state => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await dispatch(loginUser({ email: email, password }));

    if (res.meta.requestStatus === 'fulfilled') {
      navigate('/dashboard');
    }
  };

  return (
    <div className="py-20">
      <div className="flex h-full items-center justify-center">
        <div className="rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-900 flex-col flex h-full items-center justify-center sm:px-4">
          <div className="flex h-full flex-col justify-center gap-4 p-6">
            <h1 className="mb-4 text-2xl text-center font-bold dark:text-white">
              Login File Tracking System
            </h1>

            <div className="left-0 right-0 inline-block border-gray-200 px-2 py-2.5 sm:px-4">
              <img src={logo} alt="Logo" className="mx-auto block" />

              <form onSubmit={handleSubmit} className="flex flex-col gap-4 pb-4">
                <div>
                  <label className="text-sm font-medium text-gray-900 dark:text-gray-300" htmlFor="email">
                    Email
                  </label>
                  <input
                    id="email"
                    type="text"
                    name="email"
                    placeholder="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="block w-full mt-1 border bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white p-2.5 text-sm rounded-lg"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-900 dark:text-gray-300" htmlFor="password">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    name="password"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="block w-full mt-1 border bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white p-2.5 text-sm rounded-lg"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="bg-sky-600 hover:bg-sky-700 text-white rounded-lg py-2 mt-2"
                >
                  {loading ? 'Logging in...' : 'Login'}
                </button>

                {error && (
                  <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
                )}
              </form>

              <div className="text-center mt-4 dark:text-gray-200">
                New user?{' '}
                <Link
                  to="/register"
                  className="text-blue-500 underline hover:text-blue-600"
                >
                  Create account here
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
