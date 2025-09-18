import React from 'react';
import { FaPhoneAlt, FaHeadset, FaUniversity } from 'react-icons/fa';
import './Helpline.css'; // New CSS for this page

function Helpline() {
  return (
    <div className="helpline-page-container">
      <div className="helpline-header">
        <h2>Helpline & Emergency Support</h2>
        <p>If you or someone you know is in immediate distress, please reach out to one of the resources below. You are not alone.</p>
      </div>
      <div className="helpline-grid">
        <div className="helpline-card">
          <div className="helpline-icon"><FaHeadset /></div>
          <h3>National Suicide Helpline</h3>
          <p>Toll-free, confidential crisis support, available 24/7.</p>
          <a href="tel:988" className="helpline-number">988</a>
        </div>
        <div className="helpline-card">
          <div className="helpline-icon"><FaPhoneAlt /></div>
          <h3>Crisis Text Line</h3>
          <p>Connect with a crisis counselor by text message.</p>
          <p className="helpline-text">Text **HOME** to **741741**</p>
        </div>
        <div className="helpline-card">
          <div className="helpline-icon"><FaUniversity /></div>
          <h3>Campus Counseling Center</h3>
          <p>Contact your university's student services for local support.</p>
          <p className="helpline-text">University Contact: **[Contact Number]**</p>
        </div>
      </div>
    </div>
  );
}

export default Helpline;