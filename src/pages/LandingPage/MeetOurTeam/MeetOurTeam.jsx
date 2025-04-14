// MeetOurTeam.js
import React from 'react';
import { motion } from 'framer-motion';
import styles from './MeetOurTeam.module.css';
import Profile from './Profile';
import { ilyes, moatassim, amine, ramdani,kahloul ,meftah } from '../../../assets/images/images';


//TODO: fix the linking f the icons , github and linkedin
const MeetOurTeam = () => {
  const teamMembers = [
    {
      picture: kahloul,
      role: 'Supervisor',
      name: 'Pr.KAHLOUL LAID',
      socialLinks: [
        { url: '#', icon: 'fa-linkedin' },
        { url: '#', icon: 'fa-facebook' }
      ],
    },
    {
      picture: ramdani,
      role: 'Supervisor',
      name: 'Dr.RAMDANI MOHAMED',
      socialLinks: [
        { url: '#', icon: 'fa-linkedin' },
        { url: '#', icon: 'fa-Facebook' }
      ],
    },
    {
      picture: amine,
      role: 'Team leader & BACK-END Dev',
      name: 'CHABI AMINE',
      socialLinks: [
        { url: '#', icon: 'fa-linkedin' },
        { url: '#', icon: 'fa-github' }
      ],
    },
    {
      picture: ilyes,
      role: 'UI/UX & Front-end Dev',
      name: 'IZEMMOUREN ILYES',
      socialLinks: [
        { url: '#', icon: 'fa-linkedin' },
        { url: '#', icon: 'fa-dribbble' }
      ],
    },
    {
      picture: moatassim,
      role: 'BACK-END Dev',
      name: 'MOURKSI MOATASSAM',
      socialLinks: [
        { url: '#', icon: 'fa-linkedin' },
        { url: '#', icon: 'fa-dribbble' }
      ],
    },{
      picture: meftah,
      role: 'BACK-END Dev',
      name: 'MEFTAH MOHAMED',
      socialLinks: [
        { url: '#', icon: 'fa-linkedin' },
        { url: '#', icon: 'fa-dribbble' }
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