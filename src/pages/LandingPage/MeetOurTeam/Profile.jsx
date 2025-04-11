import React from 'react';
import styles from './Profile.module.css';

const Profile = ({ picture, role, name, socialLinks }) => {
  return (
    <div className={styles.profile}>
  <div className={styles.card}>
    {/* Move the image inside the card */}
    <img src={picture} alt={name} className={styles.picture} />
  </div>

  <div className={styles.info}>
    <p className={styles.role}>{role}</p>
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
