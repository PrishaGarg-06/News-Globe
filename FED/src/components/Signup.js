import React, { useState, useContext } from "react";
import { AuthContext } from "../context/authContext"; // Import AuthContext
import { useNavigate } from "react-router-dom"; // For redirection after signup

const Signup = ({ closeForm }) => {
  const { setIsAuthenticated, setUserId } = useContext(AuthContext); // Access context to update auth state
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // Use navigate for redirection

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        // Store the JWT token in localStorage after successful signup
        localStorage.setItem("token", data.token);

        // Update the context state for authentication and userId
        setIsAuthenticated(true);
        setUserId(data.userId);

        // Redirect to the desired page after successful signup (e.g., news page)
        navigate("/news");
      } else {
        setMessage(data.message || data.error); // Handle failure message
      }
    } catch (error) {
      setMessage("Error during signup");
    }
    closeForm();
  };

  return (
    <div className='auth'>
      <div className="signup-overlay">
        <div className="signup-form-container">
          <button className="close-btn" onClick={closeForm}>X</button>
          <h2>Signup</h2>
          <form onSubmit={handleSubmit}>
            <label><input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            /></label>
            <label><input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            /></label>
            <label><input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            /></label>
            <button type="submit">Signup</button>
          </form>
          {message && <p>{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default Signup;