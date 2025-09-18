import React, { useState } from 'react';
import { FaSearch, FaBook, FaVideo, FaMedal, FaClipboard, FaUsers, FaHeart } from 'react-icons/fa';

function Resources() {
  const allResources = [
    { type: 'articles', title: 'Managing College Anxiety: A Student\'s Guide', tags: ['articles', 'anxiety', 'academic stress'], views: 1243, featured: true },
    { type: 'meditation', title: '5-Minute Breathing Meditation for Stress', tags: ['meditation', 'breathing', 'stress'], views: 892, featured: true },
    { type: 'articles', title: 'Sleep Hygiene for Better Mental Health', tags: ['articles', 'sleep', 'mental health'], views: 723, featured: true },
    { type: 'videos', title: 'Overcoming Perfectionism in Academic Settings', tags: ['videos', 'perfectionism'], views: 678, featured: false },
    { type: 'workshops', title: 'Mindfulness Workshop: Present Moment Awareness', tags: ['workshops', 'mindfulness'], views: 234, featured: false },
    { type: 'student-clubs', title: 'Active Minds Student Chapter', tags: ['student clubs', 'advocacy'], views: 189, featured: false },
    { type: 'peer-support', title: 'Learn How to Provide Effective Peer Support', tags: ['workshops', 'peer support'], views: 167, featured: false }
  ];

  const [selectedCategory, setSelectedCategory] = useState('All Resources');

  const getResourcesForCategory = (category) => {
    if (category === 'All Resources') {
      return allResources;
    }
    return allResources.filter(res => res.type === category);
  };

  const filteredResources = getResourcesForCategory(selectedCategory);
  
  const categories = [
    { id: 'All Resources', label: 'All Resources', icon: FaBook },
    { id: 'articles', label: 'Articles & Blogs', icon: FaClipboard },
    { id: 'videos', label: 'Videos', icon: FaVideo },
    { id: 'meditation', label: 'Meditation', icon: FaMedal },
    { id: 'workshops', label: 'Workshops', icon: FaUsers },
    { id: 'student-clubs', label: 'Student Clubs', icon: FaUsers },
  ];

  const getCategoryCount = (type) => {
    if (type === 'All Resources') {
      return allResources.length;
    }
    return allResources.filter(res => res.type === type).length;
  };

  return (
    <div className="resources-page-container">
      <div className="resources-header">
        <FaHeart className="resources-icon" />
        <h2>Wellness Resources</h2>
        <p>Discover curated content to support your mental health and wellness journey</p>
      </div>

      <div className="search-bar-container">
        <FaSearch />
        <input type="text" placeholder="Search articles, videos, meditation guides..." />
      </div>

      <div className="resources-content">
        <div className="resource-categories">
          <h4>Categories</h4>
          <ul>
            {categories.map((cat) => (
              <li 
                key={cat.id} 
                className={selectedCategory === cat.id ? 'active' : ''}
                onClick={() => setSelectedCategory(cat.id)}
              >
                <cat.icon /> 
                {cat.label} ({getCategoryCount(cat.id)})
              </li>
            ))}
          </ul>
        </div>
        
        <div className="resource-list">
          {selectedCategory === 'All Resources' && (
            <div className="featured-resources">
              <h3>Featured Resources</h3>
              <div className="featured-cards-row">
                {allResources.filter(res => res.featured).map((res, index) => (
                  <div key={index} className="resource-card featured">
                                      <h4>{res.title}</h4>
                    <p>A quick guide for college students.</p>
                    <div className="card-footer">
                      <span>{res.views} views</span>
                      <button className="explore-button">Explore Resource</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="all-resources">
            <h3>{selectedCategory === 'All Resources' ? 'All Resources' : selectedCategory} ({filteredResources.length})</h3>
            {filteredResources.map((res, index) => (
              <div key={index} className="resource-card all">
                <div className="card-icon">
                  {categories.find(c => c.id === res.type)?.icon && React.createElement(categories.find(c => c.id === res.type).icon)}
                </div>
                <div className="card-details">
                  <h4>{res.title}</h4>
                  <div className="tags">
                    {res.tags.map((tag, i) => <span key={i} className="tag-chip">{tag}</span>)}
                  </div>
                  <div className="card-footer">
                    <span>{res.views} views</span>
                    <button className="read-button">Read</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Resources;