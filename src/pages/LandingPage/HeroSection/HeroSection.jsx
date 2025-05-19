import { motion } from 'framer-motion';
import { chart6 } from '../../../assets/images/images';
import styles from './HeroSection.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faCircleInfo } from '@fortawesome/free-solid-svg-icons';


//TODO: chnage the picture of the profile , make somthing better !!! 

const HeroSection = () => {
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

  return (
    <section className={styles.hero}>
      {/* Left Content */}
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
              duration: 0.4,
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
          transition={{ delay: 0.1 }}
        >
          A practical solution designed to enhance productivity and trust in universities by supporting quality assurance processes and streamlining workflows.
        </motion.p>

        <motion.div 
          variants={itemVariants} 
          className={styles.heroButtons}
          transition={{ delay: 0.15 }}
        >
          <motion.button
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 2px 10px rgba(2, 37, 29, 0.1)"
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.1 }}
            className={styles.primaryButton}
          >
            Start now
            <FontAwesomeIcon icon={faArrowRight} className={styles.buttonIcon} />
          </motion.button>
          
          <motion.button
            whileHover={{ 
              scale: 1.02,
              backgroundColor: "rgba(65, 184, 213, 0.1)"
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.1 }}
            className={styles.secondaryButton}
          >
            <FontAwesomeIcon icon={faCircleInfo} className={styles.buttonIcon} />
            Learn more
          </motion.button>
        </motion.div>

        {/*TODO: Add a link to the trusted by section , and uncomment it when we are ready to use it
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

      
      {/* Right Content */}
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