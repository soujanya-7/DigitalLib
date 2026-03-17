import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('athena_user');
    const token = localStorage.getItem('athena_token');
    if (savedUser && token) {
      setUser(JSON.parse(savedUser));
      axios.defaults.headers.common['x-auth-token'] = token;
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const res = await axios.post('http://localhost:5001/api/auth/login', { email, password });
    const { token, user } = res.data;
    localStorage.setItem('athena_token', token);
    localStorage.setItem('athena_user', JSON.stringify(user));
    axios.defaults.headers.common['x-auth-token'] = token;
    setUser(user);
    return user;
  };

  const signup = async (name, email, password, role) => {
    const res = await axios.post('http://localhost:5001/api/auth/register', { name, email, password, role });
    const { token, user } = res.data;
    localStorage.setItem('athena_token', token);
    localStorage.setItem('athena_user', JSON.stringify(user));
    axios.defaults.headers.common['x-auth-token'] = token;
    setUser(user);
    return user;
  };

  const logout = () => {
    localStorage.removeItem('athena_token');
    localStorage.removeItem('athena_user');
    delete axios.defaults.headers.common['x-auth-token'];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    // Return a dummy object to prevent destructuring crashes
    return { user: null, login: () => {}, signup: () => {}, logout: () => {}, loading: true };
  }
  return context;
};
