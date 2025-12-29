import React from 'react';
import { Star, MessageCircle, Trash2 } from 'lucide-react';

const GigCard = ({ gig, onContact, onDelete, isOwner }) => {
  return (
    <div style={{
      background: 'white',
      borderRadius: '15px',
      padding: '25px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
      cursor: 'pointer',
      transition: 'transform 0.2s',
      border: '1px solid #e0e0e0',
      position: 'relative'
    }}
    onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
    onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
    >
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'start',
        marginBottom: '15px'
      }}>
        <div style={{ flex: 1 }}>
          <h3 style={{ 
            fontSize: '1.3rem', 
            marginBottom: '5px', 
            color: '#333',
            margin: '0 0 5px 0'
          }}>
            {gig.title}
          </h3>
          <p style={{ color: '#999', fontSize: '0.9rem', margin: 0 }}>
            by {gig.userName}
          </p>
        </div>
        <span style={{
          background: '#667eea',
          color: 'white',
          padding: '5px 12px',
          borderRadius: '15px',
          fontSize: '0.85rem',
          whiteSpace: 'nowrap'
        }}>
          {gig.category}
        </span>
      </div>
      
      <p style={{
        color: '#666',
        marginBottom: '15px',
        lineHeight: '1.5',
        minHeight: '60px',
        margin: '0 0 15px 0'
      }}>
        {gig.description}
      </p>
      
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: '15px',
        borderTop: '1px solid #f0f0f0'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <Star size={18} fill="#ffc107" color="#ffc107" />
          <span style={{ fontWeight: 'bold', color: '#333' }}>
            {gig.rating > 0 ? gig.rating.toFixed(1) : 'New'}
          </span>
        </div>
        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#667eea' }}>
          ${gig.price}
        </div>
      </div>
      
      {!isOwner && onContact && (
        <button
          onClick={() => onContact(gig)}
          style={{
            width: '100%',
            marginTop: '15px',
            background: '#667eea',
            color: 'white',
            border: 'none',
            padding: '12px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            fontSize: '1rem',
            transition: 'background 0.2s'
          }}
          onMouseOver={(e) => e.target.style.background = '#5568d3'}
          onMouseOut={(e) => e.target.style.background = '#667eea'}
        >
          <MessageCircle size={18} />
          Contact Seller
        </button>
      )}

      {isOwner && onDelete && (
        <button
          onClick={() => onDelete(gig._id)}
          style={{
            width: '100%',
            marginTop: '15px',
            background: '#dc3545',
            color: 'white',
            border: 'none',
            padding: '12px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            fontSize: '1rem',
            transition: 'background 0.2s'
          }}
          onMouseOver={(e) => e.target.style.background = '#c82333'}
          onMouseOut={(e) => e.target.style.background = '#dc3545'}
        >
          <Trash2 size={18} />
          Delete Gig
        </button>
      )}
    </div>
  );
};

export default GigCard;