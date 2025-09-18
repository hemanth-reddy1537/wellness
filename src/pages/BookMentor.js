import React, { useState } from 'react';
import { FaHeart, FaVideo, FaMapMarkerAlt, FaUserTie, FaUserGraduate, FaMale, FaFemale, FaStar, FaChevronLeft, FaTimesCircle } from 'react-icons/fa';

const mentorData = [
  // 1. Virtual, Peer Mentor, Female
  {
    name: "Priya Sharma",
    role: "Peer Mentor",
    specialization: "Social Anxiety & Loneliness",
    type: "Virtual",
    gender: "Female",
    rating: 4.7,
    bio: "I'm here to help you navigate new social environments and build meaningful connections. I believe a supportive community is key to mental well-being."
  },
  // 2. Virtual, Peer Mentor, Male
  {
    name: "Amit Patel",
    role: "Peer Mentor",
    specialization: "Academic Stress & Time Management",
    type: "Virtual",
    gender: "Male",
    rating: 4.6,
    bio: "As a senior student, I understand academic pressures. I can provide tips on time management and overcoming study-related stress in virtual sessions."
  },
  // 3. Virtual, Faculty Counselor, Female
  {
    name: "Dr. Anjali Rao",
    role: "Faculty Counselor",
    specialization: "Burnout & Exam Anxiety",
    type: "Virtual",
    gender: "Female",
    rating: 4.9,
    bio: "A professional counselor with extensive experience in helping students cope with academic burnout and exam-related anxiety through online therapy."
  },
  // 4. Virtual, Faculty Counselor, Male
  {
    name: "Prof. Rohan Verma",
    role: "Faculty Counselor",
    specialization: "Depression & General Wellness",
    type: "Virtual",
    gender: "Male",
    rating: 5.0,
    bio: "I am a psychologist dedicated to helping students through virtual consultations. My focus is on providing a safe space for open discussion and healing."
  },
  // 5. Offline, Peer Mentor, Female
  {
    name: "Sneha Reddy",
    role: "Peer Mentor",
    specialization: "Career Planning & Financial Stress",
    type: "Offline",
    gender: "Female",
    rating: 4.8,
    bio: "As a final-year student, I can offer guidance on career paths and managing financial worries with face-to-face support on campus."
  },
  // 6. Offline, Peer Mentor, Male
  {
    name: "Karan Singh",
    role: "Peer Mentor",
    specialization: "Adjusting to College Life",
    type: "Offline",
    gender: "Male",
    rating: 4.5,
    bio: "I provide in-person mentorship to help new students adjust to campus life, offering a friendly ear for any challenges they might face."
  },
  // 7. Offline, Faculty Counselor, Female
  {
    name: "Dr. Sunita Kapoor",
    role: "Faculty Counselor",
    specialization: "Family & Relationship Issues",
    type: "Offline",
    gender: "Female",
    rating: 4.9,
    bio: "I am a senior faculty counselor providing confidential, in-person sessions to help students navigate complex family and relationship dynamics."
  },
  // 8. Offline, Faculty Counselor, Male
  {
    name: "Dr. David Lee",
    role: "Faculty Counselor",
    specialization: "Grief & Loss",
    type: "Offline",
    gender: "Male",
    rating: 5.0,
    bio: "A compassionate counselor offering face-to-face support on campus. My goal is to help you through difficult periods of grief and emotional recovery."
  },
];

