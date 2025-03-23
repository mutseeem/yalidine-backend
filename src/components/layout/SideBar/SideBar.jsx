import { Link } from 'react-router-dom'; 
import styles from './SideBar.module.css';

// Import Icons from the icons.js in the assests/icons/icon.js folder 
import { 
  FolderIcon , FolderFocusIcon, 
  HomeIcon , HomeFocusIcon, 
  SettingsIcon , SettingsFocusIcon, 
  EyeIcon , EyeFocusIcon,
  ExitIcon
}from '../../../assets/icons/icons';

import Profile from '../../../assets/images/profile.png';

import { useState } from 'react'; 

export default function Sidebar() {
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false); // State to manage account menu visibility 


  const handleAccountClick = () => {
    setIsAccountMenuOpen(!isAccountMenuOpen); // Toggle account menu state 
  };

  
  //TODO: Implement actual logout logic later 
  const handleLogout = () => {
    console.log('User logged out');  
    alert('Logout successful!');    
  };

  //TODO: Profile Picture URL
  const profilePictureUrl = Profile ;

  return (
    <div className={styles.sidebar}>
      {/* Profile Picture */}
      <div className={styles.accountIcon} /*onClick={handleAccountClick}*/>
        <img
          src={profilePictureUrl}
          //TODO: by defualt show no profile pictureIcon 
          alt="👤"
          className={styles.profilePicture}
          onError={(e) => {
            e.target.style.display = 'none'; // Hide the image if it fails to load
          }}
        />

        {/*TODO: get the name using an API*/}
        <span className={styles.itemName}>Ilyes Izmr</span>
        {/*TODO: WHAT IS THIS ??? */}
        <span className={styles.fallbackIcon}></span> {/* Fallback icon */}

        {/*FIXME: HOME : change it into a dev <clickable icon> instead of a button*/}
        <div className={styles.accountButtons}>
          <button className={styles.accountButton} onClick={() => console.log('Home clicked')}>
            Home
          </button>

          {/*FIXME: Settings : change it into a dev <clickable icon> instead of a button*/}
          <button className={styles.accountButton} onClick={() => console.log('Settings clicked')}>
            Settings
          </button>
        </div>

        {/*TODO: this should be a comment*/}
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
            <img src={EyeFocusIcon} alt="Eye Icon 2" className={styles.eyeIcon2} />
          </span>
          <span className={styles.itemName}>Overview</span>
        </Link>
      </li>

      <ul className={styles.sidebarItems}>
        <li className={styles.sidebarItem}>
          <span className={styles.iconContainer}>
            <img src={FolderIcon} alt="Folder Icon" className={styles.folderIcon} />
            <img src={FolderFocusIcon} alt="Folder Icon 2" className={styles.folderIcon2} />
          </span>

          <span className={styles.itemName}>Politique D’ouverture internationale</span>
        </li>
        <li className={styles.sidebarItem}>
          <span className={styles.iconContainer}>
            <img src={FolderIcon} alt="Folder Icon" className={styles.folderIcon} />
            <img src={FolderFocusIcon} alt="Folder Icon 2" className={styles.folderIcon2} />
          </span>
          <span className={styles.itemName}>Partenariat et mobillté</span>
        </li>
        <li className={styles.sidebarItem}>
          <span className={styles.iconContainer}>
            <img src={FolderIcon} alt="Folder Icon" className={styles.folderIcon} />
            <img src={FolderFocusIcon} alt="Folder Icon 2" className={styles.folderIcon2} />
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