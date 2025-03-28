import React, { useState, useContext } from "react";
import { AuthContext } from "../context/authContext"; 
import { useNavigate } from "react-router-dom"; 

const Login = ({ closeForm }) => {
  const { setIsAuthenticated, setUserId ,setUsername} = useContext(AuthContext); 
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      console.log("Data: ", data)
      if (data.token) {
        localStorage.setItem("token", data.token);

        setIsAuthenticated(true);
        setUserId(data.userId);
        setUsername(data.user.username);

        navigate("/news");
      } else {
        setMessage(data.message || data.error);
      }
    } catch (error) {
      console.log("Eror: ", error)
      setMessage("Error during login");
    }
    closeForm();
  };

  return (
    <div className="auth">
      <div className="login-overlay">
        <div className="login-form-container">
          <button className="close-btn" onClick={closeForm}>X</button>
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </label>
            <button type="submit">Login</button>
          </form>
          {message && <p>{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default Login;