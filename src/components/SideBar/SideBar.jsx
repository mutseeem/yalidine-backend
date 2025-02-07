import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import styles from './SideBar.module.css';
import FolderIcon from '../../assets/icons/folder-open.svg';
import EyeIcon from '../../assets/icons/eye.svg';
import FolderIcon2 from '../../assets/icons/folder-open2.svg';
import EyeIcon2 from '../../assets/icons/eye2.svg';
import ExitIcon from '../../assets/icons/exit.png';

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
  <span className={styles.itemName}>Ilyes Izmr</span>
  <span className={styles.fallbackIcon}></span> {/* Fallback icon */}

  {/* Home and Settings Buttons */}
  <div className={styles.accountButtons}>
  <button className={styles.accountButton} onClick={() => console.log('Home clicked')}>
    Home
  </button>
  <button className={styles.accountButton} onClick={() => console.log('Settings clicked')}>
    Settings
  </button>
</div>

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
      <li className={styles.sidebarItem}>
          <Link to="/overview" className={styles.sidebarLink}>
            <span className={styles.iconContainer}>
              <img src={EyeIcon} alt="Eye Icon" className={styles.eyeIcon} />
              <img src={EyeIcon2} alt="Eye Icon 2" className={styles.eyeIcon2} />
            </span>
            <span className={styles.itemName}>Overview</span>
          </Link>
        </li>
      <ul className={styles.sidebarItems}>
      
        <li className={styles.sidebarItem}>
          <span className={styles.iconContainer}>
            <img src={FolderIcon} alt="Folder Icon" className={styles.folderIcon} />
            <img src={FolderIcon2} alt="Folder Icon 2" className={styles.folderIcon2} />
          </span>
          <span className={styles.itemName}>Politique D’ouverture internationale</span>
        </li>
        <li className={styles.sidebarItem}>
          <span className={styles.iconContainer}>
            <img src={FolderIcon} alt="Folder Icon" className={styles.folderIcon} />
            <img src={FolderIcon2} alt="Folder Icon 2" className={styles.folderIcon2} />
          </span>
          <span className={styles.itemName}>Partenariat et mobillté</span>
        </li>
        <li className={styles.sidebarItem}>
          <span className={styles.iconContainer}>
            <img src={FolderIcon} alt="Folder Icon" className={styles.folderIcon} />
            <img src={FolderIcon2} alt="Folder Icon 2" className={styles.folderIcon2} />
          </span>
          <span className={styles.itemName}>Échange de connaissances et <br /> mutualisation des ressources</span>
        </li>
      </ul>

      {/* Logout Button */}
      <div className={styles.logoutContainer}>
        <button className={styles.logoutButton} onClick={handleLogout}>
          <span className={styles.icon}><img src={ExitIcon} alt="Exit Icon" className={styles.exitIcon} /></span>
          <span className={styles.logoutText}>Logout</span>
        </button>
      </div>
    </div>
  );
}