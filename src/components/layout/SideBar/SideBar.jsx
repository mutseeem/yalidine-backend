import { NavLink } from 'react-router-dom';
import styles from './SideBar.module.css';
import {
  FolderIcon, FolderFocusIcon,
  HomeIcon, HomeFocusIcon,
  EyeIcon, EyeFocusIcon,
  MenuIcon, MenuIconFocus,
  MenuDots, AppLogo
} from '../../../assets/icons/icons';
import Profile from '../../../assets/images/profile.png';

/**
 * Sidebar Component
 * 
 * @param {Object} props
 * @param {boolean} props.isExpanded - Whether the sidebar is expanded or collapsed.
 * @param {function} props.setIsExpanded - Function to toggle the sidebar state.
 * @returns {JSX.Element} - The rendered Sidebar component.
 */
export default function Sidebar({ isExpanded, setIsExpanded }) {
  // Toggle sidebar expanded/collapsed state
  const toggleSidebar = () => setIsExpanded(!isExpanded);

  return (
    <div className={`${styles.sidebar} ${isExpanded ? styles.expanded : ''}`}>
      {/* Header */}
      <div className={styles.header}>
        {/* TODO: Replace static logo with dynamic data from API */}
        <img src={AppLogo} alt="App Logo" className={styles.appLogo} />
        {/* FIXME: Brand name should be fetched from API */}
        <span className={styles.brandName}>RNAQES</span>
      </div>

      {/* Navigation Links */}
      <ul className={styles.sidebarItems}>
        {/* Menu Toggle Button */}
        <li className={styles.sidebarItem}>
          <div className={`${styles.sidebarLink} ${styles.noHover}`} onClick={toggleSidebar}>
            <div className={styles.iconContainer}>
              <img
                src={isExpanded ? MenuIconFocus : MenuIcon}
                alt="Menu"
                className={styles.sidebarIcon}
              />
            </div>
            {/* FIXME: "Menu" text should be localized or fetched from API */}
            <span className={styles.itemName}>Menu</span>
          </div>
        </li>

        {/* Dynamic Sidebar Links */}
        {/* TODO: Fetch navigation items from API instead of using static data */}
        {[
          { path: '/', name: 'Home', icons: [HomeIcon, HomeFocusIcon] },
          { path: '/overview', name: 'Overview', icons: [EyeIcon, EyeFocusIcon] },
          { path: '/politique', name: "Politique D'ouverture", icons: [FolderIcon, FolderFocusIcon] },
          { path: '/partenariat', name: 'Partenariat et mobilité', icons: [FolderIcon, FolderFocusIcon] },
          { path: '/connaissances', name: 'Échange de connaissances', icons: [FolderIcon, FolderFocusIcon] },
        ].map(({ path, name, icons }, index) => (
          <>
            <li className={styles.sidebarItem} key={path}>
              <NavLink
                to={path}
                className={({ isActive }) => `${styles.sidebarLink} ${isActive ? styles.active : ''}`}
              >
                <span className={styles.iconContainer}>
                  <img src={icons[0]} alt={name} className={styles.sidebarIcon} />
                  <img src={icons[1]} alt={`${name} Active`} className={styles.sidebarIconFocus} />
                </span>
                {/* FIXME: Tooltip content should match the API-provided names */}
                <span className={styles.itemName}>{name}</span>
              </NavLink>
            </li>

            {/* Separator After "Home" */}
            {index === 0 && <li className={styles.separator}></li>}
          </>
        ))}
      </ul>

      {/* Footer Section */}
      <div className={styles.separator}></div>

      <div className={styles.footer}>
        {/* Account Section */}
        <div className={styles.accountSection} onClick={() => alert('Logout successful!')}>
          {/* TODO: Replace static profile image with dynamic data from API */}
          <img src={Profile} alt="User Profile" className={styles.profilePicture} />
          {isExpanded && (
            <div className={styles.userDetails}>
              {/* FIXME: User name and email should be fetched from API */}
              <span className={styles.itemUserName}>Ilyes Izmr</span>
              <span className={styles.itemEmail}>i.izemmouren@gmail.com</span>
            </div>
          )}
          <div className={styles.logoutButton}>
            {/* FIXME: Logout icon should be customizable via API or theming */}
            <img src={MenuDots} alt="Logout" className={styles.logoutIcon} />
          </div>
        </div>
      </div>
    </div>
  );
}