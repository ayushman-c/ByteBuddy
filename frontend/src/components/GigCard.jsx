import React from 'react';
import { Star, MessageCircle, Trash2 } from 'lucide-react';
import './GigCard.css';

const GigCard = ({ gig, onContact, onDelete, isOwner }) => {
  return (
    <div className="gig-card">
      <div className="gig-card-header">
        <div className="gig-card-title-section">
          <h3 className="gig-card-title">{gig.title}</h3>
          <p className="gig-card-author">by {gig.userName}</p>
        </div>
        <span className="gig-card-category">{gig.category}</span>
      </div>
      
      <p className="gig-card-description">{gig.description}</p>
      
      <div className="gig-card-footer">
        <div className="gig-card-rating">
          <Star size={18} fill="#ffc107" color="#ffc107" />
          <span className="gig-card-rating-text">
            {gig.rating > 0 ? gig.rating.toFixed(1) : 'New'}
          </span>
        </div>
        <div className="gig-card-price">${gig.price}</div>
      </div>
      
      {!isOwner && onContact && (
        <button onClick={() => onContact(gig)} className="gig-card-button">
          <MessageCircle size={18} />
          Contact Seller
        </button>
      )}

      {isOwner && onDelete && (
        <button 
          onClick={() => onDelete(gig._id)} 
          className="gig-card-button gig-card-button-delete"
        >
          <Trash2 size={18} />
          Delete Gig
        </button>
      )}
    </div>
  );
};

export default GigCard;