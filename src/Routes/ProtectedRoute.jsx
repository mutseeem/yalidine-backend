// src/components/ProtectedRoute/ProtectedRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // Adjust the import path as necessary

const ProtectedRoute = ({ allowedRoles }) => {
  const { isLoggedIn, getUserRole } = useAuth();
  const userRole = getUserRole();

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />; // Not logged in, redirect to login
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    // Logged in, but role not allowed, redirect to unauthorized page or overview
    return <Navigate to="/unauthorized" replace />; // Create an Unauthorized page
  }

  return <Outlet />; // User is logged in and has the allowed role, render child routes
};

export default ProtectedRoute;