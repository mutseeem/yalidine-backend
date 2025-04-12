import React from 'react';
import { useInView } from 'react-intersection-observer';
import styles from './LandingPage.module.css';
import Navbar from './Navbar/Navbar';
import HeroSection from './HeroSection/HeroSection';
import RnaqSection from './RnaqSection/RnaqSection';
import Domains from './DomainSection/Domains'; // Import the new Domains component
import MeetOurTeam from './MeetOurTeam/MeetOurTeam'; // Import the MeetOurTeam component
import ContactUs from './ContactUs/ContactUs'; // Import the ContactUs component

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
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <div id="home" ref={heroRef}>
        <HeroSection />
      </div>

      {/* RNAQ Section */}
      <div id="about" ref={rnaqRef}>
        <RnaqSection />
      </div>

      {/* Domains Section */}
      <div id="domains">
        <Domains />
      </div>

      {/* Meet Our Team Section */}
      <div id="devs" ref={meetOurTeamRef}>
        <MeetOurTeam />
      </div>

      {/* Contact Us Section */}
      <div id="contact">
        <ContactUs />
      </div>

      {/* FAQ Section (Placeholder) 
      <div id="faq">
        <h2>Frequently Asked Questions</h2>
        <p>Answers to common questions go here.</p>
      </div>
      */}
    </div>
  );
};

export default LandingPage;
