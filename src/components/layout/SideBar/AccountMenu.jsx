import { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './SideBar.module.css';

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
      
      className={styles.contextMenu}
      style={{
        top: `${menuPosition.top}px`,
        left: `${menuPosition.left}px`,
        transform: 'translateY(-100%)', 
      }}
    >
      <ul>
        <li>
          <button
            className={styles.menuItem} 
            onClick={() => {
              onSettingsClick();
              onClose(); 
            }}
          >
            Settings
          </button>
        </li>
        <li>
          <button
            className={styles.menuItem}
            onClick={() => {
              onLogoutClick();  // FUNCTION I GET AS A PROPS IT WILL HANDLE TEH LOG OUT 
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
// props validation
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
