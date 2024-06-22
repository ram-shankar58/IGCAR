import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import Settings from '../pages/Settings';
import Reports from '../pages/Reports';
import Notifications from '../pages/Notifications';
import Analytics from '../pages/Analytics';
import PermissionDenied from '../components/PermissionDenied'; // Create this page for permission restricted message
import TimeoutHandler from '../components/TimeoutHandler'; // Import TimeoutHandler

const ProtectedRoute = ({ children, allowedDesignations }) => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (allowedDesignations && !allowedDesignations.includes(user.designation)) {
    return <Navigate to="/permission-denied" />;
  }

  return children;
};

const AppRoutes = () => {
  return (
    <BrowserRouter>
    <TimeoutHandler>
      <Routes>
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
        <Route path="/reports" element={<ProtectedRoute allowedDesignations={['E', 'F', 'G']} ><Reports /></ProtectedRoute>} />
        <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
        <Route 
          path="/analytics" 
          element={<ProtectedRoute allowedDesignations={['E', 'F', 'G']}><Analytics /></ProtectedRoute>} 
        />
        <Route path="/permission-denied" element={<PermissionDenied />} />
      </Routes>
      </TimeoutHandler>
    </BrowserRouter>
  );
};

export default AppRoutes;
