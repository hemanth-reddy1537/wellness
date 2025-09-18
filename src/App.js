import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ChatPage from './pages/ChatPage';
import Dashboard from './pages/Dashboard';
import BookMentor from './pages/BookMentor';
import Resources from './pages/Resources';
import AboutUs from './pages/AboutUs';
import Helpline from './pages/Helpline';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('chat');
  const [userProfile] = useState({
    name: "reddyreddy153700",
    email: "reddyreddy@gmail.com"
  });

  const renderPage = () => {
    switch (currentPage) {
      case 'chat':
        return <ChatPage onNavigate={setCurrentPage} />;
      case 'dashboard':
        return <Dashboard userProfile={userProfile} />;
      case 'book-mentor':
        return <BookMentor />;
      case 'resources':
        return <Resources />;
      case 'about-us':
        return <AboutUs />;
      case 'helpline':
        return <Helpline />;
      default:
        return <ChatPage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="app-container">
      <Header onNavigate={setCurrentPage} userProfile={userProfile} currentPage={currentPage} />
      <main className="main-content">
        {renderPage()}
      </main>
    </div>
  );
}

export default App;