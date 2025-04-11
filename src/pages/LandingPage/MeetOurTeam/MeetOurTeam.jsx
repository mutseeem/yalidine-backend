import React from 'react';
import styles from './MeetOurTeam.module.css';
import Profile from './Profile'; // Import the Profile component
import {ilyes} from '../../../assets/images/images'; // Import the image from assets

const MeetOurTeam = () => {
  const teamMembers = [
    {
      picture: ilyes, // Replace with actual image path
      role: 'UI/UX & Front-end',
      name: 'Ilyes Izemmouren',
      socialLinks: [
        { url: 'https://www.linkedin.com/in/ilyes/', icon: 'fa-linkedin' },
        { url: 'https://www.facebook.com/ilyes/', icon: 'fa-facebook' },
      ],
    },
    // Add more team members as needed
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