import React from 'react';
import './AboutUs.css';
import { FaUser, FaChartLine, FaBook, FaCalendarCheck, FaLaptopCode, FaHeartbeat, FaUsers, FaArrowRight } from 'react-icons/fa';

function AboutUs() {
  return (
    <div className="blog-container">
      <div className="blog-header">
        <h1>Redefining Student Wellness: A Blueprint for a Hopeful Campus</h1>
        <p className="subtitle">
          In a world full of academic pressures and social expectations, we're building a supportive space, one conversation at a time.
        </p>
      </div>

      <div className="blog-content">
        <div className="intro-section">
          <h2>The Silent Struggle</h2>
          <p>
            The journey through student life is often seen as a golden chapter, but beneath the surface, a silent and significant battle with mental health is taking place. The pressure to succeed, to fit in, and to navigate an ever-changing world can feel overwhelming.
          </p>
          <div className="infographic-stats-container">
            <div className="stat-card">
              <h3>30.4%</h3>
              <p>of Indians are struggling with mental health compared to 27.1% globally.</p>
            </div>
            <div className="stat-card">
              <h3>150 Million</h3>
              <p>Indians need mental health services, but fewer than 30 million seek care.</p>
            </div>
            <div className="stat-card">
              <h3>76%</h3>
              <p>of people still feel uncomfortable openly talking about mental health.</p>
            </div>
          </div>
        </div>

        <div className="why-we-built-section">
          <h2>Why We Built This Platform</h2>
          <p>
            We saw a critical gap. The student community faces immense pressure, yet there's a serious shortage of mental health professionals—only **0.75 psychiatrists per 100,000 people**, far below the recommended 3. This isn't just a number; it's a barrier. Students are left without a safe, accessible space to turn to.
          </p>
          <blockquote className="callout-quote">
            "We wanted to build a friend, not a therapist. An approachable, stigma-free companion that’s always there, providing support and a listening ear."
          </blockquote>
        </div>

        <div className="features-section">
          <h2>Our Core Features</h2>
          <p className="features-intro">
            Our platform is designed to be a comprehensive ecosystem for student well-being, blending technology with empathy.
          </p>

          <div className="feature-grid">
            <div className="feature-card">
              <div className="feature-icon"><FaHeartbeat /></div>
              <h3>Friendly AI Chatbot</h3>
              <p>
                Our AI companion, Diya, is more than just a bot. It detects emotions, remembers past conversations, and responds with cultural sensitivity to provide personalized, non-judgmental support.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon"><FaChartLine /></div>
              <h3>Personal Wellness Dashboard</h3>
              <p>
                Visualize your mental wellness journey with colorful graphs that track your mood and progress over time. Receive gentle, data-driven wellness tips and generate a secure "Letter to My Counselor" to share insights.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon"><FaCalendarCheck /></div>
              <h3>Confidential Booking System</h3>
              <p>
                Book private, stigma-free appointments with counselors and mentors. Our AI helps triage your needs and seamlessly integrates with local campus and national helplines.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon"><FaBook /></div>
              <h3>Community & Resource Hub</h3>
              <p>
                A curated library of articles, videos, and guided meditations to help you find peace and balance. Connect with peer support groups and participate in positive wellness challenges.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon"><FaLaptopCode /></div>
              <h3>Admin Dashboard for Colleges</h3>
              <p>
                We provide anonymous, high-level insights into student well-being. Colleges can view word clouds of common struggles and use this data to plan proactive, targeted mental health programs.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="impact-section">
        <h2>Our Impact: Bridging the Gap</h2>
        <div className="impact-infographic">
          <div className="impact-stat-box">
            <h4>70% of urban Indians</h4>
            <p>report knowing someone with a mental illness. We're here to start the conversation.</p>
          </div>
          <div className="impact-stat-box">
            <h4>Depression is the most prominent</h4>
            <p>mental health issue (58%). Our platform offers early detection and coping strategies.</p>
          </div>
          <div className="impact-stat-box">
            <h4>2 hours+ daily</h4>
            <p>Students spend this on social media, affecting their well-being. Our platform offers a mindful, supportive alternative.</p>
          </div>
        </div>
      </div>
      
      <div className="conclusion-section">
        <p>
          Our mission is to break the stigma, enable access, and create a supportive student community. We believe that with the right tools and a kind companion, every student can find their path to a healthier, happier life.
        </p>
        <div className="call-to-action">
          <p>Let’s change the way we talk about mental health—one conversation at a time.</p>
          <FaArrowRight className="arrow-icon" />
        </div>
      </div>
    </div>
  );
}

export default AboutUs;