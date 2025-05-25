// src/pages/SignUpPage/SignUpPage.jsx
import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import styles from './Auth.module.css';

const SignUpPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('viewer'); // Default role
  const [error, setError] = useState('');
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (signup(username, password, role)) {
      alert('Account created successfully! Please log in.');
      navigate('/login');
    } else {
      setError('Username already exists. Please choose another.');
    }
  };

  return (
    <div className={styles.authContainer}>
      <form onSubmit={handleSubmit} className={styles.authForm}>
        <h2>Sign Up</h2>
        {error && <p className={styles.error}>{error}</p>}
        <div className={styles.inputGroup}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="role">Role:</label>
          <select id="role" value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="viewer">Viewer</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button type="submit" className={styles.authButton}>Sign Up</button>
        <p className={styles.switchAuth}>
          Already have an account? <Link to="/login">Login</Link>
        </p>
        {/* New: Go back to Landing Page button */}
        <p className={styles.goBack}>
          <Link to="/">Go back to Landing Page</Link>
        </p>
      </form>
    </div>
  );
};

export default SignUpPage;