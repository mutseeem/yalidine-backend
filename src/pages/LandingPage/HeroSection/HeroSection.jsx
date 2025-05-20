import { motion } from 'framer-motion';
import styles from './HeroSection.module.css'; // Import HeroSection specific styles
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { chart6 } from '../../../assets/images/images';


const HeroSection = () => { // Removed navigateTo prop as it's no longer needed for this functionality

  // animation section , can be changed later .
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        when: "beforeChildren",
      },
    },
  };

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.2,
        ease: "easeOut",
      },
    },
  };

  // Re-introducing a local handleScroll if you prefer, or rely purely on href + CSS
  // For consistency with Navbar's NavItem, it's good to prevent default.
  const handleLocalScroll = (e, id) => {
    e.preventDefault(); // Prevent default anchor jump
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' }); // 'start' is common for hero links
    }
    // You could also use the shared handleScroll from utils if you re-import it
    // handleScroll(id, 'start');
  };


  return (
    <section className={styles.hero}>
      {/* ─── Left Content ────────────────────────── */}
      <motion.div
        className={styles.leftContent}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/*badge*/}
        <motion.div variants={itemVariants} className={styles.badge}>
          <span>Guided by RNAQ-ESRS</span>
        </motion.div>

        {/*title*/}
        <motion.h1 variants={itemVariants} className={styles.heroTitle}>
          Transform Your{' '}
          <motion.span
            className={styles.highlight}
            initial={{ backgroundSize: "0% 100%" }}
            animate={{ backgroundSize: "100% 100%" }}
            transition={{
              duration: 0.4,
              delay: 0.15,
              ease: "easeOut"
            }}
          >
            Quality Management
          </motion.span>
        </motion.h1>

        {/*subtitle*/}
        <motion.p
          variants={itemVariants}
          className={styles.heroSubtitle}
          transition={{ delay: 0.1 }}
        >
          A practical solution designed to enhance productivity and trust in universities by supporting quality assurance processes and streamlining workflows.
        </motion.p>

        {/*buttons*/}
        <motion.div
          variants={itemVariants}
          className={styles.heroButtons}
          transition={{ delay: 0.15 }}
        >
          {/*START NOW BUTTON */}
          <motion.button
            whileHover={{
              scale: 1.01,
              boxShadow: "rgba(82, 220, 255, 0.1)"
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.1 }}
            className={styles.primaryButton}
          >
            Start now
            <FontAwesomeIcon icon={faArrowRight} className={styles.buttonIcon} />
          </motion.button>

          {/* LEARN MORE BUTTON - Now links to the #about section directly */}
          <motion.a
            href="#about" // Set href to the target section ID, matching Navbar's pattern
            onClick={(e) => handleLocalScroll(e, 'about')} // Use local handler to prevent default and scroll
            whileHover={{
              scale: 1.01,
              backgroundColor: "rgba(65, 184, 213, 0.1)"
            }}
            whileTap={{ scale: 0.99 }}
            transition={{ duration: 0.1 }}
            className={styles.secondaryButton} // Reuses the existing button styles
          >
            <FontAwesomeIcon icon={faCircleInfo} className={styles.buttonIcon} />
            Learn more
          </motion.a>
        </motion.div>

        {/*TODO: Add a link to the trusted , and uncomment it when we are ready to use it
        <motion.div
          variants={itemVariants}
          className={styles.trustedBy}
          transition={{ delay: 0.2 }}
        >
          <div className={styles.trustedText}>Trusted by:</div>
          <div className={styles.logoGrid}>
            <div className={styles.logoItem}>UMKB</div>
            <div className={styles.logoItem}>Kahloul</div>
            <div className={styles.logoItem}>Ramdani</div>
            <div className={styles.logoItem}>amine</div>
            <div className={styles.logoItem}>7ajBaroud</div>
          </div>
        </motion.div>
        */}
      </motion.div>


      {/* ─── right Content ────────────────────────── */}
      <motion.div
        className={styles.rightContent}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.3,
          delay: 0.25,
          ease: "easeOut"
        }}
      >
        <motion.div
          className={styles.chartContainer}
          animate={{
            y: [0, -5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <img
            src={chart6} // Use chart6Placeholder or chart6 if locally imported
            alt="Analytics Dashboard"
            loading="eager"
            className={styles.dashboardImage}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;