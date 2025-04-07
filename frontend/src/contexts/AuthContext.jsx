// src/contexts/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Decode token and set user on load or token change
  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        
        setUser(decoded);
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        console.log("Decoded token:", decoded);

        
      } catch (err) {
        console.error('Invalid token:', err);
        logout();
      }
    } else {
      setUser(null);
    }
    setLoading(false);
  }, [token]);

  // ✅ Redirect if already logged in and trying to access login/register
  useEffect(() => {
    const isAuthPage = ['/login', '/register'].includes(location.pathname);
    if (!loading && token && isAuthPage) {
      navigate('/dashboard', { replace: true });
    }
  }, [loading, token, location.pathname, navigate]);

  // ✅ Login with error handling
  const login = async (email, password) => {
    try {
      const response = await api.post('/login', { email, password });
      const token = response.data.token;
      localStorage.setItem('token', token);
      setToken(token);
      const decoded = jwtDecode(token);
      setUser(decoded);
      navigate('/dashboard');
      return response.data;
    } catch (err) {
      throw err.response?.data?.error || 'Login failed. Please try again.';
    }
  };

  // ✅ Register with error handling
  const register = async (username, email, password) => {
    try {
      const response = await api.post('/register', { username, email, password });
      const token = response.data.token;
      localStorage.setItem('token', token);
      setToken(token);
      const decoded = jwtDecode(token);
      setUser(decoded);
      navigate('/dashboard');
      return response.data;
    } catch (err) {
      throw err.response?.data?.error || 'Registration failed. Please try again.';
    }
  };

  // ✅ Logout and clear everything
  const logout = () => {
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
    setUser(null);
    setToken(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider
      value={{ user, token, login, register, logout, loading }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

// ✅ Hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
