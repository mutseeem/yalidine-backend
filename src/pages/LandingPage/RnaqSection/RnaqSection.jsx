import { motion } from 'framer-motion';
import styles from './RnaqSection.module.css';
import { chart7 } from '../../../assets/images/images.js';

const RnaqSection = () => {
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
    <section className={styles.rnaqSection}>
      <div className={styles.backgroundPattern} />
      
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className={styles.rnaqContainer}
      >
        {/* Left Content - Chart */}
        <motion.div 
          className={styles.leftContent}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ 
            duration: 0.25, // Faster
            delay: 0.15,    // Sooner
            ease: "easeOut"
          }}
        >
          <motion.div
            className={styles.chartWrapper}
            animate={{
              y: [0, -5, 0], // Smaller bounce
            }}
            transition={{
              duration: 5, // Slightly faster float
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <img
              src={chart7}
              alt="RNAQ Framework Chart"
              loading="eager" // Changed to eager for important image
              className={styles.chartImage}
            />
            <div className={styles.chartGlow} />
          </motion.div>
        </motion.div>

        {/* Right Content - Text */}
        <motion.div className={styles.rightContent}>
          <motion.div variants={itemVariants} className={styles.sectionBadge}>
            <span>QUALITY FRAMEWORK</span>
          </motion.div>
          
          <motion.h2 variants={itemVariants} className={styles.rnaqTitle}>
            Understanding the{' '}
            <motion.span 
              className={styles.highlight}
              initial={{ backgroundSize: "0% 100%" }}
              animate={{ backgroundSize: "100% 100%" }}
              transition={{ 
                duration: 0.4, 
                delay: 0.2,
                ease: [0.16, 0.77, 0.47, 0.97]
              }}
            >
              RNAQ-ESRS
            </motion.span>
          </motion.h2>
          
          <motion.p variants={itemVariants} className={styles.rnaqDescription}>
            The <strong>Référentiel National d'Assurance Qualité</strong> is Algeria's premier 
            framework guiding higher education institutions in quality assurance. 
            Aligning with international standards, it provides tools for:
          </motion.p>
          
          <motion.ul variants={itemVariants} className={styles.featureList}>
            <li>Institutional self-evaluation</li>
            <li>Continuous improvement processes</li>
            <li>Quality certification benchmarks</li>
            <li>Research excellence standards</li>
          </motion.ul>
          
          <motion.div variants={itemVariants} className={styles.buttonGroup}>
            <motion.button
              whileHover={{ 
                scale: 1.02,
                backgroundColor: "#0ed3a5",
                boxShadow: "0 4px 15px rgba(21, 245, 186, 0.3)"
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.1 }}
              className={styles.primaryButton}
            >
              Download Framework
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M12 16L16 12M12 16L8 12M12 16V8M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </motion.button>
            
            <motion.button
              whileHover={{ 
                scale: 1.02,
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                borderColor: "#15F5BA"
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.1 }}
              className={styles.secondaryButton}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2"/>
                <path d="M12 16V12M12 8H12.01" stroke="currentColor" strokeWidth="2"/>
              </svg>
              Learn More
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default RnaqSection;