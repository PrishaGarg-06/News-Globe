import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faNewspaper, faBolt, faChartLine, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';

const styles = {
  section: {
    width: '100%',
    height: '100vh',
    backgroundImage: `linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7)), url(${require('../assets/images/mainbgimagePBL.jpg')})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    position: 'relative',
    overflow: 'hidden'
  },

  content: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 'calc(100vh - 80px)',
    padding: '0 5%'
  },

  textColumn: {
    flex: '0 0 50%',
    color: '#fff',
    paddingRight: '50px'
  },

  title: {
    fontSize: '4rem',
    fontWeight: '700',
    marginBottom: '20px',
    background: 'linear-gradient(45deg, #fff, #007bff)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
  },

  description: {
    fontSize: '1.2rem',
    lineHeight: '1.6',
    marginBottom: '30px',
    color: '#e0e0e0'
  },

  features: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '20px',
    marginTop: '40px'
  },

  featureCard: {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    padding: '20px',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    transition: 'transform 0.3s ease',
    cursor: 'pointer',
    '&:hover': {
      transform: 'translateY(-5px)'
    }
  },

  featureIcon: {
    fontSize: '24px',
    color: '#007bff'
  },

  featureText: {
    fontSize: '1rem',
    color: '#fff'
  },

  cardsColumn: {
    flex: '0 0 45%',
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '20px',
    position: 'relative'
  },

  card: {
    height: '200px',
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    borderRadius: '15px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    overflow: 'hidden',
    position: 'relative',
    '&:hover': {
      transform: 'scale(1.05)',
      background: 'rgba(255, 255, 255, 0.2)'
    }
  },

  cardImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    opacity: 0.7,
    transition: 'opacity 0.3s ease'
  },

  cardOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.4)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0,
    transition: 'opacity 0.3s ease',
    '&:hover': {
      opacity: 1
    }
  },

  cardTitle: {
    color: '#fff',
    fontSize: '1.2rem',
    textAlign: 'center',
    padding: '20px'
  },

  scrollIndicator: {
    position: 'absolute',
    bottom: '30px',
    left: '50%',
    transform: 'translateX(-50%)',
    color: '#fff',
    textAlign: 'center'
  },

  scrollText: {
    fontSize: '14px',
    marginBottom: '10px'
  },

  scrollDot: {
    width: '8px',
    height: '8px',
    background: '#fff',
    borderRadius: '50%',
    animation: 'scrollBounce 2s infinite'
  },

  newsSection: {
    padding: '80px 0',
    background: '#fff'
  },

  sectionContainer: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '0 30px'
  },

  sectionTitle: {
    fontSize: '2.5rem',
    color: '#333',
    marginBottom: '40px',
    textAlign: 'center'
  },

  newsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '30px',
    marginTop: '40px'
  },

  newsCard: {
    background: '#fff',
    borderRadius: '15px',
    overflow: 'hidden',
    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
    transition: 'transform 0.3s ease',
    cursor: 'pointer',
    '&:hover': {
      transform: 'translateY(-10px)'
    }
  },

  newsImage: {
    width: '100%',
    height: '200px',
    objectFit: 'cover'
  },

  newsContent: {
    padding: '20px'
  },

  newsCategory: {
    color: '#007bff',
    fontSize: '0.9rem',
    fontWeight: '600',
    marginBottom: '10px',
    textTransform: 'uppercase'
  },

  newsTitle: {
    fontSize: '1.4rem',
    fontWeight: '600',
    marginBottom: '10px',
    color: '#333',
    lineHeight: '1.4'
  },

  newsExcerpt: {
    fontSize: '1rem',
    color: '#666',
    marginBottom: '15px',
    lineHeight: '1.6'
  },

  newsMeta: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '0.9rem',
    color: '#888'
  },

  statsSection: {
    padding: '80px 0',
    background: '#f8f9fa'
  },

  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '30px',
    textAlign: 'center'
  },

  statCard: {
    padding: '30px',
    background: '#fff',
    borderRadius: '15px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
  },

  statNumber: {
    fontSize: '2.5rem',
    fontWeight: '700',
    color: '#007bff',
    marginBottom: '10px'
  },

  statLabel: {
    fontSize: '1.1rem',
    color: '#666'
  },

  ctaSection: {
    padding: '100px 0',
    background: 'linear-gradient(45deg, #007bff, #00bcd4)',
    color: '#fff',
    textAlign: 'center'
  },

  ctaButton: {
    padding: '15px 40px',
    fontSize: '1.2rem',
    background: '#fff',
    color: '#007bff',
    border: 'none',
    borderRadius: '30px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'scale(1.05)',
      boxShadow: '0 5px 15px rgba(0,0,0,0.2)'
    }
  },

  ctaContent: {
    maxWidth: '800px',
    margin: '0 auto'
  },

  ctaDescription: {
    fontSize: '1.2rem',
    marginBottom: '30px',
    color: 'rgba(255, 255, 255, 0.9)'
  },

  ctaButtons: {
    display: 'flex',
    gap: '20px',
    justifyContent: 'center'
  }
};

const cardImages = [
  require('../assets/images/politics.jpg'),
  require('../assets/images/sports.jpg'),
  require('../assets/images/entertainment.jpg'),
  require('../assets/images/business.jpg')
];

const cardTitles = ['Politics', 'Sports', 'Entertainment', 'Business'];

const latestNews = [
  {
    id: 1,
    title: "Global Climate Summit Reaches Historic Agreement",
    category: "Environment",
    image: require('../assets/images/climate.jpg'),
    excerpt: "World leaders have reached a landmark decision to reduce global emissions by 50% by 2030...",
    date: "March 15, 2024",
    readTime: "5 min read"
  },
  {
    id: 2,
    title: "Tech Giants Announce Revolutionary AI Partnership",
    category: "Technology",
    image: require('../assets/images/tech.jpg'),
    excerpt: "Leading tech companies join forces to develop ethical AI guidelines and shared resources...",
    date: "March 14, 2024",
    readTime: "4 min read"
  },
  {
    id: 3,
    title: "Breakthrough in Renewable Energy Storage",
    category: "Science",
    image: require('../assets/images/energy.jpg'),
    excerpt: "Scientists develop new battery technology that could revolutionize renewable energy storage...",
    date: "March 13, 2024",
    readTime: "6 min read"
  }
];

const Home = () => {
  const [showScroll, setShowScroll] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setShowScroll(scrollPosition < 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <section style={styles.section}>
        <Navbar />
        
        <motion.div 
          style={styles.content}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div style={styles.textColumn}>
            <motion.h1 
              style={styles.title}
              initial={{ x: -50 }}
              animate={{ x: 0 }}
              transition={{ delay: 0.2 }}
            >
              THE NEWS GLOBE
            </motion.h1>
            <motion.p 
              style={styles.description}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Get news headlines from all around the world. Today's breaking news on politics,
              sports, entertainment, business, lifestyle, and many more on The News Globe.
            </motion.p>

            <div style={styles.features}>
              <motion.div 
                style={styles.featureCard}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FontAwesomeIcon icon={faGlobe} style={styles.featureIcon} />
                <span style={styles.featureText}>Global Coverage</span>
              </motion.div>
              <motion.div 
                style={styles.featureCard}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FontAwesomeIcon icon={faBolt} style={styles.featureIcon} />
                <span style={styles.featureText}>Real-time Updates</span>
              </motion.div>
              <motion.div 
                style={styles.featureCard}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FontAwesomeIcon icon={faNewspaper} style={styles.featureIcon} />
                <span style={styles.featureText}>Trusted Sources</span>
              </motion.div>
              <motion.div 
                style={styles.featureCard}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FontAwesomeIcon icon={faChartLine} style={styles.featureIcon} />
                <span style={styles.featureText}>Trending Topics</span>
              </motion.div>
            </div>
          </div>

          <div style={styles.cardsColumn}>
            {[0, 1, 2, 3].map((index) => (
              <motion.div
                key={index}
                style={styles.card}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <img 
                  src={cardImages[index]} 
                  alt={cardTitles[index]}
                  style={styles.cardImage}
                />
                <div style={styles.cardOverlay}>
                  <h3 style={styles.cardTitle}>{cardTitles[index]}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <AnimatePresence>
          {showScroll && (
            <motion.div 
              style={styles.scrollIndicator}
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <div style={styles.scrollText}>Scroll to explore</div>
              <div style={styles.scrollDot} />
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Latest News Section */}
      <section style={styles.newsSection}>
        <div style={styles.sectionContainer}>
          <motion.h2 
            style={styles.sectionTitle}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Latest Headlines
          </motion.h2>
          <div style={styles.newsGrid}>
            {latestNews.map((news, index) => (
              <motion.div 
                key={news.id}
                style={styles.newsCard}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <img src={news.image} alt={news.title} style={styles.newsImage} />
                <div style={styles.newsContent}>
                  <div style={styles.newsCategory}>{news.category}</div>
                  <h3 style={styles.newsTitle}>{news.title}</h3>
                  <p style={styles.newsExcerpt}>{news.excerpt}</p>
                  <div style={styles.newsMeta}>
                    <span>{news.date}</span>
                    <span>{news.readTime}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={styles.statsSection}>
        <div style={styles.sectionContainer}>
          <div style={styles.statsGrid}>
            {[
              { number: '10M+', label: 'Daily Readers' },
              { number: '150+', label: 'Countries Covered' },
              { number: '24/7', label: 'News Updates' },
              { number: '500+', label: 'Trusted Sources' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                style={styles.statCard}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div style={styles.statNumber}>{stat.number}</div>
                <div style={styles.statLabel}>{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section style={styles.ctaSection}>
        <div style={styles.sectionContainer}>
          <div style={styles.ctaContent}>
            <motion.h2 
              style={styles.sectionTitle}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Stay Informed with The News Globe
            </motion.h2>
            <motion.p
              style={styles.ctaDescription}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Join millions of readers worldwide who trust The News Globe for accurate, timely, and unbiased news coverage.
            </motion.p>
            <div style={styles.ctaButtons}>
              <motion.button 
                style={styles.ctaButton}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started <FontAwesomeIcon icon={faArrowRight} />
              </motion.button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
