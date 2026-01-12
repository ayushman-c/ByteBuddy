import React from 'react';
import './LandingPage.css';
import Navbar from '../custom/Navbar';
import Cards from '../custom/Cards';
import Wcards from '../custom/Wcards';
import Cats from '../custom/Cats';
import Footer from './Footer';

const LandingPage = ({ onSignIn }) => {
  const handleSignInNewTab = async () => {
    try {
      // Call the sign-in function
      await onSignIn();
      
      // After successful sign-in, open dashboard in new tab
      const dashboardUrl = window.location.origin + '/dashboard';
      const newWindow = window.open(dashboardUrl, '_blank', 'noopener,noreferrer');
      
      // Check if popup was blocked
      if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
        alert('Popup was blocked! Please allow popups for this site and try again.');
      }
    } catch (error) {
      console.error('Sign in error:', error);
    }
  };
  return (
    <>
    <Navbar/>
    <div className="main-landing">
      <div className="hero-main-container">
        <div className="tittle-box">
          <div className="design"></div>
          <div className="tittle">Built for College Students</div>
        </div>

        <div className="heading-box">
          <div className="black-heading">Earn. Learn. Grow —</div>
          <div className="green-heading">Inside Your Campus.</div>
        </div>

        <div className="desc">A marketplace designed exclusively for college
students to offer services, hire talent, and build real-
world experience — all within your campus ecosystem.</div>

        <div className="button-box">
          <a href='#explore'>
          <div className="green-box">
            
            <div className="box-heading">Explore Gigs</div>
            <div className="box-arrow"></div>
          </div></a>
          <a href='#explore'>
          <div className="black-box">Post a Gig</div></a>
        </div>

        <div className="feature-box">
          <div className="feature-1-box">
            <div className="green-dot"></div>
            <div className="feature-tittle">100% College Verified</div>
          </div>

          <div className="feature-2-box">
            <div className="green-dot"></div>
            <div className="feature-tittle">Secure Payments</div>
          </div>

          <div className="feature-3-box">
            <div className="green-dot"></div>
            <div className="feature-tittle">Campus-Only Access</div>
          </div>
        </div>
      </div>

    </div>
   
        


    <div id="features"className="working-main-container">
      <div className="working-sub-container">
        <div className="working-heading">Why Choose ByteBuddy?</div>
        <div className="working-subheading">Everything you need to succeed in the campus gig economy</div>
      </div>
      <Cards/>
    </div>




    <div id="how" className="how-main-container">
      <div className="how-sub-container">
        <div className="how-heading">How It Works</div>
        <div className="how-subheading">Get started in three simple steps</div>
      </div>
      <Wcards/>
    </div>



    <div id="cats" className="cats-main-container">
      <div className="cats-sub-container">
        <div className="cats-heading">Popular Categories</div>
        <div className="cats-subheading">Find gigs across various skills and services</div>
      </div>
      <Cats/>
    </div>


    <div id='explore' className="last-section">
      <div className="last-section-mainbox">
        <div className="last-heading">Ready to Start Earning?</div>
        <div className="last-desc">Join thousands of students already using Campus Drive to build their
skills, earn money, and grow their network.</div>
        <div className="last-button-box">
          <div onClick={handleSignInNewTab}  className="last-button-1">Get Started Free</div>
          <div className="last-button-2"></div>
        </div>
      </div>
    </div>


    <Footer/>
  </>
  );
};

export default LandingPage;