import { NavLink } from 'react-router-dom';
import styles from './SideBar.module.css';
import { useState } from 'react';
import { 
  FolderIcon, FolderFocusIcon,
  HomeIcon, HomeFocusIcon,
  EyeIcon, EyeFocusIcon,
  MenuIcon, MenuIconFocus,
  ExitIcon, AppLogo
} from '../../../assets/icons/icons';
import Profile from '../../../assets/images/profile.png';

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMenuActive, setIsMenuActive] = useState(false); // Active state for Menu button
  const [isLogoutActive, setIsLogoutActive] = useState(false); // Active state for Logout button

  const toggleSidebar = () => setIsExpanded(!isExpanded);

  const handleLogout = () => {
    setIsLogoutActive(true); // Highlight logout button
    alert('Logout successful!');
  };

  return (
    <div className={`${styles.sidebar} ${isExpanded ? styles.expanded : ''}`}>
      {/* Header with Menu Button */}
      <div className={styles.header}>
        <img src={AppLogo} alt="App Logo" className={styles.appLogo} />
        <span className={styles.brandName}>RNAQES</span>
      </div>

      {/* Navigation Items */}
      <ul className={styles.sidebarItems}>
        {/* Menu Button */}
        <li className={styles.sidebarItem}>
          <div
            className={`${styles.sidebarLink} ${isMenuActive ? styles.active : ''}`}
            onClick={() => {
              setIsMenuActive(true); // Highlight menu button
              toggleSidebar();
            }}
          >
            <div className={styles.iconContainer}>
              <img src={MenuIcon} alt="Menu" className={styles.sidebarIcon} />
              <img src={MenuIconFocus} alt="Menu Focus" className={styles.sidebarIconFocus} />
            </div>
            <span className={styles.itemName}>Menu</span>
          </div>
        </li>

        {/* Home Link */}
        <li className={styles.sidebarItem}>
          <NavLink
            to="/"
            exact
            className={({ isActive }) =>
              `${styles.sidebarLink} ${isActive ? styles.active : ''}`
            }
          >
            <span className={styles.iconContainer}>
              <img src={HomeIcon} alt="Home" className={styles.sidebarIcon} />
              <img src={HomeFocusIcon} alt="Home Active" className={styles.sidebarIconFocus} />
            </span>
            <span className={styles.itemName}>Home</span>
          </NavLink>
        </li>

        {/* Separator */}
        <div className={styles.separator}></div>

        {/* Overview Link */}
        <li className={styles.sidebarItem}>
          <NavLink
            to="/overview"
            className={({ isActive }) =>
              `${styles.sidebarLink} ${isActive ? styles.active : ''}`
            }
          >
            <span className={styles.iconContainer}>
              <img src={EyeIcon} alt="Overview" className={styles.sidebarIcon} />
              <img src={EyeFocusIcon} alt="Overview Active" className={styles.sidebarIconFocus} />
            </span>
            <span className={styles.itemName}>Overview</span>
          </NavLink>
        </li>

        {/* Politique Link */}
        <li className={styles.sidebarItem}>
          <NavLink
            to="/politique"
            className={({ isActive }) =>
              `${styles.sidebarLink} ${isActive ? styles.active : ''}`
            }
          >
            <span className={styles.iconContainer}>
              <img src={FolderIcon} alt="Politique" className={styles.sidebarIcon} />
              <img src={FolderFocusIcon} alt="Politique Active" className={styles.sidebarIconFocus} />
            </span>
            <span className={styles.itemName}>Politique D'ouverture</span>
          </NavLink>
        </li>

        {/* Partenariat Link */}
        <li className={styles.sidebarItem}>
          <NavLink
            to="/partenariat"
            className={({ isActive }) =>
              `${styles.sidebarLink} ${isActive ? styles.active : ''}`
            }
          >
            <span className={styles.iconContainer}>
              <img src={FolderIcon} alt="Partenariat" className={styles.sidebarIcon} />
              <img src={FolderFocusIcon} alt="Partenariat Active" className={styles.sidebarIconFocus} />
            </span>
            <span className={styles.itemName}>Partenariat et mobilité</span>
          </NavLink>
        </li>

        {/* Connaissances Link */}
        <li className={styles.sidebarItem}>
          <NavLink
            to="/connaissances"
            className={({ isActive }) =>
              `${styles.sidebarLink} ${isActive ? styles.active : ''}`
            }
          >
            <span className={styles.iconContainer}>
              <img src={FolderIcon} alt="Connaissances" className={styles.sidebarIcon} />
              <img src={FolderFocusIcon} alt="Connaissances Active" className={styles.sidebarIconFocus} />
            </span>
            <span className={styles.itemName}>Échange de connaissances</span>
          </NavLink>
        </li>
      </ul>

      {/* Footer Section */}
      <div className={styles.separator}></div>
      <div className={styles.footer}>
        {/* Account Section */}
        <div className={styles.accountSection}>
          <img src={Profile} alt="Profile" className={styles.profilePicture} />
          <span className={styles.itemName}>Ilyes Izmr</span>
        </div>

        {/* Logout Button */}
        <button
          className={`${styles.logoutButton} ${isLogoutActive ? styles.active : ''}`}
          onClick={handleLogout}
        >
          <span className={styles.iconContainer}>
            <img src={ExitIcon} alt="Logout" className={styles.sidebarIcon} />
          </span>
          <span className={styles.logoutText}>Logout</span>
        </button>
      </div>
    </div>
  );
}