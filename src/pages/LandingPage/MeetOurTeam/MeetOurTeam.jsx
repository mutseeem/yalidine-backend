import React from 'react';
import styles from './MeetOurTeam.module.css';
import Profile from './Profile'; // Import the Profile component
import { ilyes , moatassim ,amine ,ramdani} from '../../../assets/images/images'; // Import the image from assets


const MeetOurTeam = () => {
  const teamMembers = [
    {
      picture: amine, // Replace with actual image path
      role: 'UI/UX & Front-end',
      name: 'CHABI AMINE',
      socialLinks: [
        { url: 'https://www.linkedin.com/in/amine/', icon: 'fa-linkedin' },
        { url: 'https://www.facebook.com/amine/', icon: 'fa-facebook' },
      ],
    },
    {
      picture: ilyes, // Replace with actual image path
      role: 'UI/UX & Front-end',
      name: 'IZEMMOUREN ILYES',
      socialLinks: [
        { url: 'https://www.linkedin.com/in/ilyes/', icon: 'fa-linkedin' },
        { url: 'https://www.facebook.com/ilyes/', icon: 'fa-facebook' },
      ],
    },
    {
      picture: moatassim, // Replace with actual image path
      role: 'UI/UX & Front-end',
      name: 'MOURKSI MOATASSIM',
      socialLinks: [
        { url: 'https://www.linkedin.com/in/ilyes/', icon: 'fa-linkedin' },
        { url: 'https://www.facebook.com/ilyes/', icon: 'fa-facebook' },
      ],
    },
    {
      picture: ramdani, // Replace with actual image path
      role: 'Supervisor',
      name: 'RAMDANI MOHAMED',
      socialLinks: [
        { url: 'https://www.linkedin.com/in/ilyes/', icon: 'fa-linkedin' },
        { url: 'https://www.facebook.com/ilyes/', icon: 'fa-facebook' },
      ],
    },
    {
      picture: ilyes, // Replace with actual image path
      role: 'UI/UX & Front-end',
      name: 'IZEMMOUREN ILYES',
      socialLinks: [
        { url: 'https://www.linkedin.com/in/ilyes/', icon: 'fa-linkedin' },
        { url: 'https://www.facebook.com/ilyes/', icon: 'fa-facebook' },
      ],
    },
    {
      picture: ilyes, // Replace with actual image path
      role: 'UI/UX & Front-end',
      name: 'IZEMMOUREN ILYES',
      socialLinks: [
        { url: 'https://www.linkedin.com/in/ilyes/', icon: 'fa-linkedin' },
        { url: 'https://www.facebook.com/ilyes/', icon: 'fa-facebook' },
      ],
    },
  ];

  return (
    <section className={styles.meetOurTeamSection}>
      <h2 className={styles.title}>MEET OUR TEAM</h2>
      <div className={styles.teamGrid}>
        {teamMembers.map((member, index) => (
          <Profile
            key={index}
            picture={member.picture}
            role={member.role}
            name={member.name}
            socialLinks={member.socialLinks}
          />
        ))}
      </div>
    </section>
  );
};

export default MeetOurTeam;