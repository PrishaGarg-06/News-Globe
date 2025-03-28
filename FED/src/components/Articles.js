import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import Navbar from './Navbar';

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { isAuthenticated, userId } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch('http://localhost:5000/api/news/articles');
        if (!res.ok) throw new Error('Failed to fetch articles');
        const data = await res.json();
        setArticles(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);


  const handleLike = async (articleId, articleUrl) => {
    try {
      const response = await fetch('http://localhost:5000/api/articles/like', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`, // JWT Token
        },
        body: JSON.stringify({ articleId, url: articleUrl }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert('Article liked successfully!');
      } else {
        alert(data.error || 'Failed to like the article.');
      }
    } catch (error) {
      console.error('Error liking the article:', error);
    }
  };


  return (
    <section className="articles">
      <Navbar dark />
      <h2>Articles</h2>
      
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      
      <div className="articles-list">
        {articles.map((article) => (
          <div key={article.id} className="article-card">
            <h3>{article.title}</h3>
            <p>{article.content}</p>
            
            {isAuthenticated && article.id && article.url && (
              <div>
              <button onClick={() => handleBookmark( article.source.id, article.title , article.url)}>Bookmark</button>
              <button onClick={() => handleLike( article.id, article.url)}>Like</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Articles;






