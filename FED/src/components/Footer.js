import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPhone, faEnvelope, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faFacebook, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const styles = {
  footer: {
    backgroundColor: '#1a1a1a',
    color: '#fff',
    padding: '40px 0 20px',
    marginTop: 'auto'
  },

  container: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '0 30px'
  },

  boxContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '30px',
    marginBottom: '30px'
  },

  box: {
    padding: '15px'
  },

  heading: {
    fontSize: '20px',
    fontWeight: '600',
    marginBottom: '20px',
    position: 'relative',
    paddingBottom: '8px',
    '&::after': {
      content: '""',
      position: 'absolute',
      left: 0,
      bottom: 0,
      width: '40px',
      height: '2px',
      backgroundColor: '#007bff'
    }
  },

  aboutText: {
    fontSize: '14px',
    lineHeight: '1.5',
    color: '#b3b3b3',
    marginBottom: '15px'
  },

  linksList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },

  footerLink: {
    color: '#b3b3b3',
    textDecoration: 'none',
    fontSize: '14px',
    transition: 'color 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    '&:hover': {
      color: '#007bff'
    }
  },

  locationItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: '#b3b3b3',
    marginBottom: '10px',
    fontSize: '14px'
  },

  socialLinks: {
    display: 'flex',
    gap: '12px',
    marginTop: '15px'
  },

  socialIcon: {
    color: '#b3b3b3',
    fontSize: '18px',
    transition: 'all 0.3s ease',
    '&:hover': {
      color: '#007bff',
      transform: 'translateY(-2px)'
    }
  },

  copyright: {
    textAlign: 'center',
    borderTop: '1px solid #333',
    paddingTop: '20px',
    color: '#b3b3b3',
    fontSize: '13px'
  }
};

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.boxContainer}>
          <div style={styles.box}>
            <h3 style={styles.heading}>About Us</h3>
            <p style={styles.aboutText}>
              The News Globe delivers accurate, timely news with integrity and adherence to journalistic principles.
            </p>
            <div style={styles.socialLinks}>
              <FontAwesomeIcon icon={faTwitter} style={styles.socialIcon} />
              <FontAwesomeIcon icon={faFacebook} style={styles.socialIcon} />
              <FontAwesomeIcon icon={faInstagram} style={styles.socialIcon} />
              <FontAwesomeIcon icon={faLinkedin} style={styles.socialIcon} />
            </div>
          </div>

          <div style={styles.box}>
            <h3 style={styles.heading}>Quick Links</h3>
            <div style={styles.linksList}>
              <Link to="/" style={styles.footerLink}>
                <FontAwesomeIcon icon={faGlobe} />
                <span>Home</span>
              </Link>
              <Link to="/news" style={styles.footerLink}>
                <FontAwesomeIcon icon={faGlobe} />
                <span>News</span>
              </Link>
              <Link to="/topreads" style={styles.footerLink}>
                <FontAwesomeIcon icon={faGlobe} />
                <span>Top Reads</span>
              </Link>
            </div>
          </div>

          <div style={styles.box}>
            <h3 style={styles.heading}>Our Locations</h3>
            <div style={styles.linksList}>
              <div style={styles.locationItem}>
                <FontAwesomeIcon icon={faMapMarkerAlt} />
                <span>Delhi</span>
              </div>
              <div style={styles.locationItem}>
                <FontAwesomeIcon icon={faMapMarkerAlt} />
                <span>Mumbai</span>
              </div>
              <div style={styles.locationItem}>
                <FontAwesomeIcon icon={faMapMarkerAlt} />
                <span>Bangalore</span>
              </div>
              <div style={styles.locationItem}>
                <FontAwesomeIcon icon={faMapMarkerAlt} />
                <span>Punjab</span>
              </div>
              <div style={styles.locationItem}>
                <FontAwesomeIcon icon={faMapMarkerAlt} />
                <span>West Bengal</span>
              </div>
            </div>
          </div>

          <div style={styles.box}>
            <h3 style={styles.heading}>Contact Info</h3>
            <div style={styles.linksList}>
              <div style={styles.locationItem}>
                <FontAwesomeIcon icon={faPhone} />
                <span>+91 6753969735</span>
              </div>
              <div style={styles.locationItem}>
                <FontAwesomeIcon icon={faEnvelope} />
                <span>thenewsglobe@gmail.com</span>
              </div>
              <div style={styles.locationItem}>
                <FontAwesomeIcon icon={faMapMarkerAlt} />
                <span>Mumbai, India - 400104</span>
              </div>
            </div>
          </div>
        </div>

        <div style={styles.copyright}>
          <p>© 2024 The News Globe. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
