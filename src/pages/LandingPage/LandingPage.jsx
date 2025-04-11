import React from 'react';
import { useInView } from 'react-intersection-observer';
import styles from './LandingPage.module.css';
import Navbar from './Navbar/Navbar';
import HeroSection from './HeroSection/HeroSection';
import RnaqSection from './RnaqSection/RnaqSection';
import Domains from './DomainSection/Domains'; // Import the new Domains component
import MeetOurTeam from './MeetOurTeam/MeetOurTeam'; // Import the MeetOurTeam component

const LandingPage = () => {
  const [heroRef, heroInView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [meetOurTeamRef, meetOurTeamInView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  
  const [rnaqRef, rnaqInView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <div className={styles.container}>
      <Navbar />

      <div ref={heroRef}>
        <HeroSection />
      </div>

      <div ref={rnaqRef}>
        <RnaqSection />
      </div>

      {/* Add the Domains section */}
      <Domains />

      <div ref={meetOurTeamRef}>
        <MeetOurTeam />
      </div>
    </div>
  );
};

export default LandingPage;