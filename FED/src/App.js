import React, { useState, useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./context/authContext";
import Home from "./components/Home";
import News from "./components/News";
import Bookmarks from './components/Bookmarks';
import TopReads from "./components/TopReads";
import Footer from "./components/Footer";
import EnquiryForm from "./components/Enquiry";
import Sidebar from "./components/Sidebar";
import Login from "./components/LoginForm";
import Signup from "./components/Signup";
import Like from "./components/Like";
import "./App.css";
import "./styles/main.css";

// Create a separate ProtectedRoute component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  
  if (!isAuthenticated) {
    alert('You need to login first.');
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  const [showEnquiry, setShowEnquiry] = useState(false);
  
  // Get authentication state from AuthContext
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Router>
      <div className="App">
        <Sidebar toggleEnquiry={() => setShowEnquiry(true)} />

        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/news" element={<News />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes */}
          <Route 
            path="/topreads" 
            element={
              <ProtectedRoute>
                <TopReads />
              </ProtectedRoute>
            }
          />
          <Route 
            path="/bookmarks" 
            element={
              <ProtectedRoute>
                <Bookmarks />
              </ProtectedRoute>
            }
          />
          <Route 
            path="/like" 
            element={
              <ProtectedRoute>
                <Like />
              </ProtectedRoute>
            }
          />
        </Routes>

        <Footer />

        {showEnquiry && <EnquiryForm closeForm={() => setShowEnquiry(false)} />}
      </div>
    </Router>
  );
}

export default App;