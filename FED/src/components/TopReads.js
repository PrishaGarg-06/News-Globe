import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { AuthContext } from '../context/authContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faBookmark, faClock, faNewspaper, faHeart } from '@fortawesome/free-solid-svg-icons';
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
    flexDirection: 'column',
    '&:hover': {
      transform: 'translateY(-5px)'
    }
  },

  cardImage: {
    width: '100%',
    height: '200px',
    objectFit: 'cover'
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
    marginBottom: '10px',
    color: '#333',
    textDecoration: 'none'
  },

  cardDescription: {
    fontSize: '0.95rem',
    color: '#666',
    marginBottom: '15px',
    flex: 1
  },

  cardMeta: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '0.9rem',
    color: '#888',
    marginTop: 'auto',
    paddingTop: '15px',
    borderTop: '1px solid #eee'
  },

  cardActions: {
    display: 'flex',
    gap: '15px'
  },

  actionIcon: {
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    color: '#b2bec3',
    '&:hover': {
      transform: 'scale(1.1)'
    }
  },

  loadMore: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '40px'
  },

  loadMoreBtn: {
    padding: '12px 30px',
    fontSize: '1rem',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '25px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: '#0056b3',
      transform: 'translateY(-2px)'
    }
  },

  loading: {
    textAlign: 'center',
    padding: '40px',
    fontSize: '1.2rem',
    color: '#666'
  },

  error: {
    textAlign: 'center',
    padding: '40px',
    color: '#dc3545',
    fontSize: '1.1rem'
  }
};

const TopReads = () => {
  const [topReads, setTopReads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [likedArticles, setLikedArticles] = useState({});
  const [bookmarkedArticles, setBookmarkedArticles] = useState({});

  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      const fetchBookmarkStates = async () => {
        try {
          const res = await fetch("/api/bookmarks", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          
          if (!res.ok) throw new Error("Failed to fetch bookmarks");
          
          const data = await res.json();
          const bookmarkStates = {};
          data.forEach(bookmark => {
            bookmarkStates[bookmark.url] = true;
          });
          
          setBookmarkedArticles(bookmarkStates);
        } catch (error) {
          console.error("Error fetching bookmarks:", error.message);
        }
      };

      fetchBookmarkStates();
    } else {
      setBookmarkedArticles({});
    }
  }, [isAuthenticated]);

  const handleLike = async (articleUrl) => {
    if (!isAuthenticated) {
      alert("You need to log in to like an article.");
      return;
    }

    setLikedArticles(prev => ({
      ...prev,
      [articleUrl]: !prev[articleUrl]
    }));

    try {
      const res = await fetch("/api/like", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ 
          articleId: articleUrl,
          url: articleUrl 
        }),
      });

      if (!res.ok) throw new Error("Failed to like article");
    } catch (error) {
      console.error("Error liking article:", error.message);
      setLikedArticles(prev => ({
        ...prev,
        [articleUrl]: !prev[articleUrl]
      }));
    }
  };

  const handleBookmark = async (articleUrl) => {
    if (!isAuthenticated) {
      alert("You need to log in to save an article.");
      return;
    }

    const isCurrentlyBookmarked = bookmarkedArticles[articleUrl];
    
    try {
      const res = await fetch("/api/bookmarks", {
        method: isCurrentlyBookmarked ? "DELETE" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ 
          articleId: articleUrl,
          url: articleUrl,
          title: topReads.find(article => article.url === articleUrl)?.title
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to update bookmark");
      }

      setBookmarkedArticles(prev => {
        const newState = { ...prev };
        if (isCurrentlyBookmarked) {
          delete newState[articleUrl];
        } else {
          newState[articleUrl] = true;
        }
        return newState;
      });

    } catch (error) {
      console.error("Error updating bookmark:", error.message);
      alert("Failed to update bookmark. Please try again.");
    }
  };

  const fetchTopReads = async (pageNum = 1, reset = false) => {
    setLoading(true);
    setError(null);

    const limit = !isAuthenticated ? '&limit=10' : '';
    const url = `/api/topreads/topreads?page=${pageNum}${limit}`;

    try {
      const res = await fetch(url, {
        headers: isAuthenticated
          ? { Authorization: `Bearer ${localStorage.getItem('token')}` }
          : {},
      });
      if (!res.ok) throw new Error('Failed to fetch top reads');
      const data = await res.json();

      setTotalResults(data.totalResults || 0);
      setTopReads((prev) => (reset ? data.articles || [] : [...prev, ...(data.articles || [])]));
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    if (!isAuthenticated) {
      alert('You need to log in to load more articles.');
      navigate('/login');
      return;
    }
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    fetchTopReads(page, page === 1);
  }, [page]);

  return (
    <section style={styles.section}>
      <Navbar dark />
      <div style={styles.container}>
        <motion.div 
          style={styles.header}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 style={styles.title}>Top Reads</h1>
          <p style={styles.subtitle}>
            Discover the most engaging and popular articles from around the globe
          </p>
        </motion.div>

        {loading && (
          <div style={styles.loading}>
            <FontAwesomeIcon icon={faNewspaper} spin /> Loading top reads...
          </div>
        )}
        
        {error && <div style={styles.error}>Error: {error}</div>}
        
        {!loading && !error && topReads.length === 0 && (
          <div style={styles.loading}>No top reads available</div>
        )}
        
        {!loading && !error && topReads.length > 0 && (
          <>
            <div style={styles.grid}>
              {topReads.map((article, i) => (
                <motion.div 
                  key={i}
                  style={styles.card}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <img
                    src={article.urlToImage || '/default-image.jpg'}
                    alt={article.title || 'Top read image'}
                    style={styles.cardImage}
                    loading="lazy"
                  />
                  <div style={styles.cardContent}>
                    <a 
                      href={article.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={styles.cardTitle}
                    >
                      {article.title || 'No title available'}
                    </a>
                    <p style={styles.cardDescription}>
                      {article.description || 'No description available'}
                    </p>
                    <div style={styles.cardMeta}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <FontAwesomeIcon icon={faClock} />
                        <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                      </div>
                      <div style={styles.cardActions}>
                        <FontAwesomeIcon 
                          icon={faHeart} 
                          style={{
                            ...styles.actionIcon,
                            color: likedArticles[article.url] ? "#ff4757" : "#b2bec3"
                          }}
                          onClick={() => handleLike(article.url)}
                          title="Like"
                        />
                        <FontAwesomeIcon 
                          icon={faBookmark} 
                          style={{
                            ...styles.actionIcon,
                            color: bookmarkedArticles[article.url] ? "#2e86de" : "#b2bec3"
                          }}
                          onClick={() => handleBookmark(article.url)}
                          title="Bookmark"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {Array.isArray(topReads) && topReads.length < totalResults && (
              <div style={styles.loadMore}>
                <motion.button 
                  style={styles.loadMoreBtn}
                  onClick={loadMore}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Load More
                </motion.button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default TopReads;

