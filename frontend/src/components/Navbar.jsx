import React from 'react';
import { User, LogOut } from 'lucide-react';

const Navbar = ({ user, onSignOut }) => {
  return (
    <div style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      padding: '20px 40px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>ByteBuddy</h1>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {user.photoURL ? (
            <img 
              src={user.photoURL} 
              alt="Profile" 
              style={{ 
                width: '40px', 
                height: '40px', 
                borderRadius: '50%',
                objectFit: 'cover'
              }} 
            />
          ) : (
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <User size={24} />
            </div>
          )}
          <span style={{ fontWeight: '500' }}>{user.displayName}</span>
        </div>
        <button
          onClick={onSignOut}
          style={{
            background: 'rgba(255,255,255,0.2)',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '20px',
            color: 'white',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            fontWeight: '500',
            transition: 'background 0.2s'
          }}
          onMouseOver={(e) => e.target.style.background = 'rgba(255,255,255,0.3)'}
          onMouseOut={(e) => e.target.style.background = 'rgba(255,255,255,0.2)'}
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Navbar;