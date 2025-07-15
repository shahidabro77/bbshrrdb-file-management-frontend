import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';
import RegisterForm from './RegisterForm';
import ReceivedFile from './pages/ReceivedFile';
import SentFile from './pages/SentFile';
import Dashboard from './pages/Dashboard';
import Header from './pages/Header';
import Sidebar from './pages/Sidebar';
import SearchFile from './pages/SearchFile'; // ✅ NEW IMPORT
import QRCodeGenerator from './pages/QRCodeGenerator'; // ✅ NEW IMPORT
import UserManagement from './pages/UserManagement'; // ✅ NEW IMPORT
import UserProfileSettings from './pages/UserProfileSettings'; // ✅ NEW IMPORT for User Profile Settings
import PrivateRoute from './PrivateRoute'; // ✅ Import it


// Layout component that wraps around protected routes
const MainLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div>
      <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      {sidebarOpen && <Sidebar />}
      <main className={`pt-[72px] ${sidebarOpen ? 'ml-64' : ''} p-4 transition-all duration-300`}>
        {children}
      </main>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterForm />} />

        {/* Main App Routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <MainLayout>
                <Dashboard />
              </MainLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/received_file"
          element={
            <PrivateRoute>
              <MainLayout>
                <ReceivedFile />
              </MainLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/sent_file"
          element={
            <PrivateRoute>
              <MainLayout>
                <SentFile />
              </MainLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/search_file"
          element={
            <PrivateRoute>
              <MainLayout>
                <SearchFile />
              </MainLayout>
            </PrivateRoute>
          }
        />
        {/* ✅ QR Code Route */}
        <Route
          path="/qr_code"
          element={
            <PrivateRoute>
              <MainLayout>
                <QRCodeGenerator />
              </MainLayout>
            </PrivateRoute>
          }
        />
        {/* ✅ User Management Route */}
        <Route
          path="/user_management"
          element={
            <PrivateRoute>
              <MainLayout>
                <UserManagement />
              </MainLayout>
            </PrivateRoute>
          }
        />
        {/* ✅ User Profile Settings Route */}
        <Route
          path="/profile_settings"
          element={
            <PrivateRoute>
              <MainLayout>
                <UserProfileSettings />
              </MainLayout>
            </PrivateRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
