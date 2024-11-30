import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthProvider from './components/AuthProvider';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProtectedRoute from './components/ProtectedRoute';
import ProfileUpdate from './pages/ProfileUpdate';
const Dashboard = () => <h2>Welcome to Dashboard</h2>;  // Sample dashboard component

function App() {
  const isAuthenticated = () => {
    return localStorage.getItem('token') !== null;
  };
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/profile-update"
            element={isAuthenticated() ? <ProfileUpdate /> : <Navigate to="/login" />}
          />

        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
