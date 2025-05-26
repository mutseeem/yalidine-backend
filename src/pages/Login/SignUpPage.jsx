// src/pages/SignUpPage/SignUpPage.jsx
import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import styles from './Auth.module.css';
// Import all necessary icons directly into SignUpPage
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaUserShield } from 'react-icons/fa';


const SignUpPage = () => {
  const [username, setUsername] = useState(''); // This will behave as an email
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // State for confirm password
  const [role, setRole] = useState('viewer'); // Default role
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State for MAIN password visibility
  // Removed: [showConfirmPassword, setShowConfirmPassword] state as it's no longer needed
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    // 1. Password Matching Validation
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    // 2. Password Complexity Validation
    const passwordRegex = {
      minLength: /.{8,}/, // Minimum 8 characters
      hasCapital: /[A-Z]/, // At least one capital letter
      hasLowercase: /[a-z]/, // At least one lowercase letter
      hasDigit: /\d/, // At least one digit
      hasSpecialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, // At least one special character
    };

    if (!passwordRegex.minLength.test(password)) {
      setError('Password must be at least 8 characters long.');
      return;
    }
    if (!passwordRegex.hasCapital.test(password)) {
      setError('Password must contain at least one capital letter.');
      return;
    }
    if (!passwordRegex.hasLowercase.test(password)) {
      setError('Password must contain at least one lowercase letter.');
      return;
    }
    if (!passwordRegex.hasDigit.test(password)) {
      setError('Password must contain at least one digit.');
      return;
    }
    if (!passwordRegex.hasSpecialChar.test(password)) {
      setError('Password must contain at least one special character (!@#$%^&*...).');
      return;
    }

    // If all validations pass, attempt signup
    if (signup(username, password, role)) {
      alert('Account created successfully! Please log in.');
      navigate('/login');
    } else {
      setError('Username already exists. Please choose another.');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Removed: toggleConfirmPasswordVisibility function as it's no longer needed

  return (
    <div className={styles.authContainer}>
      <form onSubmit={handleSubmit} className={styles.authForm}>
        <h2>Sign Up</h2>
        {error && <p className={styles.error}>{error}</p>}

        {/* Username/Email Input Group */}
        <div className={styles.inputGroup}>
          <FaEnvelope className={styles.inputIcon} />
          <input
            type="email"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label htmlFor="username">Your Email</label>
          <span className={styles.inputBar}></span>
        </div>

        {/* Password Input Group */}
        <div className={styles.inputGroup}>
          <FaLock className={styles.inputIcon} />
          <input
            type={showPassword ? 'text' : 'password'} // Type still toggled by showPassword state
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label htmlFor="password">Password</label>
          <span className={styles.inputBar}></span>
          <span className={styles.passwordToggle} onClick={togglePasswordVisibility}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        {/* Confirm Password Input Group (Eye icon removed) */}
        <div className={styles.inputGroup}>
          <FaLock className={styles.inputIcon} />
          <input
            type="password" // Type is always 'password' now
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <label htmlFor="confirmPassword">Confirm Password</label>
          <span className={styles.inputBar}></span>
          {/* Removed: Password toggle span for confirm password */}
        </div>

        {/* Role Selection Input Group */}
        <div className={styles.inputGroup}>
          <FaUserShield className={styles.inputIcon} />
          <select
            id="role"
            name="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="viewer">Viewer</option>
            <option value="admin">Admin</option>
          </select>
          <label htmlFor="role">Role</label>
          <span className={styles.inputBar}></span>
        </div>

        <button type="submit" className={styles.authButton}>Sign Up</button>
        <p className={styles.switchAuth}>
          Already have an account? <Link to="/login">Login</Link>
        </p>
        <p className={styles.goBack}>
          <Link to="/">Go back to Landing Page</Link>
        </p>
      </form>
    </div>
  );
};

export default SignUpPage;