import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import styles from './SideBar.module.css';
import {
  FolderIcon, FolderFocusIcon,
  HomeIcon, HomeFocusIcon,
  EyeIcon, EyeFocusIcon,
  MenuIcon, MenuIconFocus,
  MenuDots, AppLogo , ArrowIcon
} from '../../../assets/icons/icons';
import Profile from '../../../assets/images/profile.png';

/**
 * Sidebar Component, 
 * @param {boolean} isExpanded - Whether the sidebar is expanded or not .
 * @param {function} setIsExpanded - Function to toggle the sidebar state.
 */
export default function Sidebar({ isExpanded, setIsExpanded }) {

  const [hoveredItem, setHoveredItem] = useState(null);
  const [hoverPosition, setHoverPosition] = useState({ top: 0, left: 0 });
  
  // FIXME: Sidebar links should be fetched dynamically from an API instead of being hardcoded.
  const sidebarLinks = [
    { path: '/', name: 'Home', icons: [HomeIcon, HomeFocusIcon] },
    { path: '/overview', name: 'Overview', icons: [EyeIcon, EyeFocusIcon] },
    { path: '/politique', name: "Politique D'ouverture", icons: [FolderIcon, FolderFocusIcon] },
    { path: '/partenariat', name: 'Partenariat et mobilité', icons: [FolderIcon, FolderFocusIcon] },
    { path: '/connaissances', name: 'Échange de connaissances', icons: [FolderIcon, FolderFocusIcon] },
  ];

  const handleItemTooltip = (event , itemName) => {
    if(!isExpanded){
      const rect = event.currentTarget.getBoundingClientRect();
      setHoverPosition({
        top: rect.top + window.scrollY,
        left: rect.right + window.scrollX + 10 // 10px margin from icon
      });
      setHoveredItem(itemName);
    }
  }

  const handleItemLeave = () => {
    setHoveredItem(null);
  }

  return (
    <div>
      {/* oOo==========oOo Tooltip oOo==========oOo */}
      {!isExpanded && hoveredItem && (
        <div 
          className={styles.hoverTooltip}
          style={{
            top: `${hoverPosition.top}px`,
            left: `${hoverPosition.left}px`
          }}
        >
          {hoveredItem}
        </div>
      )}

      {/* oOo==========oOo Toggle Sidebar Button oOo==========oOo */}
      <div className={`${styles.toggleButtonContainer} ${isExpanded ? styles.expanded : ''}`}>
        <button 
          className={styles.toggleButton}
          onClick={() => setIsExpanded(prev => !prev)}
          aria-label="Toggle sidebar"
        >
          <img src={ArrowIcon} alt="Toggle Sidebar" className={styles.toggleIcon} />
        </button>
      </div>

      {/* oOo==========oOo Sidebar Container oOo==========oOo */}
      <div className={`${styles.sidebar} ${isExpanded ? styles.expanded : ''}`}>
        
        {/* o===o Header o===o */}
        <div className={styles.header}>
          {/*TODO: Do we need to call this from the Database ?*/}
          <img src={AppLogo} alt="App Logo" className={styles.appLogo} /> 
          {/*TODO: Should The brand name be a variable fetched from API ? */}
          <span className={styles.brandName}>RNAQES</span>
        </div>

        <div className={styles.separator}></div> 

        {/* o===o Sidebar Navigation o===o */}
        <ul className={styles.sidebarItems}>
          {/* Menu Toggle */}
          <li className={styles.sidebarItem}>
            <div className={`${styles.sidebarLink} ${styles.noHover}`} 
              onClick={() => setIsExpanded(prev => !prev)}
              onMouseEnter={(e) => handleItemTooltip(e, 'Menu')}
              onMouseLeave={handleItemLeave}
            >
              <div className={styles.iconContainer}>
                <img src={isExpanded ? MenuIconFocus : MenuIcon} alt="Menu" className={styles.sidebarIcon} />
              </div>
              <span className={styles.itemName}>Menu</span>
            </div>
          </li>

          {/* Sidebar Links */}
          {sidebarLinks.map(({ path, name, icons }, index) => (
            <div key={path}>
              <li 
                className={styles.sidebarItem}
                onMouseEnter={(e) => handleItemTooltip(e, name)}
                onMouseLeave={handleItemLeave}
              >
                <NavLink
                  to={path}
                  className={({ isActive }) => `${styles.sidebarLink} ${isActive ? styles.active : ''}`}
                >
                  <span className={styles.iconContainer}>
                    <img src={icons[0]} alt={name} className={styles.sidebarIcon} />
                    <img src={icons[1]} alt={`${name} Active`} className={styles.sidebarIconFocus} />
                  </span>
                  <span className={styles.itemName}>{name}</span>
                </NavLink>
              </li>
              {index === 0 && <li className={styles.separator}></li>}
            </div>
          ))}
        </ul>

        <div className={styles.separator}></div>

        {/* o===o Footer o===o */}
        <div className={styles.footer}>
          <div className={styles.accountSection} onClick={() => alert('Logout successful!')}>
            {/* FIXME: Profile image should be dynamically fetched from API */}
            <img src={Profile} alt="User Profile" className={styles.profilePicture} />
            {isExpanded && (
              <div className={styles.userDetails}>
                {/* FIXME: User name and email should come from API */}
                <span className={styles.itemUserName}>Ilyes Izmr</span>
                <span className={styles.itemEmail}>i.izemmouren@gmail.com</span>
              </div>
            )}
            <div className={styles.logoutButton}>
              {/* FIXME: Logout icon should be configurable from API or theme settings */}
              <img src={MenuDots} alt="Logout" className={styles.logoutIcon} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
