import React from 'react';
import styles from './ContactUs.module.css';

const ContactUs = () => {
  return (
    <section className={styles.contactSection}>
      {/* Header and Intro Text */}
      <div className={styles.headerContainer}>
        <h2 className={styles.title}>CONTACT</h2>
        <p className={styles.subtitle}>
          We'd love to hear from you! Reach out to us using the form below or visit us in person.
        </p>
      </div>

      {/* Contact Form */}
      <div className={styles.formContainer}>
        <form className={styles.contactForm}>
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Message" rows="5" required></textarea>
          <button type="submit" className={styles.submitButton}>
            Send Message
          </button>
        </form>
      </div>

      {/* Google Maps Section */}
      <div className={styles.mapContainer}>
        <iframe
          title="Google Maps Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.853737150717!2d77.64149631430445!3d12.971598718575877!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b34a8d%3A0x21f430c6a6f5470!2sYour%20Building%20Name!5e0!3m2!1sen!2sin!4v1699887140700!5m2!1sen!2sin"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      {/* Footer-Like Section */}
      <footer className={styles.footer}>
        <div className={styles.socialLinks}>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="tel:+1234567890">
            <i className="fas fa-phone"></i>
          </a>
        </div>
        <p className={styles.footerText}>
          &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </p>
      </footer>
    </section>
  );
};

export default ContactUs;