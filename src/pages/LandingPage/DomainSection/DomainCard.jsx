import React from 'react';
import styles from './DomainCard.module.css';

const DomainCard = ({ color, name, number, icon, description }) => {
  return (
    <div className={styles.card} style={{ '--card-color': color }}>
      <div className={styles.content}>
        <div className={styles.iconContainer}>
          {icon}
        </div>
        <div className={styles.domainNumber}>DOMAINE {number}</div>
        <h2 className={styles.domainName}>{name}</h2>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
};

export default DomainCard;