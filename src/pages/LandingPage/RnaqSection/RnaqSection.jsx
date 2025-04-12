import { motion } from 'framer-motion';
import { FaDownload, FaInfoCircle } from 'react-icons/fa';
import styles from './RnaqSection.module.css';
import { chart7 } from '../../../assets/images/images.js';

// Ultra-fast animation configurations
const animationConfig = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.01, // Much faster stagger
        when: "beforeChildren",
      },
    },
  },
  item: {
    hidden: { y: 5, opacity: 0 }, // Smaller initial movement
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.1, // Super fast duration
        ease: "linear", // No easing for maximum speed
      },
    },
  },
  leftContent: {
    initial: { opacity: 0, x: -10 }, // Smaller initial offset
    animate: { opacity: 1, x: 0 },
    transition: { 
      duration: 0.15, // Faster
      ease: "linear"
    }
  },
  chart: {
    animate: { y: [0, -3, 0] }, // Smaller bounce
    transition: {
      duration: 3, // Faster float
      repeat: Infinity,
      ease: "linear",
    }
  },
  highlight: {
    initial: { backgroundSize: "0% 100%" },
    animate: { backgroundSize: "100% 100%" },
    transition: { 
      duration: 0.2, // Faster highlight
      ease: "linear"
    }
  },
  button: {
    whileHover: { 
      scale: 1.01, // More subtle hover
      backgroundColor: "#0ed3a5",
    },
    whileTap: { scale: 0.99 }, // More subtle tap
    transition: { duration: 0.05 } // Ultra-fast button transitions
  },
  secondaryButton: {
    whileHover: { 
      scale: 1.01,
      backgroundColor: "rgba(255, 255, 255, 0.03)",
    },
    whileTap: { scale: 0.99 },
    transition: { duration: 0.05 }
  }
};

const FeatureList = ({ items }) => (
  <motion.ul variants={animationConfig.item} className={styles.featureList}>
    {items.map((item, index) => (
      <motion.li key={index} variants={animationConfig.item}>
        {item}
      </motion.li>
    ))}
  </motion.ul>
);

const ActionButton = ({ variant = 'primary', icon: Icon, children }) => (
  <motion.button
    {...(variant === 'primary' ? animationConfig.button : animationConfig.secondaryButton)}
    className={variant === 'primary' ? styles.primaryButton : styles.secondaryButton}
  >
    {children}
    {Icon && <Icon className={styles.buttonIcon} />}
  </motion.button>
);

const ChartAnimation = () => (
  <motion.div
    className={styles.chartWrapper}
    animate={animationConfig.chart.animate}
    transition={animationConfig.chart.transition}
  >
    <img
      src={chart7}
      alt="RNAQ Framework Chart"
      loading="eager"
      className={styles.chartImage}
    />
    <div className={styles.chartGlow} />
  </motion.div>
);

const RnaqSection = () => {
  const features = [
    "Institutional self-evaluation",
    "Continuous improvement processes",
    "Quality certification benchmarks",
    "Research excellence standards"
  ];

  return (
    <section className={styles.rnaqSection}>
      <div className={styles.backgroundPattern} />
      
      <motion.div
        initial="hidden"
        animate="visible"
        variants={animationConfig.container}
        className={styles.rnaqContainer}
      >
        <motion.div 
          className={styles.leftContent}
          initial={animationConfig.leftContent.initial}
          animate={animationConfig.leftContent.animate}
          transition={animationConfig.leftContent.transition}
        >
          <ChartAnimation />
        </motion.div>

        <motion.div className={styles.rightContent}>
          <motion.div variants={animationConfig.item} className={styles.sectionBadge}>
            <span>QUALITY FRAMEWORK</span>
          </motion.div>
          
          <motion.h2 variants={animationConfig.item} className={styles.rnaqTitle}>
            Understanding the{' '}
            <motion.span 
              className={styles.highlight}
              initial={animationConfig.highlight.initial}
              animate={animationConfig.highlight.animate}
              transition={animationConfig.highlight.transition}
            >
              RNAQ-ESRS
            </motion.span>
          </motion.h2>
          
          <motion.p variants={animationConfig.item} className={styles.rnaqDescription}>
            The <strong>Référentiel National d'Assurance Qualité</strong> is Algeria's premier 
            framework guiding higher education institutions in quality assurance. 
            Aligning with international standards, it provides tools for:
          </motion.p>
          
          <FeatureList items={features} />
          
          <motion.div variants={animationConfig.item} className={styles.buttonGroup}>
            <ActionButton icon={FaDownload}>
              Download Framework
            </ActionButton>
            <ActionButton variant="secondary" icon={FaInfoCircle}>
              Learn More
            </ActionButton>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default RnaqSection;