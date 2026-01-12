import React from 'react'
import './Cards.css'

const Cards = () => {
  return (
    <>
      <div className="working-cards-container">
        <div className="working-card-1">
            <div className="card-1-pic"></div>
            <div className="card-heading">College Students Only</div>
            <div className="card-desc">Connect exclusively with verified
students from your campus. Build a
trusted network within your college
community.</div>
        </div>
        <div className="working-card-2">
            <div className="card-2-pic"></div>
            <div className="card-heading">Safe Campus Environment</div>
            <div className="card-desc">Every user is verified with their college
email. Enjoy secure transactions and
reliable communication.</div>
        </div>
        <div className="working-card-3">
            <div className="card-3-pic"></div>
            <div className="card-heading">Easy Payments</div>
            <div className="card-desc">Multiple payment options including
UPI, cards, and wallets. Get paid
quickly and securely for your work.</div>
        </div>
        <div className="working-card-4">
            <div className="card-4-pic"></div>
            <div className="card-heading">Quick Hiring</div>
            <div className="card-desc">Find the right talent in minutes. Browse
gigs, compare prices, and hire
students with proven skills.</div>
        </div>
      </div>
    </>
  )
}

export default Cards
