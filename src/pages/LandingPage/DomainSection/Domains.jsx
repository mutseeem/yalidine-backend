import React from 'react';
import styles from './Domains.module.css';
import DomainCard from './DomainCard';
import { motion } from 'framer-motion';
import { useNavigate } from "react-router-dom";
import { 
  FaGraduationCap, 
  FaMicroscope, 
  FaChessKing, 
  FaUniversity,
  FaBuilding,
  FaHandshake,
  FaGlobeAmericas,
  FaLeaf
} from 'react-icons/fa';

const Domains = () => {
  const navigate = useNavigate();

  const handleDomainClick = (domainNumber) => {
    if (domainNumber === "7") {
      navigate("/chapters/overview");
    } else {
      navigate(`/domain/${domainNumber}`);
    }
  };
  
  const domainsData = [
    {
      name: 'FORMATION',
      number: '1',
      icon: <FaGraduationCap />,
      description: 'Focused on the structure, delivery, and continuous improvement of academic training in universities',
    },
    {
      name: 'RESEARCH AND INNOVATION',
      number: '2',
      icon: <FaMicroscope />,
      description: 'Covers strategic development, partnerships, and the impact of research and innovation',
    },
    {
      name: 'GOVERNANCE',
      number: '3',
      icon: <FaChessKing />,
      description: 'Focuses on the strategic management of information, policy development, and organizational oversight for effective governance',
    },
    {
      name: 'ÉESRS',
      number: '4',
      icon: <FaUniversity />,
      description: 'Life in Higher Education Institutions and Scientific Research',
    },
    {
      name: 'INFRASTRUCTURE',
      number: '5',
      icon: <FaBuilding />,
      description: 'Covers the management and maintenance of key infrastructures for administration, academics, research, and student life.',
    },
    {
      name: 'RELATIONS WITH THE SOCIOECONOMIC ENVIRONMENT',
      number: '6',
      icon: <FaHandshake />,
      description: 'Focuses on the institution`s interaction with its socioeconomic environment.',
    },
    {
      name: 'INTERNATIONAL COOPERATION',
      number: '7',
      icon: <FaGlobeAmericas />,
      description: 'Focuses on establishing and strengthening international partnerships and collaborations to enhance global engagement and academic exchange',
    },
    {
      name: 'UNIVERSITY SOCIAL RESPONSIBILITY AND SUSTAINABLE DEVELOPMENT',
      number: '8',
      icon: <FaLeaf />,
      description: 'Focuses on promoting social responsibility and sustainable practices within the university.',
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
            key={domain.number}
            name={domain.name}
            number={domain.number}
            icon={domain.icon}
            description={domain.description}
            index={index}
            onClick={() => handleDomainClick(domain.number)}
          />
        ))}
      </div>
    </section>
  );
};

export default Domains;