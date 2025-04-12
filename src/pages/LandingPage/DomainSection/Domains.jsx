// Domains.js
import React from 'react';
import styles from './Domains.module.css';
import DomainCard from './DomainCard';
import { motion } from 'framer-motion';

const Domains = () => {
  const domainsData = [
    {
      name: 'GOVERNANCE',
      number: '1',
      icon: <i className="fas fa-chess-queen" />,
      description: 'Strategic leadership and decision-making frameworks',
    },
    {
      name: 'EDUCATION',
      number: '2',
      icon: <i className="fas fa-graduation-cap" />,
      description: 'Academic program quality and student outcomes',
    },
    {
      name: 'RESEARCH',
      number: '3',
      icon: <i className="fas fa-flask" />,
      description: 'Research excellence and innovation standards',
    },
    {
      name: 'RESOURCES',
      number: '4',
      icon: <i className="fas fa-cogs" />,
      description: 'Human, financial and infrastructure management',
    },
    {
      name: 'COMMUNITY',
      number: '5',
      icon: <i className="fas fa-users" />,
      description: 'Social engagement and stakeholder relations',
    },
    {
      name: 'TECHNOLOGY',
      number: '6',
      icon: <i className="fas fa-server" />,
      description: 'Digital infrastructure and information systems',
    },
    {
      name: 'QUALITY',
      number: '7',
      icon: <i className="fas fa-award" />,
      description: 'Continuous improvement and assurance processes',
    },
    {
      name: 'INTERNATIONAL',
      number: '8',
      icon: <i className="fas fa-globe" />,
      description: 'Global standards alignment and partnerships',
    },
  ];

  return (
    <section className={styles.domainsSection}>
      <div className={styles.header}>
        <motion.div 
          className={styles.qualityTag}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: 0.1 }}
        >
          QUALITY FRAMEWORK 
        </motion.div>
        
        <motion.h2 
          className={styles.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          RNAQ-ESRS DOMAINS
        </motion.h2>
        
        <motion.p 
          className={styles.subtitle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.15 }}
        >
          Comprehensive framework pillars for institutional excellence
        </motion.p>
      </div>

      <div className={styles.domainGrid}>
        {domainsData.map((domain, index) => (
          <DomainCard
            key={index}
            name={domain.name}
            number={domain.number}
            icon={domain.icon}
            description={domain.description}
            index={index}
          />
        ))}
      </div>
    </section>
  );
};

export default Domains;
