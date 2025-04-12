import { motion } from 'framer-motion';
import { AppLogo } from '../../../assets/icons/icons';
import styles from './Navbar.module.css';

//TODO: refactor this area 
//FIXME: fix teh login and sign up button to fuction correctly
//TODO: change the logo and the brand name after this 
//FIXME: we need to add props validation 

const Navbar = () => {
  const navItems = ['Home', 'About', 'Domains', 'Devs', 'Contact', 'FAQ'];

  // Logo Component // 
  const Logo = () => (
    <div className={styles.logo}>
      <motion.img
        style={{ rotate: '45deg' }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 600, damping: 20, delay: 0.05 }}
        src={AppLogo}
        alt="Assurix Logo"
        className={styles.logoImg}
      />
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

  // NavItem Component // 
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

  // Smooth scrolling function // 
  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Alert for Sign Up button // 
  const handleSignUpClick = () => {
    alert('Sign Up button clicked! Redirect functionality will be implemented later.');
  };

  // Alert for Log In button // 
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