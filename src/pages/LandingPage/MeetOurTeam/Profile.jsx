import React from 'react';
import styles from './Profile.module.css';

const Profile = ({ picture, role, name, socialLinks }) => {
  return (
    <div className={styles.profile}>
      {/* Blue Area (Card) */}
      <div className={styles.card}>
        {/* Hidden Image Container */}
        <div className={styles.imageContainer}>
          <img src={picture} alt={name} className={styles.picture} />
        </div>
      </div>

      {/* Black Area (Info) */}
      <div className={styles.info}>
        {/* Role */}
        <p className={styles.role}>{role}</p>

        {/* Name and Social Icons */}
        <div className={styles.nameAndIcons}>
          <h3 className={styles.name}>{name}</h3>
          <div className={styles.socialLinks}>
            {socialLinks.map((link, index) => (
              <a key={index} href={link.url} target="_blank" rel="noopener noreferrer">
                <i className={`fab ${link.icon}`} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;