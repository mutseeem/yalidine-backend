import { NavLink } from 'react-router-dom';
import styles from './SideBar.module.css';
import { useState } from 'react';
import {
  FolderIcon, FolderFocusIcon,
  HomeIcon, HomeFocusIcon,
  EyeIcon, EyeFocusIcon,
  MenuIcon, MenuIconFocus,
  MenuDots, AppLogo
} from '../../../assets/icons/icons';
import Profile from '../../../assets/images/profile.png';

/**
 * 
 * @param {*} param0 
 * @returns 
 */

export default function Sidebar({ isExpanded, setIsExpanded }) {
  const toggleSidebar = () => setIsExpanded(!isExpanded);

  return (
    <div className={`${styles.sidebar} ${isExpanded ? styles.expanded : ''}`}>
      {/* Header */}
      <div className={styles.header}>
        <img src={AppLogo} alt="App Logo" className={styles.appLogo} />
        <span className={styles.brandName}>RNAQES</span>
      </div>

      {/* Navigation Links */}
      <ul className={styles.sidebarItems}>
        {/* Menu Toggle */}
        <li className={styles.sidebarItem}>
          <div className={`${styles.sidebarLink} ${styles.noHover}`} onClick={toggleSidebar}>
            <div className={styles.iconContainer}>
              <img
                src={isExpanded ? MenuIconFocus : MenuIcon}
                alt="Menu"
                className={styles.sidebarIcon}
              />
            </div>
            <span className={styles.itemName}>Menu</span>
          </div>
        </li>
        
        {/*TODO: ge the data from database + control system*/}
        {/* Dynamic Sidebar Links */}
        {[
          { path: '/', name: 'Home', icons: [HomeIcon, HomeFocusIcon] },
          { path: '/overview', name: 'Overview', icons: [EyeIcon, EyeFocusIcon] },
          { path: '/politique', name: 'Politique D\'ouverture', icons: [FolderIcon, FolderFocusIcon] },
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
                <span className={styles.itemName} title={name}>{name}</span>
              </NavLink>
            </li>

            {/* Add Separator After "Home" */}
            {index === 0 && <li className={styles.separator}></li>}
          </>
        ))}
      </ul>

      {/* Footer Section */}
      <div className={styles.separator}></div>

      <div className={styles.footer}>
        {/*dev o5r fih img + email image  ==> col gap ,, div binathom m3a icon*/}
        <div className={styles.accountSection} onClick={() => alert('Logout successful!')}>
          <img src={Profile} alt="User Profile" className={styles.profilePicture} />
          {isExpanded && (
            <div className={styles.userDetails}>
              <span className={styles.itemUserName}>Ilyes Izmr</span>
              <span className={styles.itemEmail}>i.izemmouren@gmail.com</span>
            </div>
          )}
          <div className={styles.logoutButton} >
            <img src={MenuDots} alt="Logout" className={styles.logoutIcon} />
          </div>
        </div>
      </div>
    </div>
  );
}