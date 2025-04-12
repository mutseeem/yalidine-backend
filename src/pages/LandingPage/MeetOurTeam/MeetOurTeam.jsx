// MeetOurTeam.js
import React from 'react';
import { motion } from 'framer-motion';
import styles from './MeetOurTeam.module.css';
import Profile from './Profile';
import { ilyes, moatassim, amine, ramdani } from '../../../assets/images/images';

const MeetOurTeam = () => {
  const teamMembers = [
    {
      picture: amine,
      role: 'UI/UX & Front-end',
      name: 'CHABI AMINE',
      socialLinks: [
        { url: '#', icon: 'fa-linkedin' },
        { url: '#', icon: 'fa-github' }
      ],
    },
    {
      picture: ilyes,
      role: 'UI/UX & Front-end',
      name: 'IZEMMOUREN ILYES',
      socialLinks: [
        { url: '#', icon: 'fa-linkedin' },
        { url: '#', icon: 'fa-dribbble' }
      ],
    },
    {
      picture: ramdani,
      role: 'Supervisor',
      name: 'RAMDANI MOHAMED',
      socialLinks: [
        { url: '#', icon: 'fa-linkedin' },
        { url: '#', icon: 'fa-twitter' }
      ],
    },
    {
      picture: ramdani,
      role: 'Supervisor',
      name: 'RAMDANI MOHAMED',
      socialLinks: [
        { url: '#', icon: 'fa-linkedin' },
        { url: '#', icon: 'fa-globe' }
      ],
    }
  ];

  return (
    <section className={styles.meetOurTeamSection}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className={styles.header}
      >
        <h2 className={styles.title}>MEET OUR TEAM</h2>
        <p className={styles.subtitle}>The brilliant minds behind your quality assurance journey</p>
      </motion.div>

      <div className={styles.teamGrid}>
        {teamMembers.map((member, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.4,
              delay: index * 0.1
            }}
          >
            <Profile
              picture={member.picture}
              role={member.role}
              name={member.name}
              socialLinks={member.socialLinks}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default MeetOurTeam;