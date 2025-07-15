import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';


const Header = ({ onToggleSidebar }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dateTime, setDateTime] = useState('');

  // Update date and time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = {
        year: 'numeric', month: 'long', day: 'numeric',
        hour: '2-digit', minute: '2-digit', hour12: true,
        timeZone: 'Asia/Karachi',
      };
      const formatted = now.toLocaleString('en-PK', options).replace(',', ' | Time:');
      setDateTime(`Date: ${formatted} PKT`);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000); // update every minute
    return () => clearInterval(interval);
  }, []);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/login');
  };


  return (
    <header className="bg-blue-800 text-white p-4 shadow-md fixed w-full top-0 left-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          {/* Sidebar Toggle Button */}
          <button
            className="md:hidden mr-4 focus:outline-none"
            aria-label="Toggle Menu"
            onClick={onToggleSidebar}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
          <span className="text-lg md:text-2xl font-bold whitespace-nowrap">
            BBSHRRDB File Management System
          </span>
        </div>

        <div className="flex items-center space-x-4 relative">
          {/* Date & Time */}
          <span className="hidden md:block text-sm">
            {dateTime}
          </span>

          {/* User Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center hover:bg-blue-600 px-3 py-2 rounded-md focus:outline-none transition duration-200"
            >
              <i className="fas fa-user mr-2"></i> User
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-md shadow-lg z-50">
                <a href="/profile_settings" className="flex items-center px-4 py-2 hover:bg-blue-100 transition duration-200">
                  <i className="fas fa-user mr-2 text-blue-600"></i> Profile Settings
                </a>
                <a href="/settings" className="flex items-center px-4 py-2 hover:bg-blue-100 transition duration-200">
                  <i className="fas fa-cog mr-2 text-green-600"></i> Settings
                </a>
                <button
                  onClick={handleLogout}
                  className="w-full text-left flex items-center px-4 py-2 text-red-600 hover:bg-blue-100 transition duration-200"
                >
                  <i className="fas fa-sign-out-alt mr-2"></i> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
