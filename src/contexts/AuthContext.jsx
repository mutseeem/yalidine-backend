// src/contexts/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
// REMOVED: import { useNavigate } from 'react-router-dom'; // This import is no longer needed here

const AuthContext = createContext(null);

const USER_STORAGE_KEY = 'mock_users';
const CURRENT_USER_KEY = 'mock_current_user';

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null); // { username: '', role: '' }
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // REMOVED: const navigate = useNavigate(); // This line caused the error

  // Load user from session storage on initial load
  useEffect(() => {
    const storedUser = sessionStorage.getItem(CURRENT_USER_KEY);
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setCurrentUser(user);
        setIsLoggedIn(true);
      } catch (e) {
        console.error("Failed to parse stored user:", e);
        sessionStorage.removeItem(CURRENT_USER_KEY);
      }
    }
  }, []);

  const login = (username, password) => {
    const users = JSON.parse(localStorage.getItem(USER_STORAGE_KEY) || '[]');
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
      setCurrentUser(user);
      setIsLoggedIn(true);
      sessionStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user)); // Persist login state
      console.log(`User ${username} logged in with role: ${user.role}`);
      return true; // Login successful
    } else {
      console.log('Login failed: Invalid credentials');
      return false; // Login failed
    }
  };

  const signup = (username, password, role) => {
    let users = JSON.parse(localStorage.getItem(USER_STORAGE_KEY) || '[]');
    if (users.some(u => u.username === username)) {
      console.log('Signup failed: Username already exists');
      return false; // Username already exists
    }

    const newUser = { username, password, role };
    users.push(newUser);
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(users));
    console.log(`User ${username} signed up with role: ${role}`);
    return true; // Signup successful
  };

  // Modified logout function: It no longer performs navigation.
  // The component that calls logout will be responsible for navigating.
  const logout = () => {
    setCurrentUser(null);
    setIsLoggedIn(false);
    sessionStorage.removeItem(CURRENT_USER_KEY);
    console.log('User logged out');
    // REMOVED: navigate('/login');
  };

  const getUserRole = () => currentUser ? currentUser.role : null;

  return (
    <AuthContext.Provider value={{ isLoggedIn, currentUser, login, signup, logout, getUserRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};