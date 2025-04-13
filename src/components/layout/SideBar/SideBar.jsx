import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './SideBar.module.css';

//FIXME: split this component into smaller components later 

import {
  FolderIcon, FolderFocusIcon,
  HomeIcon, HomeFocusIcon,
  EyeIcon, EyeFocusIcon,
  MenuIcon, MenuIconFocus,
  MenuDots, AppLogo, ArrowIcon
} from '../../../assets/icons/icons';
import Profile from '../../../assets/images/profile.png';
import AccountMenu from './AccountMenu.jsx'; // Import the new component

export default function Sidebar({ isExpanded, setIsExpanded }) {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [hoverPosition, setHoverPosition] = useState({ top: 0, left: 0 });
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });

  //TODO: get them from teh api
  const sidebarLinks = [
    { 
      path: '/', 
      name: 'Home', 
      icons: [HomeIcon, HomeFocusIcon] 
    },
    { 
      path: '/chapters/overview', 
      name: 'Overview', 
      icons: [EyeIcon, EyeFocusIcon] 
    },
    { 
      path: '/chapters/politique-ouverture', 
      chapterId: "1", // Actual ID from your backend
      name: "Politique D'ouverture", 
      icons: [FolderIcon, FolderFocusIcon] 
    },
    { 
      path: '/chapters/partenariat-mobilite', 
      chapterId: "2",
      name: 'Partenariat et mobilité', 
      icons: [FolderIcon, FolderFocusIcon] 
    },
    { 
      path: '/chapters/echange-connaissances', 
      chapterId: "3",
      name: 'Échange de connaissances', 
      icons: [FolderIcon, FolderFocusIcon] 
    },
  ];

  const handleItemTooltip = (event, itemName) => {
    if (!isExpanded) {
      const rect = event.currentTarget.getBoundingClientRect();
      setHoverPosition({
        top: rect.top + window.scrollY,
        left: rect.right + window.scrollX + 10
      });
      setHoveredItem(itemName);
    }
  };

  const handleItemLeave = () => {
    setHoveredItem(null);
  };

  const handleAccountClick = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setMenuPosition({
      top: rect.top + window.scrollY,
      left: isExpanded ? rect.left + window.scrollX : rect.right + window.scrollX + 10
    });
    setShowAccountMenu(true);
  };

  return (
    <div>
      {/* Tooltip */}
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

      {/* Account Context Menu */}
      {showAccountMenu && (
        <AccountMenu
          menuPosition={menuPosition}
          onClose={() => setShowAccountMenu(false)}
        />
      )}

      {/* Toggle Button */}
      <div className={`${styles.toggleButtonContainer} ${isExpanded ? styles.expanded : ''}`}>
        <button 
          className={styles.toggleButton}
          onClick={() => setIsExpanded(prev => !prev)}
          aria-label="Toggle sidebar"
        >
          <img src={ArrowIcon} alt="Toggle Sidebar" className={styles.toggleIcon} />
        </button>
      </div>

      {/* Sidebar Container */}
      <div className={`${styles.sidebar} ${isExpanded ? styles.expanded : ''}`}>
        
        {/* Header */}
        <div className={styles.header}>
          <img src={AppLogo} alt="App Logo" className={styles.appLogo} /> 
          <span className={styles.brandName}>RNAQES</span>
        </div>

        <div className={styles.separator}></div> 

        {/* Navigation */}
        <ul className={styles.sidebarItems}>
          {/* Menu Toggle */}
          <li className={styles.sidebarItem}>
            <div 
              className={`${styles.sidebarLink} ${styles.noHover}`} 
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

        {/* Footer */}
        <div className={styles.footer}>
          <div 
            className={styles.accountSection} 
            onClick={handleAccountClick}
          >
            <img src={Profile} alt="User Profile" className={styles.profilePicture} />
            {isExpanded && (
              <div className={styles.userDetails}>
                <span className={styles.itemUserName}>Ilyes Izmr</span>
                <span className={styles.itemEmail}>i.izemmouren@gmail.com</span>
              </div>
            )}
            <div className={styles.logoutButton}>
              <img src={MenuDots} alt="Account Menu" className={styles.logoutIcon} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Sidebar.propTypes = {
  isExpanded: PropTypes.bool.isRequired,
  setIsExpanded: PropTypes.func.isRequired,
};