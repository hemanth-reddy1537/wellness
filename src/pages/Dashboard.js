import React from 'react';
import { FaHeart } from 'react-icons/fa';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

// Dummy data for charts
const wellnessJourneyData = [
  { name: 'Sep 11', mood: 6 },
  { name: 'Sep 12', mood: 7 },
  { name: 'Sep 13', mood: 8 },
  { name: 'Sep 14', mood: 7 },
  { name: 'Sep 15', mood: 6.9 },
  { name: 'Sep 16', mood: 7.2 },
  { name: 'Sep 17', mood: 6.5 },
];

const weeklyChatData = [
  { name: 'Sep 11', messages: 4 },
  { name: 'Sep 12', messages: 5 },
  { name: 'Sep 13', messages: 7 },
  { name: 'Sep 14', messages: 8 },
  { name: 'Sep 15', messages: 9 },
  { name: 'Sep 16', messages: 6 },
  { name: 'Sep 17', messages: 7 },
];

function Dashboard({ userProfile }) {
  return (
    <div className="dashboard-page-container">
      <div className="loading-state">
        <FaHeart className="loading-icon" />
        <p>Loading your wellness data...</p>
      </div>

      <div className="dashboard-content">
        <h2>Welcome back, {userProfile.name}! 👋</h2>
        <div className="stats-cards-row">
          <div className="stat-card">
            <h4>Total Conversations</h4>
            <p>1</p>
          </div>
          <div className="stat-card">
            <h4>Days Active</h4>
            <p>1</p>
          </div>
          <div className="stat-card">
            <h4>Avg Mood</h4>
            <p>6.9/10</p>
          </div>
          <div className="stat-card">
            <h4>Wellness Streak</h4>
            <p>1 Day</p>
          </div>
        </div>

        <div className="dashboard-grid">
          <div className="chart-card your-journey">
            <h4>Your Wellness Journey</h4>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={wellnessJourneyData}>
                <XAxis dataKey="name" />
                <YAxis domain={[1, 10]} />
                <Tooltip />
                <Line type="monotone" dataKey="mood" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
            <p className="insight-text">Insight: Your mood has been averaging 6.9/10 this week. Keep up the great work on your wellness journey! 😊</p>
          </div>

          <div className="chart-card weekly-chat">
            <h4>Weekly Chat Activity</h4>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={weeklyChatData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="messages" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* New Professional Report Container */}
          <div className="chart-card professional-report">
            <h3>Report:</h3>
            <h4>Confidential Session Report: AI Wellness Companion</h4>

    <p><strong>CLIENT ID:</strong> Jane Doe</p>
    <p><strong>SESSION DATE:</strong> September 18, 2025</p>
    <p><strong>COMPANION:</strong> Diya, The Student Support Companion</p>

    <h4>Session Summary</h4>
    <p>
        The following is a summary of conversations and user input gathered during a one-on-one session.
    </p>

    <h4>Presenting Concern</h4>
    <p>
        The user, a 26-year-old individual, initiated the conversation to address feelings of overwhelming stress that have persisted for two years. The user described these feelings as a "major part" of their life and expressed a desire to understand and manage them.
    </p>

    <h4>Key Conversation Insights</h4>
    <p>
        The user's input revealed a pattern of severe anxiety responses. They reported experiencing what they referred to as "panic attacks" that occur unexpectedly, like a "wave out of nowhere." These episodes are accompanied by physical sensations, including hand shivers and a feeling of difficulty catching breath.
    </p>
    <p>
        Cognitively, the user's thoughts become distorted during these episodes, characterized by catastrophic thinking, such as feeling unable to handle the situation ("I can't handle the situation") and fears of imminent death ("feels like I can't live after this situation").
    </p>
    <p>
        The user also identified a specific environmental trigger: witnessing others in situations similar to a past traumatic event. This suggests a potential link between their current symptoms and a past experience, a pattern often seen in post-traumatic stress.
    </p>

    <h4>Behavioral and Emotional Observations</h4>
    <p>
        During the session, the user's responses indicated a state of visible anxiety, although their communication was clear and coherent. They were forthcoming about their experiences. The user's tone and word choices suggested a feeling of distress and fear. There were no immediate signs of a safety risk.
    </p>

    <h4>AI-Generated Impression</h4>
    <p>
        Based on the conversation and user-reported symptoms, the data is consistent with a pattern of Panic Disorder. The user experiences recurrent and unexpected panic attacks, coupled with significant anticipatory anxiety and avoidance behavior.
    </p>
    <p>
        The reported re-experiencing of distress when exposed to specific triggers points to a possible trauma-related component. This may warrant a deeper exploration for a potential Post-Traumatic Stress Disorder (PTSD) diagnosis by a professional.
    </p>

    <h4>Recommended Actions</h4>
    <p>
        The user's primary struggles appear to be centered on emotional dysregulation, physical manifestations of anxiety, and avoidance as a coping strategy.
    </p>
    <ul>
        <li><strong>Further Conversation:</strong> Continue to guide the user through grounding exercises and coping mechanisms available within the app.</li>
        <li><strong>Professional Referral:</strong> Strongly recommend that the user connect with a qualified professional, such as a university counselor or a licensed therapist, for a formal evaluation and personalized treatment plan.</li>
        <li><strong>Safety Plan:</strong> Encourage the user to establish a safety plan, including identifying a trusted contact and a local crisis helpline.</li>
        <li><strong>Resource Navigation:</strong> Direct the user to the app's "Resources" section for guided meditations, articles on anxiety management, and a deeper understanding of emotional well-being.</li>
    </ul>
          </div>

          <div className="sidebar-right">
            <div className="daily-mood-check card">
              <h4>Daily Mood Check</h4>
              <p>How are you feeling today?</p>
              <p className="mood-score">7/10</p>
              <p className="mood-descriptor">Very Good</p>
              <button>Log Today's Mood</button>
            </div>
            
            <div className="letter-to-counselor card">
              <h4>Letter to Counselor</h4>
              <p>Generate a summary of your conversations to share with a counselor</p>
              <button className="generate-button">Generate Letter</button>
            </div>
            
            <div className="wellness-tip card">
              <h4>Wellness Tip</h4>
              <p className="tip-title">Practice Deep Breathing</p>
              <p className="tip-content">Take 4 deep breaths, inhaling for 4 counts, holding for 4, and exhaling for 4. This activates your parasympathetic nervous system.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;