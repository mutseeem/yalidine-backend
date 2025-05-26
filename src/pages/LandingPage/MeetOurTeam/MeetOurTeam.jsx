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
        { url: 'https://www.linkedin.com/in/laid-kahloul-85768245/', icon: 'fa-linkedin' },
        { url: 'https://www.facebook.com/kahloul.laid', icon: 'fa-facebook' }
      ],
    },
    {
      picture: ramdani,
      role: 'Supervisor',
      name: 'Dr.RAMDANI MOHAMED',
      socialLinks: [
        { url: 'https://www.linkedin.com/in/mohamed-ramdani-cazador2009/', icon: 'fa-linkedin' },
        { url: 'https://www.facebook.com/mohamed.ramdani.772662', icon: 'fa-facebook' }
      ],
    },
    {
      picture: amine,
      role: 'Supervisor',
      name: 'CHABI AMINE',
      socialLinks: [
        { url: 'https://www.linkedin.com/in/amine-chabi-a90b7822a/', icon: 'fa-linkedin' },
        { url: 'https://github.com/Amine2000s', icon: 'fa-github' },
      ],
    },
    {
      picture: meftah,
      role: 'BACK-END Dev',
      name: 'MEFTAH MOHAMED',
      socialLinks: [
        { url: 'https://github.com/hama-Key', icon: 'fa-github' },
        { url: 'https://www.facebook.com/mohamed.meftah.882820', icon: 'fa-facebook' }
      ],
    },
    {
      picture: moatassim,
      role: 'BACK-END Dev',
      name: 'MOURKSI MOATASSAM',
      socialLinks: [
        { url: 'https://github.com/mutseeem', icon: 'fa-github' },
        { url: 'https://www.linkedin.com/in/el-moatassam-mourksi-55908a320/', icon: 'fa-linkedin' }
      ],
    },
    {
      picture: ilyes,
      role: 'UI/UX & Front-end Dev',
      name: 'IZEMMOUREN ILYES',
      socialLinks: [
        { url: 'https://www.linkedin.com/in/ilyes-izemmouren-901798337/', icon: 'fa-linkedin' },
        { url: 'https://github.com/Ilyes0izmr', icon: 'fa-github' }
      ],
    },
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