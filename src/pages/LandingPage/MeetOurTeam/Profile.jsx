// Profile.js
import React from 'react';
import { motion } from 'framer-motion';
import styles from './Profile.module.css';

const Profile = ({ picture, role, name, socialLinks }) => {
  return (
    <motion.div 
      className={styles.profile}
      whileHover={{
        y: -10,
        transition: { duration: 0.2 }
      }}
    >
      <div className={styles.card}>
        <div className={styles.imageContainer}>
          <motion.img 
            src={picture} 
            alt={name} 
            className={styles.picture}
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.3 }
            }}
          />
        </div>
      </div>

      <div className={styles.info}>
        <p className={styles.role}>{role}</p>
        <div className={styles.nameAndIcons}>
          <h3 className={styles.name}>{name}</h3>
          <div className={styles.socialLinks}>
            {socialLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ 
                  y: -3,
                  color: '#15F5BA',
                  transition: { duration: 0.1 }
                }}
              >
                <i className={`fab ${link.icon}`} />
              </motion.a>
            ))}
          </div>  
        </div>
      </div>
    </motion.div>
  );
};

export default Profile;