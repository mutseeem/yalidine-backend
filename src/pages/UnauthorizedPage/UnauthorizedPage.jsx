// src/pages/UnauthorizedPage/UnauthorizedPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Auth.module.css'; // Reusing styling

const UnauthorizedPage = () => {
  return (
    <div className={styles.authContainer}>
      <div className={styles.authForm} style={{textAlign: 'center'}}>
        <h2>Access Denied</h2>
        <p>You do not have permission to view this page.</p>
        <p>Please <Link to="/login">login</Link> with an authorized account.</p>
        <p><Link to="/chapters/overview">Go to Overview</Link></p>
      </div>
    </div>
  );
};

export default UnauthorizedPage;