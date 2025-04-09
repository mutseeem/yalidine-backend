import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./NavBar.module.css";
import { AppLogo, MenuBurger } from "../../../assets/icons/icons.js";

/**
 * Main application navigation bar component.
 * 
 * Displays the application branding, current page title, and navigation controls.
 * Dynamically adjusts based on sidebar state and current route.
 *
 * @component
 * @param {boolean} isExpanded - Determines if the sidebar is expanded (true) or collapsed (false)
 * @returns {JSX.Element} The rendered navigation bar component
 *
 * @example
 * // Basic usage
 * <Navbar isExpanded={sidebarExpanded} />
 *
 * @author Izemmouren Ilyes
 * @version 1.0.0
 * @since 2025-04-02
 * @lastModified 2025-04-02
 *
 * @see {@link https://reactrouter.com/} for routing functionality
 * @see SideBar.jsx - for the related sidebar component
 * @see NavBar.module.css - for styles
 */
export default function Navbar({ isExpanded }) {
  const location = useLocation();

  /**
   * @function getPageTitle - Generates a formatted title based on the current route.
   * 
   * @returns {string} - The formatted title based on the current route
   * @throws  {String} - "Home" if no path segments exist
   * 
   * @see {@link https://reactrouter.com/}
   * 
   * @example
   * // Example route: /dashboard/settings
   * // Returns: "Settings"
   * 
   * @version 1.0.0
   * @since 2025-04-02
   * @lastModified 2025-04-02
   * 
   * // TODO: Replace with a proper route-title mapping system 
   * // TODO: Consider using a localization library for multilingual support 
   */
  const getPageTitle = () => {
    const pathSegments = location.pathname.split("/").filter(Boolean);
    
    // 1 - Default to 'Home' if no path segments exist
    if (pathSegments.length === 0) return "Home";
    
    // 2 - Format the last segment as title
    const lastSegment = pathSegments[pathSegments.length - 1];
    return lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1);
  };

  /**
   * @function handleMenuClick - Handles the click event for the menu button.
   * 
   * @returns {void}
   * 
   * @since 2025-04-02
   * @lastModified 2025-04-02
   * 
   * // FIXME: Currently the menu icon is just decorative - needs click handler
   * // TODO: Implement mobile menu toggle functionality
   */
  const handleMenuClick = () => {
    console.log("Menu clicked - implement toggle functionality");
  };

  // ====== CSS COMPLEX CLASS NAMES ====== //   
  //const navbarClass  = `${styles.navbar} ${!isExpanded ? styles.expanded : ""}`;

  return (
    <nav 
      className={`${styles.navbar} ${!isExpanded ? styles.expanded : ""}`} 
      aria-label="Main navigation"
    >
      {/* Left Section  */}
      <div className={styles.leftSection} aria-label="Brand information">

        {/* Application Logo */}
        <div className={styles.logoContainer}>
          <img src={AppLogo} alt="Application logo" className={styles.logo} role="img"/>
        </div>

        {/* Page Title */}
        {/*TODO: make it go dynamically*/ }
        <h1 className={styles.title} aria-label="Curret page">
          Domain D7 | Coopération Internationale
        </h1>
        
      </div>

      {/* Visual separator */}
      <div className={styles.separator} 
        aria-hidden="true" 
        role="separator"
      />

      {/* Dynamic Page Title Section */}
      <div className={styles.centerSection} aria-label="Current page">
        <h1 className={styles.pageTitle}>
          {getPageTitle()}
        </h1>
      </div>

      {/* Navigation Controls */}
      <div 
        className={styles.rightSection} 
        aria-label="Navigation controls"
      >
        <img onClick={handleMenuClick}
          src={MenuBurger} 
          alt="☰" 
          className={styles.menuIcon}
          aria-hidden="true"
        />
      </div>

    </nav>
  );
}

// Prop type validation
Navbar.propTypes = {
  isExpanded: PropTypes.bool.isRequired,
};

// TODO: Consider adding default props if needed
Navbar.defaultProps = {
};

// impovmenet list : 
// TODO 1. Implement proper route-title mapping system
// TODO 2. Add mobile-responsive behavior
// TODO 3. Add keyboard navigation support
// TODO 4. Implement proper menu dropdown functionality
// TODO 5. Add theme switching support
// TODO 6. Add user profile section
// TODO 7. Implement breadcrumb navigation
// TODO 8. Add notification indicatorn