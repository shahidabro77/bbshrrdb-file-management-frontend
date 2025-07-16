import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { SIDEBAR_ITEMS } from '../redux/authSlice';

// Sidebar icons mapping
const ICONS = {
  Dashboard: 'fas fa-tachometer-alt',
  'Accounts Section': 'fas fa-file-invoice-dollar',
  'Training Section': 'fas fa-chalkboard-teacher',
  'Training Director': 'fas fa-chalkboard-teacher',
  'Private Sector': 'fas fa-building',
  'Public Sector': 'fas fa-city',
  'IT Section': 'fas fa-desktop',
  'User Management': 'fas fa-users-cog',
  Settings: 'fas fa-cog',
};

const Sidebar = () => {
  const user = useSelector(state => state.auth.user);
  let role = user?.role || user?.user?.role;
  if (role) role = role.trim().toLowerCase();
  const items = SIDEBAR_ITEMS[role] || [];

  return (
    <aside className="w-64 bg-gradient-to-b from-blue-900 to-blue-700 text-white p-4 fixed top-[72px] bottom-0 left-0 overflow-y-auto z-40">
      <nav className="space-y-4">
        <h3 className="text-xs font-semibold uppercase text-blue-200 mb-1">Menu</h3>
        <div className="space-y-1">
          {items.map(item => (
            <NavLink
              key={item.label}
              to={item.href}
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded hover:bg-blue-600 transition duration-200 ${
                  isActive ? 'bg-blue-600 font-semibold' : ''
                }`
              }
            >
              <i className={`${ICONS[item.label] || 'fas fa-circle'} w-4`}></i>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
