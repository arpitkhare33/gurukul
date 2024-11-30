import React, { createContext, useState, useEffect } from 'react';
import api from '../api/api';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (email, password) => {
    try {
        console.log("Requesting post: ", email, password);
      const response = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      console.log("Successful login:", response.data.token);
      setUser(response.data.user);  // assuming the response contains user data
      window.location.href = '/dashboard';
      return response.data.user;
    } catch (error) {
      console.error('Login failed:', error);
      throw new Error('Login failed');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const checkAuthentication = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await api.get('/user/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);  // assuming profile endpoint returns user data
      } catch (error) {
        console.error('Session expired or unauthorized');
        logout();
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    checkAuthentication();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
