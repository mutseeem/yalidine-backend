// src/pages/LoginPage/LoginPage.jsx
import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import styles from './Auth.module.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, signup } = useAuth(); // Import signup as well for guest logic
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (login(username, password)) {
      // Logic for redirecting after successful login based on role
      const userRole = JSON.parse(sessionStorage.getItem('mock_current_user'))?.role;
      if (userRole === 'admin') {
        navigate('/chapters/overview'); // Admin goes to overview
      } else {
        navigate('/chapters/politique-ouverture'); // Viewers/Guests go to a default chapter page
      }
    } else {
      setError('Invalid username or password.');
    }
  };

  // NEW: Handle "Continue as Guest" functionality
  const handleGuestLogin = () => {
    setError('');
    const guestUsername = 'guestUser';
    const guestPassword = 'guestPassword'; // A fixed, known password for the guest account
    const guestRole = 'guest';

    // Attempt to log in as guest.
    // If guest account doesn't exist, sign it up first (one-time setup).
    if (!login(guestUsername, guestPassword)) {
      // If login fails (meaning guest account doesn't exist), try to sign up
      const isGuestSignedUp = signup(guestUsername, guestPassword, guestRole);
      if (isGuestSignedUp) {
        // If signup is successful, try to log in again
        if (login(guestUsername, guestPassword)) {
          console.log("Guest account created and logged in.");
          navigate('/chapters/politique-ouverture'); // Redirect guest to a public chapter page
        } else {
          setError('Failed to log in as guest after signup.');
        }
      } else {
        setError('Failed to create guest account.');
      }
    } else {
      // Guest account already exists and logged in successfully
      console.log("Logged in as existing guest user.");
      navigate('/chapters/politique-ouverture'); // Redirect guest to a public chapter page
    }
  };


  return (
    <div className={styles.authContainer}>
      <form onSubmit={handleSubmit} className={styles.authForm}>
        <h2>Login</h2>
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
        <button type="submit" className={styles.authButton}>Login</button>
        <p className={styles.switchAuth}>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
        {/* New: Go back to Landing Page button */}
        <p className={styles.goBack}>
          <Link to="/">Go back to Landing Page</Link>
        </p>
      </form>

      {/* NEW: Continue as Guest button */}
      <div className={styles.authContainerDivider}>OR</div>
      <button
        onClick={handleGuestLogin}
        className={`${styles.authButton} ${styles.guestButton}`}
      >
        Continue as Guest
      </button>
    </div>
  );
};

export default LoginPage;