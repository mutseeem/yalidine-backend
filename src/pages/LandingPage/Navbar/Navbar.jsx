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
        duration: 0.25,
        ease: [0.16, 0.77, 0.47, 0.97]
      }}
      className={styles.navbar}
    >
      <div className={styles.logo}>
        <motion.img
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 20,
            delay: 0.1
          }}
          src={AppLogo}
          alt="Assurix Logo"
          className={styles.logoImg}
        />
        <motion.span
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2, delay: 0.2 }}
          className={styles.logoText}
        >
          Assurix
        </motion.span>
      </div>
      <nav className={styles.navLinks}>
        {navItems.map((item, index) => (
          <motion.a
            key={item}
            href={`#${item.toLowerCase()}`}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.2,
              delay: 0.3 + index * 0.05,
              ease: "easeOut"
            }}
            whileHover={{ 
              color: "#15F5BA",
              y: -2
            }}
            whileTap={{ scale: 0.95 }}
            className={styles.navLink}
          >
            {item}
          </motion.a>
        ))}
      </nav>
      <div className={styles.navRight}>
        <motion.button
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2, delay: 0.5 }}
          whileHover={{ 
            backgroundColor: "rgba(21, 245, 186, 0.1)",
            borderColor: "#15F5BA"
          }}
          whileTap={{ scale: 0.95 }}
          className={styles.loginButton}
        >
          Log in
        </motion.button>
        <motion.button
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2, delay: 0.55 }}
          whileHover={{ 
            backgroundColor: "#0ed3a5",
            boxShadow: "0 4px 12px rgba(21, 245, 186, 0.3)"
          }}
          whileTap={{ scale: 0.95 }}
          className={styles.signUp}
        >
          Sign up
        </motion.button>
      </div>
    </motion.header>
  );
};

export default Navbar;