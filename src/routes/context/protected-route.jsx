import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './auth-context';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
