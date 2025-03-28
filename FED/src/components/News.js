import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { AuthContext } from '../context/authContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faBookmark ,faHeart, faNewspaper } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';

const styles = {
  newsSection: {
    padding: '80px 20px 20px',
    backgroundColor: '#f5f5f5',
    minHeight: '100vh'
  },
  
  navBar: {
    backgroundColor: '#fff',
    padding: '15px 0',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    marginBottom: '20px',
    borderRadius: '8px'
  },
  
  categoryList: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '15px',
    listStyle: 'none',
    padding: '0'
  },
  
  categoryItem: {
    padding: '8px 16px',
    cursor: 'pointer',
    borderRadius: '20px',
    transition: 'all 0.3s ease',
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    '&:hover': {
      backgroundColor: '#007bff',
      color: '#fff'
    }
  },
  
  searchContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '30px'
  },
  
  searchForm: {
    display: 'flex',
    gap: '10px',
    maxWidth: '600px',
    width: '100%'
  },
  
  searchInput: {
    flex: 1,
    padding: '12px 20px',
    borderRadius: '25px',
    border: '1px solid #ddd',
    fontSize: '16px',
    '&:focus': {
      outline: 'none',
      borderColor: '#007bff'
    }
  },
  
  button: {
    padding: '12px 24px',
    borderRadius: '25px',
    border: 'none',
    backgroundColor: '#007bff',
    color: '#fff',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: '#0056b3'
    }
  },
  
  bookmarkToggle: {
    padding: '12px 24px',
    borderRadius: '25px',
    border: '1px solid #007bff',
    backgroundColor: 'transparent',
    color: '#007bff',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: '#007bff',
      color: '#fff'
    },
    '&.active': {
      backgroundColor: '#007bff',
      color: '#fff'
    }
  },
  
  articlesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '25px',
    padding: '20px',
    width: '100%',
    maxWidth: '1400px',
    margin: '0 auto'
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
  
  cardLink: {
    textDecoration: 'none',
    color: 'inherit',
    flex: 1,
    display: 'flex',
    flexDirection: 'column'
  },
  
  cardImage: {
    width: '100%',
    height: '160px',
    objectFit: 'cover'
  },
  
  cardContent: {
    padding: '15px',
    flex: 1,
    display: 'flex',
    flexDirection: 'column'
  },
  
  cardTitle: {
    fontSize: '16px',
    marginBottom: '8px',
    color: '#333',
    display: '-webkit-box',
    '-webkit-line-clamp': '2',
    '-webkit-box-orient': 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    lineHeight: '1.3'
  },
  
  publishInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '12px',
    color: '#666',
    marginBottom: '10px'
  },
  
  description: {
    fontSize: '13px',
    color: '#666',
    lineHeight: '1.4',
    display: '-webkit-box',
    '-webkit-line-clamp': '3',
    '-webkit-box-orient': 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  
  newsActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '15px',
    padding: '10px 15px',
    borderTop: '1px solid #eee'
  },
  
  actionIcon: {
    fontSize: '20px',
    cursor: 'pointer',
    transition: 'transform 0.2s ease',
    '&:hover': {
      transform: 'scale(1.1)'
    }
  },
  
  loadMoreBtn: {
    display: 'block',
    margin: '30px auto',
    padding: '12px 40px',
    borderRadius: '25px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: '#0056b3'
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

  loadingGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '25px',
    padding: '20px',
    width: '100%',
    maxWidth: '1400px',
    margin: '0 auto'
  },

  loadingCard: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    height: '350px',
    animation: 'pulse 1.5s infinite'
  },

  '@keyframes spin': {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' }
  },

  '@keyframes pulse': {
    '0%': { opacity: 0.6 },
    '50%': { opacity: 0.8 },
    '100%': { opacity: 0.6 }
  },

  userGeneratedBadge: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '0.8rem',
    zIndex: 1
  }
};

