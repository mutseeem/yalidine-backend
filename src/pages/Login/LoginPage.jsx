// src/pages/LoginPage/LoginPage.jsx
import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import styles from './Auth.module.css';
// Import the necessary icons for LoginPage
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';


const LoginPage = () => {
  const [username, setUsername] = useState(''); // This will behave as an email
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const { login } = useAuth(); // Removed 'signup' as it's not used here for standard login
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (login(username, password)) {
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

  // Removed handleGuestLogin function as per previous request for this page

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles.authContainer}>
      <form onSubmit={handleSubmit} className={styles.authForm}>
        <h2>Login</h2>
        {error && <p className={styles.error}>{error}</p>}

        {/* Username/Email Input Group */}
        <div className={styles.inputGroup}>
          <FaEnvelope className={styles.inputIcon} /> {/* Email icon */}
          <input
            type="text" // Changed type to email for email validation
            id="username"
            name="username" // Add name attribute for consistency
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label htmlFor="username">Your Email</label>
          <span className={styles.inputBar}></span> {/* Bottom bar for animation */}
        </div>

        {/* Password Input Group */}
        <div className={styles.inputGroup}>
          <FaLock className={styles.inputIcon} /> {/* Lock icon */}
          <input
            type={showPassword ? 'text' : 'password'} // Toggle type based on state
            id="password"
            name="password" // Add name attribute
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label htmlFor="password">Password</label>
          <span className={styles.inputBar}></span> {/* Bottom bar for animation */}
          {/* Password visibility toggle */}
          <span className={styles.passwordToggle} onClick={togglePasswordVisibility}>
            {showPassword ? <FaEyeSlash /> : <FaEye />} {/* Eye icon toggle */}
          </span>
        </div>

        <button type="submit" className={styles.authButton}>Login</button>
        <p className={styles.switchAuth}>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
        <p className={styles.goBack}>
          <Link to="/">Go back to Landing Page</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;