function BookMentor() {
  const [step, setStep] = useState(1);
  const [selections, setSelections] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filteredMentors, setFilteredMentors] = useState([]);
  
  const handleSelection = (key, value) => {
    const newSelections = { ...selections, [key]: value };
    setSelections(newSelections);

    if (key === 'gender') {
      const mentors = mentorData.filter(m => 
        m.type === newSelections.type &&
        m.role === newSelections.role &&
        m.gender === newSelections.gender
      );
      setFilteredMentors(mentors);
    }
    setStep(step + 1);
  };
  
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <h3 className="question-heading">How would you like to meet?</h3>
            <div className="step-options">
              <div className="option-card" onClick={() => handleSelection('type', 'Virtual')}>
                <FaVideo className="icon" />
                <h4>Virtual Session</h4>
                <p>Connect online from anywhere</p>
              </div>
              <div className="option-card" onClick={() => handleSelection('type', 'Offline')}>
                <FaMapMarkerAlt className="icon" />
                <h4>In-Person Session</h4>
                <p>Meet face-to-face on campus</p>
              </div>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <h3 className="question-heading">What type of mentor would you prefer?</h3>
            <div className="step-options">
              <div className="option-card" onClick={() => handleSelection('role', 'Peer Mentor')}>
                <FaUserGraduate className="icon" />
                <h4>Peer Mentor</h4>
                <p>A fellow student who understands your experience</p>
              </div>
              <div className="option-card" onClick={() => handleSelection('role', 'Faculty Counselor')}>
                <FaUserTie className="icon" />
                <h4>Faculty Counselor</h4>
                <p>A professional counselor or faculty member</p>
              </div>
            </div>
          </>
        );
      case 3:
        return (
          <>
            <h3 className="question-heading">Do you have a gender preference?</h3>
            <div className="step-options">
              <div className="option-card" onClick={() => handleSelection('gender', 'Female')}>
                <FaFemale className="icon" />
                <h4>Female Mentor</h4>
                <p>Connect with a female mentor</p>
              </div>
              <div className="option-card" onClick={() => handleSelection('gender', 'Male')}>
                <FaMale className="icon" />
                <h4>Male Mentor</h4>
                <p>Connect with a male mentor</p>
              </div>
            </div>
          </>
        );
      case 4:
        return (
          <div className="mentor-list">
            <button className="back-button" onClick={() => setStep(3)}><FaChevronLeft /> Back</button>
            <div className="mentor-available-count">{filteredMentors.length} mentor(s) available</div>
            {filteredMentors.length > 0 ? (
              filteredMentors.map((mentor, index) => (
                <div key={index} className="mentor-card">
                  <div className="mentor-profile">
                    <span className="mentor-initials">{mentor.name.charAt(0)}</span>
                    <div className="mentor-details">
                      <h4>{mentor.name}</h4>
                      <div className="mentor-tags">
                        <span>{mentor.specialization}</span>
                        <span>{mentor.role}</span>
                        <span>{mentor.type}</span>
                        <span>{mentor.gender}</span>
                      </div>
                      <div className="mentor-rating"><FaStar /> {mentor.rating}</div>
                    </div>
                  </div>
                  <p className="mentor-bio">{mentor.bio}</p>
                  <button className="book-session-button" onClick={() => setIsModalOpen(true)}>Book Session</button>
                </div>
              ))
            ) : (
              <p>No mentors found with these preferences. Please go back and try a different combination.</p>
            )}
          </div>
        );
      default:
        return null;
    }
  };
  
  return (
    <div className="book-mentor-page-container">
      <div className="booking-header">
        <FaHeart className="booking-icon" />
        <h2>Book a Mentor</h2>
        <p>Connect with someone who understands and can support your journey</p>
      </div>
      <div className="booking-content">
        <div className="progress-bar">
          <div className={`step-circle ${step >= 1 ? 'active' : ''}`}>1</div>
          <div className={`step-circle ${step >= 2 ? 'active' : ''}`}>2</div>
          <div className={`step-circle ${step >= 3 ? 'active' : ''}`}>3</div>
        </div>
        {renderStep()}
      </div>
      
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close-button" onClick={() => setIsModalOpen(false)}><FaTimesCircle /></button>
            <h3>Booking Confirmed!</h3>
            <p>Your session has been successfully booked. An email confirmation with the time slot and mentor details has been sent to your registered email address.</p>
            <button className="ok-button" onClick={() => setIsModalOpen(false)}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default BookMentor;