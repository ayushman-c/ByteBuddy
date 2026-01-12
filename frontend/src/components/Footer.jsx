import React from 'react'
import './Footer.css'

const Footer = () => {
  return (
    <>
        <div className="footer-main-container">
            <div className="footer-head">
                <div className="footer-head-container-main">
                    <div className="footer-head-container-main-head">
                        <div className="footer-logo"></div>
                        <div className="footer-heading">ByteBuddy</div>
                    </div>
                    <div className="footer-head-container-main-desc">Your Campus. Your Skills. Your Income.</div>
                </div>
                <div className="footer-components">
                <div className="footer-head-containers">
                    <div className="footer-head-container-head">Platform</div>
                    <div className="footer-head-container-desc">Browse Gigs</div>
                    <div className="footer-head-container-desc">Post a Gig</div>
                    <div className="footer-head-container-desc">How It Works</div>
                </div>
                <div className="footer-head-containers">
                    <div className="footer-head-container-head">Company</div>
                    <div className="footer-head-container-desc">About Us</div>
                    <div className="footer-head-container-desc">Contacts</div>
                    <div className="footer-head-container-desc">Careers</div>
                </div>
                <div className="footer-head-containers">
                    <div className="footer-head-container-head">Legal</div>
                    <div className="footer-head-container-desc">Terms of Service</div>
                    <div className="footer-head-container-desc">Privacy Policy</div>
                    <div className="footer-head-container-desc">Cookie Policy</div>
                </div>
                </div>
            </div>
            <div className="footer-tail">
                <div className="footer-tail box-1">© 2025 Campus Drive. All rights reserved.</div>
                <div className="footer-tail box-2">
                    <div className="footer-socials">Twitter</div>
                    <div className="footer-socials">LinkedIn</div>
                    <div className="footer-socials">Instagram</div>
                </div>
            </div>
        </div> 
    </>
  )
}

export default Footer
