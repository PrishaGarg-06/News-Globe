import React, { useState } from 'react';
// import './Enquiry.css';

const EnquiryForm = ({ closeForm }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    state: '',
    enquiry: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted', formData);
    // Handle form submission (e.g., send data to server)
  };

  return (
    <div className="enquiry-overlay">
      <div className="enquiry-form-container">
        <button className="close-btn" onClick={closeForm}>X</button>
        <h2>Enquiry Form</h2>
        <form onSubmit={handleSubmit}>
          <label>
            <input type="text" placeholder="Name" name="name" value={formData.name} onChange={handleChange} required />
          </label>
          <label>
            <input type="email" placeholder="Email" name="email" value={formData.email} onChange={handleChange} required />
          </label>
          <label>
            <input type="text" placeholder="Phone Number" name="phone" value={formData.phone} onChange={handleChange} required />
          </label>
          <label>
            <input type="text" placeholder="State" name="state" value={formData.state} onChange={handleChange} required />
          </label>
          <label>
            <textarea placeholder="Enquiry" name="enquiry" value={formData.enquiry} onChange={handleChange} required />
          </label>
          <button type="submit" onClick={closeForm}>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default EnquiryForm;