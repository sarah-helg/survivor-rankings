import React from 'react';
import './card.css';


// Card component that will hold all the other parts of the card
export const Card = ({ children }) => {
  return <div className="card">{children}</div>;
};

// CardHeader component for the card's header section
export const CardHeader = ({ children }) => {
  return <div className="card-header">{children}</div>;
};

// CardTitle component for the card's title
export const CardTitle = ({ children }) => {
  return <div className="card-title">{children}</div>;
};

// CardContent component for the card's main content
export const CardContent = ({ children }) => {
  return <div className="card-content">{children}</div>;
};