import { motion } from 'framer-motion';
import { chart6 } from '../../../assets/images/images';
import styles from './HeroSection.module.css';

const HeroSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03, // Faster stagger
        when: "beforeChildren",
      },
    },
  };

  const itemVariants = {
    hidden: { y: 10, opacity: 0 }, // Smaller initial movement
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.2, // Faster duration
        ease: "easeOut",
      },
    },
  };

  return (
    <section className={styles.hero}>
      <motion.div
        className={styles.leftContent}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants} className={styles.badge}>
          <span>Guided by RNAQ-ESRS</span>
        </motion.div>

        <motion.h1 variants={itemVariants} className={styles.heroTitle}>
          Transform Your{' '}
          <motion.span
            className={styles.highlight}
            initial={{ backgroundSize: "0% 100%" }}
            animate={{ backgroundSize: "100% 100%" }}
            transition={{ 
              duration: 0.4, // Faster highlight animation
              delay: 0.15,
              ease: "easeOut"
            }}
          >
            Quality Management
          </motion.span>
        </motion.h1>

        <motion.p 
          variants={itemVariants} 
          className={styles.heroSubtitle}
          transition={{ delay: 0.1 }} // Reduced delay
        >
          A practical solution designed to enhance productivity and trust in universities by supporting quality assurance processes and streamlining workflows..
        </motion.p>

        <motion.div 
          variants={itemVariants} 
          className={styles.heroButtons}
          transition={{ delay: 0.15 }} // Reduced delay
        >
          <motion.button
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 2px 10px rgba(14, 211, 165, 0.3)" // Subtler shadow
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.1 }} // Faster interaction
            className={styles.primaryButton}
          >
            Start now
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </motion.button>
          
          <motion.button
            whileHover={{ 
              scale: 1.02,
              backgroundColor: "rgba(0, 0, 0, 0.02)" // Lighter hover
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.1 }} // Faster interaction
            className={styles.secondaryButton}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2"/>
              <path d="M12 16V12M12 8H12.01" stroke="currentColor" strokeWidth="2"/>
            </svg>
            Learn more
          </motion.button>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className={styles.trustedBy}
          transition={{ delay: 0.2 }}
        >
          <div className={styles.trustedText}>Trusted by:</div>
          <div className={styles.logoGrid}>
            <div className={styles.logoItem}>Biskra</div>
            <div className={styles.logoItem}>Kahloul</div>
            <div className={styles.logoItem}>Ramdani</div>
            <div className={styles.logoItem}>amine</div>
            <div className={styles.logoItem}>7ajBaroud</div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        className={styles.rightContent}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.3, // Faster animation
          delay: 0.25,
          ease: "easeOut"
        }}
      >
        <motion.div
          className={styles.chartContainer}
          animate={{
            y: [0, -5, 0], // Smaller bounce
          }}
          transition={{
            duration: 4, // Slightly faster float
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