const News = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('all');
  const [input, setInput] = useState('');
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { setIsAuthenticated, setUserId, isAuthenticated } = useContext(AuthContext)
  console.log("login Status: ", isAuthenticated)
  const [likedArticles, setLikedArticles] = useState({});
  const [bookmarkedArticles, setBookmarkedArticles] = useState({});



  const [loginMessage, setLoginMessage] = useState(''); // To display login warning

  const navigate = useNavigate();

  // Verify token on page load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Validate token with the backend
      fetch('/api/auth/verify-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.valid) {
            setIsAuthenticated(true); // Token is valid
          } else {
            localStorage.removeItem('token'); // Remove invalid token
            setIsAuthenticated(false);
          }
        })
        .catch(() => setIsAuthenticated(false)); // Handle errors
    }
  }, []);

  const fetchData = async (searchQuery, pageNum = 1, reset = false) => {
    setLoading(true);
    setError(null);
    setLoginMessage(''); // Reset login message

    const limit = !isAuthenticated ? '&limit=15' : ''; // Limit for unauthenticated users
    const url = `/api/news/articles?q=${searchQuery}&page=${pageNum}${limit}`;

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch news');
      const data = await res.json();

      setTotalResults(data.totalResults);
      setArticles((prev) => (reset ? data.articles : [...prev, ...data.articles]));
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      //setLoginMessage('You need to log in to search.');
      alert("You need to log in to search.");
      return;
    }
    if (input.trim()) {
      setQuery(input.trim());
      setPage(1);
      fetchData(input.trim(), 1, true);
    }
  };


  const handleRestrictedFeature = () => {
    if (!isAuthenticated) {
      alert("Please log in to access this feature.");
      navigate("/login");
    }
  };
  

  const handleCategoryClick = (category) => {
    if (!isAuthenticated) {
      //setLoginMessage('You need to log in to view this category.');
      alert("You need to log in to view this category.");
      return;
    }
    setQuery(category.toLowerCase());
    setPage(1);
    fetchData(category.toLowerCase(), 1, true);
  };

  const handleLike = async (articleUrl) => {
    if (!isAuthenticated) {
      alert("You need to log in to like an article.");
      return;
    }

    setLikedArticles((prev) => ({
      ...prev,
      [articleUrl]: !prev[articleUrl],
    }));
  
    try {
      const res = await fetch("http://localhost:5000/api/like", {
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
      setLikedArticles((prev) => ({
        ...prev,
        [articleUrl]: !prev[articleUrl],
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
          title: articles.find(article => article.url === articleUrl)?.title
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to update bookmark");
      }

      // If we're removing a bookmark and in bookmarked view, remove it from articles array too
      if (isCurrentlyBookmarked && isBookmarkedView) {
        setArticles(prevArticles => prevArticles.filter(article => article.url !== articleUrl));
      }

      setBookmarkedArticles(prev => {
        const newState = { ...prev };
        if (isCurrentlyBookmarked) {
          delete newState[articleUrl]; // Remove the bookmark entirely instead of setting to false
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


  const loadMore = () => {
    if (!isAuthenticated) {
      //setLoginMessage('You need to log in to load more articles.');
      alert("You need to log in to load more articles.");
      return;
    }
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    fetchData(query, page, page === 1);
  }, [query, page]);

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
          // Create a map of bookmarked URLs
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
      // Clear bookmarks when logged out
      setBookmarkedArticles({});
    }
  }, [isAuthenticated]);

  useEffect(() => {
    console.log("Bookmarked articles changed:", bookmarkedArticles);
  }, [bookmarkedArticles]);

  useEffect(() => {
    console.log("Liked articles changed:", likedArticles);
  }, [likedArticles]);

  // Update the filterRemovedArticles function
  const filterRemovedArticles = (articles, bookmarkedArticles, isBookmarkedView = false) => {
    return articles.filter(article => {
      // Filter out articles with invalid URLs or from removed.com
      if (!article.url || article.url.includes('removed.com')) {
        return false;
      }
      
      // Handle bookmarked view filtering
      if (isBookmarkedView) {
        return bookmarkedArticles[article.url];
      }
      
      return true;
    });
  };

  // Add a state to track if we're viewing bookmarks
  const [isBookmarkedView, setIsBookmarkedView] = useState(false);

  // Add a toggle for bookmarked view
  const toggleBookmarkedView = () => {
    setIsBookmarkedView(prev => !prev);
    if (!isBookmarkedView) {
      // When switching to bookmarked view, filter articles to show only bookmarked ones
      setArticles(articles.filter(article => bookmarkedArticles[article.url]));
    } else {
      // When switching back to normal view, fetch all articles again
      fetchData(query, 1, true);
    }
  };

  return (
    <section className="news" id="news" style={styles.newsSection}>
      <Navbar dark />
      <div style={styles.navBar}>
        <nav className="desktop">
          <ul style={styles.categoryList}>
            {['World', 'Science', 'Technology', 'Business', 'Education', 'Sports', 'Entertainment', 'Politics'].map(
              (category) => (
                <li 
                  key={category} 
                  onClick={() => handleCategoryClick(category)}
                  style={styles.categoryItem}
                >
                  {category}
                </li>
              )
            )}
          </ul>
        </nav>
      </div>

      <div style={styles.searchContainer}>
        <form id="searchForm" onSubmit={handleSearch} style={styles.searchForm}>
          <input
            type="text"
            placeholder="Type to search..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={styles.searchInput}
          />
          <button type="submit" style={styles.button}>Search</button>
        </form>
        {isAuthenticated && (
          <button 
            onClick={toggleBookmarkedView}
            style={{
              ...styles.bookmarkToggle,
              ...(isBookmarkedView && styles.bookmarkToggle['&.active'])
            }}
          >
            {isBookmarkedView ? 'Show All Articles' : 'Show Bookmarked'}
          </button>
        )}
      </div>

      {loginMessage && <p className="login-message">{loginMessage}</p>}

      <main>
        {loading && (
          <div style={styles.loadingContainer}>
            <div style={styles.loadingSpinner} />
            <div style={styles.loadingText}>
              <FontAwesomeIcon 
                icon={faNewspaper} 
                spin 
                style={{ color: '#007bff' }}
              />
              Loading articles...
            </div>
            <div style={styles.loadingGrid}>
              {[1, 2, 3, 4, 5, 6].map((index) => (
                <motion.div
                  key={index}
                  style={styles.loadingCard}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                />
              ))}
            </div>
          </div>
        )}
        {error && <p>Error: {error}</p>}
        {!loading && !error && articles.length === 0 && <p>No articles available</p>}
        {!loading && !error && articles.length > 0 && (
          <>
            <div style={styles.articlesGrid}>
              {filterRemovedArticles(articles, bookmarkedArticles, isBookmarkedView).map((article, i) => (
                <div className="card" key={i} style={styles.card}>
                  <a 
                    href={article.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={styles.cardLink}
                  >
                    <img
                      src={article.urlToImage || '/default-image.jpg'}
                      alt={article.title || 'Article image'}
                      loading="lazy"
                      style={styles.cardImage}
                    />
                    <div style={styles.cardContent}>
                      <h4 style={styles.cardTitle}>{article.title || 'No title available'}</h4>
                      <div style={styles.publishInfo}>
                        <p>{article.source?.name || 'Unknown source'}</p>
                        <p>{new Date(article.publishedAt).toLocaleDateString() || 'No date available'}</p>
                      </div>
                      <div style={styles.description}>{article.description || 'No description available'}</div>
                    </div>
                  </a>
                  {article.isUserGenerated && (
                    <div style={styles.userGeneratedBadge}>
                      User Article
                    </div>
                  )}
                  {isAuthenticated && (
                    <div style={styles.newsActions}>
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
                  )}
                </div>
              ))}
            </div>
            {articles.length < totalResults && (
              <button 
                className="load-more-btn" 
                onClick={loadMore}
                style={styles.loadMoreBtn}
              >
                Load More
              </button>
            )}
          </>
        )}
      </main>
    </section>
  );
};

export default News;
