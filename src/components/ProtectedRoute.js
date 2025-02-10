import React from 'react';
import { Navigate } from 'react-router-dom';

// checks localStorage, if authenticated, renders page.
// if not authenticated, redirects to /login.
// Unprotected Routes Signup and Login remain accessible.
// WeatherPage, History, and Favorites require authentication
function ProtectedRoute({ element }) {
  const token = localStorage.getItem('token');

  return token ? element : <Navigate to="/login" replace />;
}

export default ProtectedRoute;
