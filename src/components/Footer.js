import React from 'react';
import { FaHeart } from 'react-icons/fa';
import './Footer.css';

function Footer({ isVisible }) {
  return (
    <footer className={`app-footer ${isVisible ? 'footer-visible' : 'footer-hidden'}`}>
      <div className="footer-content">
        <div className="footer-logo">
          <FaHeart className="footer-icon" />
          <span>Diya</span>
        </div>
        <p>&copy; {new Date().getFullYear()} Diya. All Rights Reserved.</p>
        <p>Your mental wellness companion.</p>
      </div>
    </footer>
  );
}

export default Footer;