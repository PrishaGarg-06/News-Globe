import React, { useEffect, useState , useContext} from "react";
import { AuthContext } from '../context/authContext';
import Navbar from './Navbar';

const Like = () => {
  const [likedArticles, setLikedArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { isAuthenticated, userId } = useContext(AuthContext);

  useEffect(() => {

    if (!isAuthenticated) return;

    const fetchLikedArticles = async () => {

      setLoading(true);
      setError(null);

      try {
        const response = await fetch("http://localhost:5000/api/like", {
          method: "GET",
          headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`, // Add JWT token from localStorage
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch liked articles");
        }

        const data = await response.json();
        setLikedArticles(data); // Assuming data is an array of articles
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLikedArticles();
  }, [isAuthenticated]);

  const handleArticleClick = (url) => {
    window.open(url, "_blank"); // Open article in a new tab
  };

  if (loading) {
    return <div>Loading liked articles...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (likedArticles.length === 0) {
    return <div>No liked articles yet. Start liking some!</div>;
  }

  return (
    <div className="liked-articles">
      <h2>Liked Articles</h2>
      <ul className="article-list">
        {likedArticles.map((article) => (
          <li
            key={article.url}
            className="article-item"
            onClick={() => handleArticleClick(article.url)}
          >
            <div className="article-content">
              <h3>{article.title || "Untitled Article"}</h3>
              <p>{article.description || "No description available."}</p>
              <span className="article-link">Read more</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Like;
