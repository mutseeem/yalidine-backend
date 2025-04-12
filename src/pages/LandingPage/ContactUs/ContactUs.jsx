import React, { useState } from 'react';
import styles from './ContactUs.module.css';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitSuccess(false), 3000);
    }, 1500);
  };

  return (
    <section className={styles.contactSection}>
      {/* Animated Header Section */}
      <div className={styles.headerContainer}>
        <div className={styles.titleWrapper}>
          <h2 className={styles.title}>GET IN TOUCH</h2>
          <div className={styles.underline}></div>
        </div>
        <p className={styles.subtitle}>
          We'd love to hear from you! Whether you have questions or just want to say hello, our team is ready to assist you.
        </p>
      </div>

      {/* Main Content Grid */}
      <div className={styles.contentGrid}>
        {/* Contact Form with Floating Labels */}
        <div className={styles.formContainer}>
          <form className={styles.contactForm} onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                required 
              />
              <label>Your Name</label>
              <span className={styles.inputBar}></span>
            </div>
            
            <div className={styles.inputGroup}>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                required 
              />
              <label>Your Email</label>
              <span className={styles.inputBar}></span>
            </div>
            
            <div className={styles.inputGroup}>
              <textarea 
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5" 
                required
              ></textarea>
              <label>Your Message</label>
              <span className={styles.inputBar}></span>
            </div>
            
            <button 
              type="submit" 
              className={`${styles.submitButton} ${isSubmitting ? styles.loading : ''}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className={styles.spinner}></span>
              ) : (
                'Send Message'
              )}
            </button>
            
            {submitSuccess && (
              <div className={styles.successMessage}>
                <i className="fas fa-check-circle"></i>
                Message sent successfully!
              </div>
            )}
          </form>
        </div>

        {/* Contact Info and Map */}
        <div className={styles.infoContainer}>
          {/* Contact Cards */}
          <div className={styles.contactCards}>
            <div className={styles.contactCard}>
              <div className={styles.cardIcon}>
                <i className="fas fa-map-marker-alt"></i>
              </div>
              <div className={styles.cardContent}>
                <h3>Our Location</h3>
                <p>123 Business Avenue<br />Tech City, TC 10001</p>
              </div>
            </div>
            
            <div className={styles.contactCard}>
              <div className={styles.cardIcon}>
                <i className="fas fa-phone-alt"></i>
              </div>
              <div className={styles.cardContent}>
                <h3>Call Us</h3>
                <p>+1 (555) 123-4567<br />Mon-Fri, 9am-5pm</p>
              </div>
            </div>
            
            <div className={styles.contactCard}>
              <div className={styles.cardIcon}>
                <i className="fas fa-envelope"></i>
              </div>
              <div className={styles.cardContent}>
                <h3>Email Us</h3>
                <p>info@yourcompany.com<br />support@yourcompany.com</p>
              </div>
            </div>
          </div>

          {/* Interactive Map */}
          <div className={styles.mapContainer}>
            <iframe
              title="Google Maps Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.853737150717!2d77.64149631430445!3d12.971598718575877!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b34a8d%3A0x21f430c6a6f5470!2sYour%20Building%20Name!5e0!3m2!1sen!2sin!4v1699887140700!5m2!1sen!2sin"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>

      {/* Premium Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerLogo}>
            <span>DIGIQA</span>
            <span></span>
          </div>
          
          <div className={styles.footerLinks}>
            <a href="/about">About Us</a>
            <a href="/services">Services</a>
            <a href="/careers">Careers</a>
            <a href="/blog">Blog</a>
            <a href="/contact">Contact</a>
          </div>
          
          <div className={styles.socialLinks}>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
        
        <div className={styles.footerBottom}>
          <p>&copy; {new Date().getFullYear()} DIGIQA. All rights reserved.</p>
          <div className={styles.legalLinks}>
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms of Service</a>
            <a href="/cookies">Cookie Policy</a>
          </div>
        </div>
      </footer>
    </section>
  );
};

export default ContactUs;