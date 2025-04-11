import { motion } from 'framer-motion';
import styles from './RnaqSection.module.css';
import { chart7 } from '../../../assets/images/images.js';

const RnaqSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        when: "beforeChildren",
      },
    },
  };

  const itemVariants = {
    hidden: { y: 15, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.25,
        ease: [0.16, 0.77, 0.47, 0.97],
      },
    },
  };

  return (
    <section className={styles.rnaqSection}>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className={styles.rnaqContainer}
      >
        {/* Left Content - Chart */}
        <motion.div 
          className={styles.leftContent}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ 
            duration: 0.3,
            delay: 0.2,
            ease: [0.16, 0.77, 0.47, 0.97]
          }}
        >
          <motion.div
            animate={{
              y: [0, -8, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <img
              src={chart7}
              alt="RNAQ Framework Chart"
              loading="lazy"
              className={styles.chartImage}
            />
          </motion.div>
        </motion.div>

        {/* Right Content - Text */}
        <motion.div className={styles.rightContent}>
          <motion.h2 variants={itemVariants} className={styles.rnaqTitle}>
            WHAT IS RNAQ-ESRS?
          </motion.h2>
          <motion.p variants={itemVariants} className={styles.rnaqDescription}>
            The RNAQ-ESRS AKA "Référentiel National d'Assurance Qualité" is 
            a national framework that guides higher education and 
            research institutions in Algeria to ensure and enhance quality. 
            It serves as a foundation for internal evaluation, continuous 
            improvement, and alignment with international standards in 
            education and research.
          </motion.p>
          <motion.div variants={itemVariants}>
            <motion.button
              whileHover={{ 
                scale: 1.03,
                backgroundColor: "#15F5BA",
                color: "#020b16"
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.15 }}
              className={styles.rnaqButton}
            >
              Learn More
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default RnaqSection;