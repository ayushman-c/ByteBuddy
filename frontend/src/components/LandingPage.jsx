import React from 'react';
import './LandingPage.css';

const LandingPage = ({ onSignIn }) => {
  const features = ['Earn Money', 'Find Services', 'Collaborate', 'Campus Safe'];

  return (
    <div className="landing-page">
      <div className="landing-content">
        <h1 className="landing-title">ByteBuddy</h1>
        
        <p className="landing-subtitle">
          Your Campus Skill Marketplace
        </p>
        
        <div className="landing-description-box">
          <p className="landing-description-text">
            ByteBuddy is a student-exclusive skill marketplace designed to help college students earn, collaborate, and get work done within their campus ecosystem.
          </p>
          <p className="landing-description-subtext">
            Connect with peers who offer skills or find services you need — all in a safe, campus-verified environment.
          </p>
        </div>

        <div className="landing-features">
          {features.map(feature => (
            <div key={feature} className="landing-feature-card">
              <h3 className="landing-feature-title">{feature}</h3>
            </div>
          ))}
        </div>

        <button onClick={onSignIn} className="landing-signin-button">
          🚀 Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default LandingPage;