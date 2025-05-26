import { motion } from 'framer-motion';
import styles from './HeroSection.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { chart6 } from '../../../assets/images/images';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

const HeroSection = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  // animation section
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

 
  const handleLocalScroll = (e, id) => {
    e.preventDefault(); 
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

 
  const handleStartNowClick = () => {
    navigate('/login'); 
  };


  return (
    <section className={styles.hero}>
      {/* left content section */}
      <motion.div
        className={styles.leftContent}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* badge */}
        <motion.div variants={itemVariants} className={styles.badge}>
          <span>Guided by RNAQ-ESRS</span>
        </motion.div>

        {/* title */}
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

        {/* subtitle */}
        <motion.p
          variants={itemVariants}
          className={styles.heroSubtitle}
          transition={{ delay: 0.1 }}
        >
          A practical solution designed to enhance productivity and trust in universities by supporting quality assurance processes and streamlining workflows.
        </motion.p>

        {/* buttons group */}
        <motion.div
          variants={itemVariants}
          className={styles.heroButtons}
          transition={{ delay: 0.15 }}
        >
          {/* START NOW BUTTON */}
          <motion.button
            whileHover={{
              scale: 1.01,
              boxShadow: "rgba(82, 220, 255, 0.1)"
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.1 }}
            className={styles.primaryButton}
            onClick={handleStartNowClick} // Added onClick handler
          >
            Start now
            <FontAwesomeIcon icon={faArrowRight} className={styles.buttonIcon} />
          </motion.button>

          {/* LEARN MORE BUTTON */}
          <motion.a
            href="#about"
            onClick={(e) => handleLocalScroll(e, 'about')}
            whileHover={{
              scale: 1.01,
              backgroundColor: "rgba(65, 184, 213, 0.1)"
            }}
            whileTap={{ scale: 0.99 }}
            transition={{ duration: 0.1 }}
            className={styles.secondaryButton}
          >
            <FontAwesomeIcon icon={faCircleInfo} className={styles.buttonIcon} />
            Learn more
          </motion.a>
        </motion.div>

        
        <motion.div
          variants={itemVariants}
          className={styles.trustedBy}
          transition={{ delay: 0.2 }}
        >
          <div className={styles.trustedText}>Trusted by:</div>
          <div className={styles.logoGrid}>
            <div className={styles.logoItem}>UMKB</div>
            <div className={styles.logoItem}>DIGIQA</div>
            <div className={styles.logoItem}>ISO 9001</div>
            {/*<div className={styles.logoItem}>and more</div>*/}
            
          </div>
        </motion.div>
        
      </motion.div>

      {/* right content section */}
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
            src={chart6}
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