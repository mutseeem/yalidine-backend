import { motion } from 'framer-motion';
import { AppLogo } from '../../../assets/icons/icons';
import styles from './Navbar.module.css';

const Navbar = () => {
  const navItems = ['Home', 'About', 'Domains', 'Devs', 'Contact', 'FAQ'];

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ 
        duration: 0.15,
        ease: "easeOut"
      }}
      className={styles.navbar}
    >
      <div className={styles.logo}>
        <motion.img
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 600,
            damping: 20,
            delay: 0.05
          }}
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
          JOGO
        </motion.span>
      </div>
      <nav className={styles.navLinks}>
        {navItems.map((item, index) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className={styles.navLink}
          >
            {item}
          </a>
        ))}
      </nav>
      <div className={styles.navRight}>
        <button className={styles.loginButton}>
          Log in
        </button>
        <button className={styles.signUp}>
          Sign up
        </button>
      </div>
    </motion.header>
  );
};

export default Navbar;