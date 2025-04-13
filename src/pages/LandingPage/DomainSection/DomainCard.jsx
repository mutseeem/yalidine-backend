import React from 'react';
import styles from './DomainCard.module.css';

const DomainCard = ({ name, number, icon, description, index, onClick }) => {
  const colors = [
    '#15F5BA', '#0ED3A5', '#00B4D8', '#0095C7',
    '#0077B6', '#005D99', '#00457C', '#002F5D'
  ];

  return (
    <div 
      className={styles.card}
      style={{ 
        '--card-color': colors[index % colors.length],
        '--card-bg': `${colors[index % colors.length]}15`
      }}
      onClick={onClick}
    >
      <div className={styles.content}>
        <div className={styles.iconContainer}>
          {React.cloneElement(icon, { 
            className: styles.icon,
            size: 24 // Ensures consistent icon size
          })}
        </div>
        <div className={styles.domainNumber}>DOMAIN {number}</div>
        <h3 className={styles.domainName}>{name}</h3>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
};

export default DomainCard;