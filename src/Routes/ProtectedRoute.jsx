// src/components/ProtectedRoute/ProtectedRoute.jsx
import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ allowedRoles }) => {
  const { isLoggedIn, getUserRole, authLoading } = useAuth(); // NEW: Get authLoading
  const userRole = getUserRole();
  const location = useLocation();

  // NEW: If authentication is still loading, render a loading spinner or null
  if (authLoading) {
    return <div>Loading authentication...</div>; // Or a better loading component
  }

  // Rule 1: If not logged in and the route is NOT allowed for guests, redirect to login
  if (!isLoggedIn && !allowedRoles.includes('guest')) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Rule 2: If logged in, but role is not allowed, redirect to unauthorized
  if (isLoggedIn && allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // If user passes all checks, render the children
  return <Outlet />;
};

export default ProtectedRoute;