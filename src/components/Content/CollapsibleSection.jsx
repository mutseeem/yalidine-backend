import React, { useState } from 'react';
import styles from './CollapsibleSection.module.css';
import FaAngleDown from '../../assets/icons/angle-circle-down.svg';
import FaAngleRight from '../../assets/icons/angle-circle-right.svg';

const CollapsibleSection = ({ title, icon, indicator, category, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSection = () => {
    setIsOpen((prev) => !prev);
  };

  // Assign a fill color based on the category
  const iconClass =
    category === 'category1'
      ? styles['icon-orange']
      : category === 'category2'
      ? styles['icon-blue']
      : styles['icon-purple'];

  return (
    <div className={styles.section}>
      {/* Header */}
      <div className={styles.header} onClick={toggleSection} role="button" aria-expanded={isOpen}>
        <div className={styles.iconContainer}>
          <img src={isOpen ? FaAngleDown : FaAngleRight} alt="toggle" className={`${styles.icon} ${iconClass}`} />
        </div>
        <div className={styles.title}>{title}</div>
        <div className={styles.indicator}>{indicator}</div>
      </div>

      {/* Expandable Content */}
      {isOpen && <div className={styles.content}>{children}</div>}
    </div>
  );
};

export default CollapsibleSection;