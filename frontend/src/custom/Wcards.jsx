import React from 'react'
import './Wcards.css'

const Wcards = () => {
  return (
    <>
      
        <div className="how-cards-container">
            <div className="how-card-1">
                <div className="how-card-1-img"></div>
                <div className="how-card-heading">Sign Up with College Email</div>
                <div className="how-card-desc">Create your account using your official
college email. We verify every user to
maintain a safe campus environment.</div>
            </div>
            <div className="how-card-2">
                <div className="how-card-2-img"></div>
                <div className="how-card-heading">Create or Explore Gigs</div>
                <div className="how-card-desc">List your skills and services, or browse
through hundreds of gigs offered by
fellow students.</div>
            </div>
            <div className="how-card-3">
                <div className="how-card-3-img"></div>
                <div className="how-card-heading">Pay & Get Work Done</div>
                <div className="how-card-desc">Hire talent, collaborate, and complete
projects. Secure payments ensure
everyone gets paid fairly.</div>
            </div>
        </div>
      
    </>
  )
}

export default Wcards
