// Snackbar.js
import React, { useEffect } from 'react';
import './Snackbar.css';

const Snackbar = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000); // Auto-close after 3 seconds
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="snackbar">
      <p>{message}</p>
    </div>
  );
};

export default Snackbar;
