import React, { useState } from 'react';
import styles from './Sidebar.module.css';


    /* this here is the code for the side bar made as requested expand and collapse when hovered over and has all parts of the content as requested 
          in the design PS. deal with the logout button position bullshit on your own */
          
export default function Sidebar() {
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false); // State for account menu visibility

  const handleAccountClick = () => {
    setIsAccountMenuOpen(!isAccountMenuOpen); // Toggle account menu visibility
  };

  const handleLogout = () => {
    console.log('User logged out'); // Replace with actual logout logic
    alert('Logout successful!'); // Optional: Show a confirmation message
  };

  const profilePictureUrl = './src/assets/ilyesHHH.png';

  return (
    <div className={styles.sidebar}>
      {/* Profile Picture */}
      <div className={styles.accountIcon} onClick={handleAccountClick}>
        <img
          src={profilePictureUrl}
          alt="👤"
          className={styles.profilePicture}
          onError={(e) => {
            e.target.style.display = 'none'; // Hide the image if it fails to load
          }}
        />
        <span className={styles.fallbackIcon}>👤</span> {/* Fallback icon */}

        {/* Account Dropdown Menu */}
        {isAccountMenuOpen && (
          <div className={styles.accountMenu}>
            <ul>
              <li>
                <button onClick={() => console.log('Profile clicked')}>Profile</button>
              </li>
              <li>
                <button onClick={() => console.log('Settings clicked')}>Settings</button>
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Sidebar Items */}
      <ul className={styles.sidebarItems}>
        <li className={styles.sidebarItem}>
          <span className={styles.icon}>📁</span>
          <span className={styles.itemName}>Item 1</span>
        </li>
        <li className={styles.sidebarItem}>
          <span className={styles.icon}>📄</span>
          <span className={styles.itemName}>Item 2</span>
        </li>
        <li className={styles.sidebarItem}>
          <span className={styles.icon}>📂</span>
          <span className={styles.itemName}>Item 3</span>
        </li>
        <li className={styles.sidebarItem}>
          <span className={styles.icon}>📊</span>
          <span className={styles.itemName}>Item 4</span>
        </li>
      </ul>

      {/* Logout Button */}
      <div className={styles.logoutContainer}>
        <button className={styles.logoutButton} onClick={handleLogout}>
          <span className={styles.icon}>🚪</span>
          <span className={styles.logoutText}>Logout</span>
        </button>
      </div>
    </div>
  );
}