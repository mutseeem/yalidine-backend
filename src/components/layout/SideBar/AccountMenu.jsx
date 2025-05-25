import { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
// Assume styles are imported from AccountMenu.module.css
// The user specified 'SideBar.module.css', but typically menu-specific styles
// would be in a dedicated file like AccountMenu.module.css for better organization.
// I'll keep the import as SideBar.module.css per your input, but advise
// ensuring styles are correctly targeting .contextMenu and .menuItem classes.
import styles from './SideBar.module.css'; // Using SideBar.module.css as specified

export default function AccountMenu({
  menuPosition,
  onClose,
  onSettingsClick,
  onLogoutClick,
  onContactClick,
  onQAClick
}) {
  const menuRef = useRef(null);

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={menuRef}
      // Assuming 'contextMenu' class is defined in SideBar.module.css or a new file
      className={styles.contextMenu}
      style={{
        top: `${menuPosition.top}px`,
        left: `${menuPosition.left}px`,
        transform: 'translateY(-100%)', // This lifts the menu above the click point
      }}
    >
      <ul>
        <li>
          <button
            className={styles.menuItem} // Assuming 'menuItem' class is defined
            onClick={() => {
              onSettingsClick();
              onClose(); // Close menu after action
            }}
          >
            Settings
          </button>
        </li>
        <li>
          <button
            className={styles.menuItem}
            onClick={() => {
              // Call the logout function passed from Sidebar.
              // This function already handles navigation and state clearing.
              onLogoutClick();
              // No need to call onClose() here, as navigation will unmount this component.
            }}
          >
            Log Out
          </button>
        </li>
        <li>
          <button
            className={styles.menuItem}
            onClick={() => {
              onContactClick();
              onClose(); // Close menu after action
            }}
          >
            Contact Us
          </button>
        </li>
        <li>
          <button
            className={styles.menuItem}
            onClick={() => {
              onQAClick();
              onClose(); // Close menu after action
            }}
          >
            Q&A
          </button>
        </li>
      </ul>
    </div>
  );
}

// PropTypes for type-checking props
AccountMenu.propTypes = {
  menuPosition: PropTypes.shape({
    top: PropTypes.number,
    left: PropTypes.number,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  onSettingsClick: PropTypes.func,
  onLogoutClick: PropTypes.func, // The logout function prop
  onContactClick: PropTypes.func,
  onQAClick: PropTypes.func,
};

// Default props provide fallback functions if a prop is not explicitly passed.
// This prevents errors if a component doesn't pass a specific click handler.
AccountMenu.defaultProps = {
  onSettingsClick: () => console.log('Settings clicked (default)'),
  onLogoutClick: () => console.log('Logout clicked (default)'), // Keep console log as default
  onContactClick: () => console.log('Contact Us clicked (default)'),
  onQAClick: () => console.log('Q&A clicked (default)'),
};