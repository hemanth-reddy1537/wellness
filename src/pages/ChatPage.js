import React, { useState } from 'react';
import Chatbot from '../components/Chatbot';
import { FaUser, FaBook, FaChartLine, FaBars, FaTimes } from 'react-icons/fa';
import './Chatpage.css';
// import '../styles/ChatPage.css'; // Assuming new CSS for this file

function ChatPage({ onNavigate }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="chat-container-gemini">
      {/* Sidebar Overlay */}
      <div className={`sidebar-overlay ${isSidebarOpen ? 'active' : ''}`} onClick={() => setIsSidebarOpen(false)}></div>

      {/* Drop-down Sidebar */}
      <div className={`drop-sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <button className="close-sidebar-button" onClick={() => setIsSidebarOpen(false)}><FaTimes /></button>
        <div className="sidebar-section quick-actions">
          <h4>Quick Actions</h4>
          <ul>
            <li onClick={() => onNavigate('book-mentor')}><FaUser /><span>Book a Mentor</span></li>
            <li onClick={() => onNavigate('resources')}><FaBook /><span>Browse Resources</span></li>
            <li onClick={() => onNavigate('dashboard')}><FaChartLine /><span>View Progress</span></li>
          </ul>
        </div>
        
        <div className="sidebar-section today-tip">
          <h4>Today's Wellness Tip</h4>
          <p>Step outside for 5 minutes to reset your mood</p>
        </div>

        <div className="sidebar-section need-help">
          <h4>Need Help Now?</h4>
          <p>Crisis Text Line: Text HOME to 741741</p>
          <p>National Suicide Prevention: 988</p>
          <p>Campus Counseling: Contact your student services</p>
          <button className="get-help-button">Get Immediate Help</button>
        </div>
        
        <div className="sidebar-section mood-check">
          <h4>Quick Mood Check</h4>
          <p>How are you feeling right now?</p>
          <div className="mood-options">
            <button>Great</button>
            <button>Okay</button>
            <button>Down</button>
            <button>Anxious</button>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="chat-main-area-gemini">
        <button className="open-sidebar-button" onClick={() => setIsSidebarOpen(true)}>
          <FaBars />
        </button>
        <div className="welcome-message-gemini">
          <h2>Hello, I'm Diya 👋</h2>
          <p>Your AI-powered student support companion. What can I help you with today?</p>
        </div>
        
        <Chatbot />
      </div>
    </div>
  );
}

export default ChatPage;