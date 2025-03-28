import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState(null); 

  useEffect(() => {
    // Check for token and validate user session on initial load
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setIsAuthenticated(false);
          setUserId(null);
          return;
        }

        const response = await fetch("/api/auth/verify-token", {
          method: "POST",
          headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
          body: JSON.stringify({ token }),
        });

        if (!response.ok) {
          setIsAuthenticated(false);
          setUserId(null);
          return;
        }

        const data = await response.json();
        if (data.success) {
          setIsAuthenticated(true);
          setUserId(data.userId); // Save user ID for personalized features
          setUsername(data.user.username); 
        } else {
          setIsAuthenticated(false);
          setUserId(null);
        }
      } catch (error) {
        console.error("Error verifying token:", error);
        setIsAuthenticated(false);
        setUserId(null);
      }
    };

    checkAuth();
  }, []);

  return (
    // Destructuring
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, userId, setUserId, username, setUsername  }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;