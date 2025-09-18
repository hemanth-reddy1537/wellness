import React, { useState } from 'react';
import { FaComment, FaChartLine, FaUserTie, FaBook, FaInfoCircle, FaPhoneAlt, FaUser } from 'react-icons/fa';
import './Header.css'; // New CSS file for header-specific styles

function Header({ onNavigate, userProfile, currentPage }) {
  const [isProfileHovered, setIsProfileHovered] = useState(false);

  return (
    <header className="app-header">
      <div className="logo-container" onClick={() => onNavigate('chat')}>
        <h2 id="logo">Diya</h2>
      </div>
      <nav>
        <ul className="nav-links">
          <li className={currentPage === 'chat' ? 'active' : ''} onClick={() => onNavigate('chat')}><FaComment /> Chat</li>
          <li className={currentPage === 'dashboard' ? 'active' : ''} onClick={() => onNavigate('dashboard')}><FaChartLine /> Dashboard</li>
          <li className={currentPage === 'book-mentor' ? 'active' : ''} onClick={() => onNavigate('book-mentor')}><FaUserTie /> Book Mentor</li>
          <li className={currentPage === 'resources' ? 'active' : ''} onClick={() => onNavigate('resources')}><FaBook /> Resources</li>
          <li className={currentPage === 'helpline' ? 'active' : ''} onClick={() => onNavigate('helpline')}><FaPhoneAlt /> Helpline</li>
          <li className={currentPage === 'about-us' ? 'active' : ''} onClick={() => onNavigate('about-us')}><FaInfoCircle /> About Us</li>
        </ul>
      </nav>
      <div 
        className="profile-section" 
        onMouseEnter={() => setIsProfileHovered(true)} 
        onMouseLeave={() => setIsProfileHovered(false)}
      >
        <FaUser className="profile-icon" />
        {isProfileHovered && (
          <div className="profile-dropdown">
            <p className="profile-name">{userProfile.name}</p>
            <p className="profile-email">{userProfile.email}</p>
            <button className="profile-button">Sign In / Log Out</button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;