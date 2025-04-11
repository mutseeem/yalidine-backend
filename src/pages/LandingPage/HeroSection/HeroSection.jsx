import { motion } from 'framer-motion';
import { chart6 } from '../../../assets/images/images';
import styles from './HeroSection.module.css';

const HeroSection = () => {
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
    <section className={styles.hero}>
      <motion.div
        className={styles.leftContent}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.h1 variants={itemVariants} className={styles.heroTitle}>
          Empowering Excellence in{' '}
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
            Quality
          </motion.span>{' '}
          Management
        </motion.h1>

        <motion.p 
          variants={itemVariants} 
          className={styles.heroSubtitle}
          transition={{ delay: 0.1 }}
        >
          A smart, scalable SaaS platform designed to streamline, evaluate, and elevate quality processes across universities and businesses.
        </motion.p>

        <motion.div 
          variants={itemVariants} 
          className={styles.heroButtons}
          transition={{ delay: 0.15 }}
        >
          <motion.button
            whileHover={{ 
              scale: 1.02,
              backgroundColor: "#0ed3a5",
              boxShadow: "0 4px 12px rgba(21, 245, 186, 0.3)"
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className={styles.getStarted}
          >
            Get started
          </motion.button>
          <motion.button
            whileHover={{ 
              scale: 1.02,
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              borderColor: "rgba(255, 255, 255, 0.5)"
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className={styles.learnMore}
          >
            Learn more
          </motion.button>
        </motion.div>
      </motion.div>

      <motion.div
        className={styles.rightContent}
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ 
          duration: 0.3,
          delay: 0.2,
          ease: [0.16, 0.77, 0.47, 0.97]
        }}
      >
        <motion.div
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
            alt="Analytics Chart"
            loading="lazy"
            className={styles.plainChartImage}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;