import React from 'react';
//import './Card.css';

const Card = ({ image, title, description, link }) => {
  return (
    <div className="card">
      <img src={image} alt={title} />
      <div className="content">
        <h1>{title}</h1>
        <p>{description}</p>
        <a href={link} target="_blank" rel="noopener noreferrer">
          <button>Learn more</button>
        </a>
      </div>
    </div>
  );
};

export default Card;
