import React from 'react';
import { NavLink } from 'react-router-dom';

const sections = [
  {
    title: 'Core',
    links: [
      { name: 'Dashboard', icon: 'fas fa-tachometer-alt', path: '/dashboard' },
      { name: 'Received File', icon: 'fas fa-inbox', path: '/received_file' },
      { name: 'Sent File', icon: 'fas fa-paper-plane', path: '/sent_file' },
      { name: 'Search File', icon: 'fas fa-search', path: '/search_file' },
      { name: 'QR Code', icon: 'fas fa-qrcode', path: '/qr_code' },
    ],
  },
  {
    title: 'Administration',
    links: [
      { name: 'User Management', icon: 'fas fa-users-cog', path: '/user_management' },  // Only User Management remains here
    ],
  },
  {
    title: 'Sections',
    links: [
      { name: 'Files Tracking', icon: 'fas fa-folder-open', path: '/files_tracking' },
      { name: 'Secretary Office', icon: 'fas fa-briefcase', path: '/secretary_office' },
      { name: 'Admin Section', icon: 'fas fa-user-shield', path: '/admin_section' },
      { name: 'Accounts Section', icon: 'fas fa-file-invoice-dollar', path: '/accounts_section' },
      { name: 'Training Section', icon: 'fas fa-chalkboard-teacher', path: '/training_section' },
      { name: 'Private Sector', icon: 'fas fa-building', path: '/private_sector' },
      { name: 'Public Sector', icon: 'fas fa-city', path: '/public_sector' },
      { name: 'I.T Section', icon: 'fas fa-desktop', path: '/it_section' },
    ],
  },
  {
    title: 'Tools',
    links: [
      { name: 'Folders', icon: 'fas fa-folder', path: '/folders' },
      { name: 'File Manager', icon: 'fas fa-folder-tree', path: '/file_manager' },
      { name: 'Reference Dashboard', icon: 'fas fa-link', path: '/reference_dashboard' },
      { name: 'Setting', icon: 'fas fa-cog', path: '/setting' },
    ],
  },
];

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gradient-to-b from-blue-900 to-blue-700 text-white p-4 fixed top-[72px] bottom-0 left-0 overflow-y-auto z-40">
      <nav className="space-y-4">
        {sections.map((section) => (
          <div key={section.title}>
            <h3 className="text-xs font-semibold uppercase text-blue-200 mb-1">{section.title}</h3>
            <div className="space-y-1">
              {section.links.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-2 rounded hover:bg-blue-600 transition duration-200 ${
                      isActive ? 'bg-blue-600 font-semibold' : ''
                    }`
                  }
                >
                  <i className={`${link.icon} w-4`}></i>
                  <span>{link.name}</span>
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
