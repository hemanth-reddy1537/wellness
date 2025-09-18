import React from 'react';
// import Chatbot from '../components/Chatbot'; // Assume this is where your chatbot code is

function Home() {
  return (
    <div className="home-page">
      <h2>Your AI Wellness Companion</h2>
      <p>Start a conversation with our AI-guided chatbot to explore coping strategies, find resources, or simply talk.</p>
      <div className="chatbot-container">
        {/* The Chatbot component you've already developed goes here */}
        {/* <Chatbot /> */}
      </div>
    </div>
  );
}

export default Home;