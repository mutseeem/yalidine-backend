import { motion } from 'framer-motion';
import { AppLogo } from '../../../assets/icons/icons';
import styles from './Navbar.module.css';
import PropTypes from 'prop-types';
import Logger from '../../../util/Logger';

//TODO: change the logo .

/**
 * Navbar component for the landing page that includes:
 * - Logo area
 * - Navigation links
 * - Right-side buttons (Log in and Sign up)
 * 
 * @component
 * @example
 * return <Navbar />
 * 
 * @returns {JSX.Element} The rendered Navbar component.
 * 
 * @see {@link https://www.framer.com/motion/|Framer Motion} for animation details.
 * 
 * @author Izemmouren Ilyes
 */
const Navbar = () => {
  const navItems = ['Home', 'About', 'Domains', 'Devs', 'Contact', 'FAQ'];

  /**
   * Logo subcomponent that displays the logo and text with animation.
   * 
   * @component
   * @returns {JSX.Element} The rendered Logo component.
   * @example
   * return <Logo />
  */
  const Logo = () => (
    <div className={styles.logo}>
      {/* Logo Animation */}
      <motion.img
        style={{ rotate: '45deg' }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 600, damping: 20, delay: 0.05 }}
        src={AppLogo}
        alt="DIGIQA Logo"
        className={styles.logoImg}
      />

      {/* Logo Text Animation */}
      <motion.span
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.1, delay: 0.1 }}
        className={styles.logoText}
      >
        DIGIQA
      </motion.span>
    </div>
  );

  /**
   * NavItem component renders a navigation link with smooth scroll behavior.
   *
   * @param {Object} props
   * @param {string} props.item - The name of the navigation item.
   * @param {function} props.onClick - Callback function triggered on click with the item id.
   * 
   * @returns {JSX.Element} The rendered navigation link component.
   *
   * @example
   * return <NavItem item="Home" onClick={handleScroll} />
 */
  const NavItem = ({ item, onClick }) => (
    <a
      href={`#${item.toLowerCase()}`}
      onClick={(e) => {
        e.preventDefault();
        onClick(item.toLowerCase());
      }}
      className={styles.navLink}
    >
      {item}
    </a>
  );
  NavItem.propTypes = {
    item: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  };
  
  /**
   * function to scroll into a specific element by ID.
   * 
   * @function handleScroll
   * @param {String} id - the id of the element 
   */
  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (!element){
      Logger.error('Navbar', 'handleScroll', `Element with ID ${id} not found.`);
      return;
     
    }
    
    element.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'center',
    });
  };

  //FIXME: fix the signup button to fuction correctly
  const handleSignUpClick = () => {
    alert('Sign Up button clicked! Redirect functionality will be implemented later.');
  };

  //FIXME: fix the login button to function correctly
  const handleLoginClick = () => {
    alert('Log In button clicked! Redirect functionality will be implemented later.');
  };

  
  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
      className={styles.navbar}
    >
      {/* Logo Section */}
      <Logo />

      {/* Navigation Links */}
      <nav className={styles.navLinks}>
        {navItems.map((item) => (
          <NavItem key={item} item={item} onClick={handleScroll} />
        ))}
      </nav>

      {/* Right Side Buttons */}
      <div className={styles.navRight}>
        <button className={styles.loginButton} onClick={handleLoginClick}>
          Log in
        </button>
        <button className={styles.signUp} onClick={handleSignUpClick}>
          Sign up
        </button>
      </div>
    </motion.header>
  );

};

export default Navbar;

