import { motion } from 'framer-motion';
import { FaDownload, FaInfoCircle } from 'react-icons/fa';
import styles from './RnaqSection.module.css';
import { chart7 } from '../../../assets/images/images.js';

const animationConfig = {
    container: {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.01, when: "beforeChildren", // Children animate after container
            },
        },
    },
    item: {
        hidden: { y: 5, opacity: 0 },
        visible: {
            y: 0, opacity: 1,
            transition: {
                duration: 0.1, ease: "linear",
            },
        },
    },
    leftContent: {
        initial: { opacity: 0, x: -10 }, // Initial position
        animate: { opacity: 1, x: 0 }, // Animates to final position
        transition: {
            duration: 0.15, ease: "linear"
        }
    },
    chart: {
        animate: { y: [0, -3, 0] }, // Bouncing animation for chart
        transition: {
            duration: 3, repeat: Infinity, ease: "linear",
        }
    },
    highlight: {
        initial: { backgroundSize: "0% 100%" }, // Initial highlight state
        animate: { backgroundSize: "100% 100%" }, // Animates highlight fill
        transition: {
            duration: 0.2, ease: "linear"
        }
    },
    button: {
        whileHover: {
            scale: 1.01, backgroundColor: "#0ed3a5", // Primary button hover effect
        },
        whileTap: { scale: 0.99 }, // Primary button tap effect
        transition: { duration: 0.05 }
    },
    secondaryButton: {
        whileHover: {
            scale: 1.01, backgroundColor: "rgba(255, 255, 255, 0.03)", // Secondary button hover effect
        },
        whileTap: { scale: 0.99 }, // Secondary button tap effect
        transition: { duration: 0.05 }
    }
};

const FeatureList = ({ items }) => (
    <motion.ul variants={animationConfig.item} className={styles.featureList}>
        {items.map((item, index) => (
            <motion.li key={index} variants={animationConfig.item}> {item} </motion.li>
        ))}
    </motion.ul>
);

const ActionButton = ({ variant = 'primary', icon: Icon, children, onClick, href }) => {
    const isDownloadFrameworkButton = href === "/framework.pdf" && children === "Download Framework"; // Identify download button

    const handleClick = (event) => {
        if (onClick) { onClick(event); } // Execute custom onClick if present

        if (isDownloadFrameworkButton) {
            event.preventDefault(); // Prevent default browser behavior

            const link = document.createElement('a'); // Create temporary link
            link.href = href; // Set download file path
            link.download = href.split('/').pop(); // Suggest filename

            document.body.appendChild(link); // Append link to body
            link.click(); // Trigger click for download
            document.body.removeChild(link); // Remove link after click
        }
    };

    return (
        <motion.button
            {...(variant === 'primary' ? animationConfig.button : animationConfig.secondaryButton)}
            className={variant === 'primary' ? styles.primaryButton : styles.secondaryButton}
            onClick={handleClick} // Assign custom click handler

            {...(!isDownloadFrameworkButton && href && { as: 'a', href: href, target: '_blank', rel: 'noopener noreferrer' })} // Render as <a> for non-downloads
        >
            {children}
            {Icon && <Icon className={styles.buttonIcon} />}
        </motion.button>
    );
};

const ChartAnimation = () => (
    <motion.div
        className={styles.chartWrapper}
        animate={animationConfig.chart.animate}
        transition={animationConfig.chart.transition}
    >
        <img src={chart7} alt="RNAQ Framework Chart" loading="eager" className={styles.chartImage} />
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

    const handleLearnMoreClick = () => {
        const RNAQ_ESRS_DOC_URL = "https://www.digitaq.eu/"; // External URL for learn more
        window.open(RNAQ_ESRS_DOC_URL, '_blank', 'noopener noreferrer'); // Open in new tab
    };

    const handleDownloadButtonClick = () => {
        console.log("Download button clicked!"); // Log message on click
    };

    return (
        <section className={styles.rnaqSection}>
            <div className={styles.backgroundPattern} />

            <motion.div
                initial="hidden" animate="visible" variants={animationConfig.container}
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
                        <ActionButton icon={FaDownload} href="/framework.pdf" onClick={handleDownloadButtonClick}>
                            Download Framework
                        </ActionButton>
                        <ActionButton variant="secondary" icon={FaInfoCircle} onClick={handleLearnMoreClick}>
                            Learn More
                        </ActionButton>
                    </motion.div>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default RnaqSection;