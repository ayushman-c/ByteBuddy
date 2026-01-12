import React from 'react'
import './Navbar.css'
import { signInWithGoogle } from '../services/firebase'

const Navbar = () => {

    const handleSignIn = async () => {
    try {
      // Sign in first
      const user = await signInWithGoogle();
      
      if (user) {
        // Open dashboard in new tab
        const newTab = window.open('/dashboard', '_blank');
        
        // Check if popup was blocked
        if (!newTab || newTab.closed || typeof newTab.closed === 'undefined') {
          alert('Popup blocked! Please allow popups for this site.');
          // Fallback: redirect in same tab
          window.location.href = '/dashboard';
        }
      }
    } catch (error) {
      console.error('Sign in error:', error);
      alert('Failed to sign in. Please try again.');
    }
  };





  return (
    <>
        <div className="navbar-main-container">
            <div className="navbar-container">
                <div className="logo-heading">
                    <div className="logo"></div>
                    <div className="heading">ByteBuddy</div>
                </div>

                <div className="buttons">
                    <a href='#explore'>
                    <div className="explore-gigs">Explore gigs</div></a>
                    <a href='#features'>
                    <div className="features">Features</div></a>
                    <a href='#how'>
                    <div className="working">How it works</div></a>
                    <a href='#cats'>
                    <div className="catagoriers">Categories</div></a>
                </div>

                <div className="interaction">
                    <div className="light-dark"></div>
                    <a href='#explore'>
                    <div className="post">Post a gig</div></a>
                    <div onClick={handleSignIn} className="log-in">Log in</div>
                    <div onClick={handleSignIn} className="sign-up">Sign Up</div>
                </div>
            </div>
        </div>
    </>
  )
};

export default Navbar
