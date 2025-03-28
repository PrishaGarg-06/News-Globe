import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/authContext';
import Navbar from './Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faClock, faNewspaper, faExternalLinkAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';

const styles = {
  section: {
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
    padding: '80px 20px 40px'
  },

  container: {
    maxWidth: '1400px',
    margin: '0 auto'
  },

  header: {
    textAlign: 'center',
    marginBottom: '40px'
  },

  title: {
    fontSize: '2.5rem',
    color: '#333',
    marginBottom: '15px',
    fontWeight: '700'
  },

  subtitle: {
    fontSize: '1.1rem',
    color: '#666',
    maxWidth: '600px',
    margin: '0 auto'
  },

  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '25px',
    padding: '20px 0'
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    transition: 'transform 0.3s ease',
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },

  cardContent: {
    padding: '20px',
    flex: 1,
    display: 'flex',
    flexDirection: 'column'
  },

  cardTitle: {
    fontSize: '1.2rem',
    fontWeight: '600',
    marginBottom: '15px',
    color: '#333',
    textDecoration: 'none',
    display: '-webkit-box',
    '-webkit-line-clamp': '2',
    '-webkit-box-orient': 'vertical',
    overflow: 'hidden'
  },

  cardActions: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 20px',
    borderTop: '1px solid #eee',
    backgroundColor: '#f8f9fa'
  },

  actionButton: {
    padding: '8px 15px',
    borderRadius: '20px',
    border: 'none',
    backgroundColor: '#007bff',
    color: '#fff',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '0.9rem',
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: '#0056b3'
    }
  },

  deleteButton: {
    backgroundColor: 'transparent',
    color: '#dc3545',
    border: '1px solid #dc3545',
    '&:hover': {
      backgroundColor: '#dc3545',
      color: '#fff'
    }
  },

  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px',
    gap: '20px'
  },

  loadingSpinner: {
    display: 'inline-block',
    width: '50px',
    height: '50px',
    border: '3px solid rgba(0, 123, 255, 0.1)',
    borderRadius: '50%',
    borderTop: '3px solid #007bff',
    animation: 'spin 1s linear infinite',
    marginBottom: '20px'
  },

  loadingText: {
    fontSize: '1.2rem',
    color: '#666',
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },

  emptyState: {
    textAlign: 'center',
    padding: '60px 20px',
    color: '#666'
  },

  emptyIcon: {
    fontSize: '3rem',
    color: '#007bff',
    marginBottom: '20px'
  },

  emptyText: {
    fontSize: '1.2rem',
    marginBottom: '20px'
  }
};

const Bookmarks = () => {
  const [bookmarkedArticles, setBookmarkedArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchBookmarkedArticles = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch('/api/bookmarks', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!res.ok) throw new Error('Failed to fetch bookmarked articles');
        const data = await res.json();
        setBookmarkedArticles(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarkedArticles();
  }, [isAuthenticated]);

  const handleRemoveBookmark = async (url) => {
    try {
      const res = await fetch('/api/bookmarks', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ url })
      });

      if (!res.ok) throw new Error('Failed to remove bookmark');

      setBookmarkedArticles(prev => prev.filter(article => article.url !== url));
    } catch (error) {
      console.error('Error removing bookmark:', error);
      alert('Failed to remove bookmark. Please try again.');
    }
  };

  return (
    <section style={styles.section}>
      <Navbar dark />
      <div style={styles.container}>
        <motion.div 
          style={styles.header}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 style={styles.title}>Your Bookmarks</h1>
          <p style={styles.subtitle}>
            Access your saved articles anytime, anywhere
          </p>
        </motion.div>

        {loading && (
          <div style={styles.loadingContainer}>
            <div style={styles.loadingSpinner} />
            <div style={styles.loadingText}>
              <FontAwesomeIcon icon={faNewspaper} spin />
              Loading your bookmarks...
            </div>
          </div>
        )}

        {error && (
          <div style={styles.emptyState}>
            <FontAwesomeIcon icon={faBookmark} style={styles.emptyIcon} />
            <p style={styles.emptyText}>Error: {error}</p>
          </div>
        )}

        {!loading && !error && bookmarkedArticles.length === 0 && (
          <div style={styles.emptyState}>
            <FontAwesomeIcon icon={faBookmark} style={styles.emptyIcon} />
            <p style={styles.emptyText}>No bookmarked articles yet</p>
            <p>Start exploring and save articles you want to read later!</p>
          </div>
        )}

        {!loading && !error && bookmarkedArticles.length > 0 && (
          <div style={styles.grid}>
            {bookmarkedArticles.map((article, i) => (
              <motion.div 
                key={article.url}
                style={styles.card}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <div style={styles.cardContent}>
                  <h3 style={styles.cardTitle}>{article.title || 'Untitled Article'}</h3>
                  <div style={styles.cardActions}>
                    <a 
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={styles.actionButton}
                    >
                      <FontAwesomeIcon icon={faExternalLinkAlt} />
                      <span>Read Article</span>
                    </a>
                    <button 
                      onClick={() => handleRemoveBookmark(article.url)}
                      style={{...styles.actionButton, ...styles.deleteButton}}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Bookmarks;
