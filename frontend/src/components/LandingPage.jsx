import React from 'react';

const LandingPage = ({ onSignIn }) => {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      color: 'white'
    }}>
      <div style={{
        textAlign: 'center',
        maxWidth: '800px'
      }}>
        <h1 style={{
          fontSize: '4rem',
          fontWeight: 'bold',
          marginBottom: '20px',
          textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
        }}>ByteBuddy</h1>
        
        <p style={{
          fontSize: '1.5rem',
          marginBottom: '30px',
          opacity: 0.95
        }}>
          Your Campus Skill Marketplace
        </p>
        
        <div style={{
          background: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: '20px',
          padding: '40px',
          marginBottom: '40px',
          border: '1px solid rgba(255,255,255,0.2)'
        }}>
          <p style={{
            fontSize: '1.2rem',
            lineHeight: '1.8',
            marginBottom: '20px'
          }}>
            ByteBuddy is a student-exclusive skill marketplace designed to help college students earn, collaborate, and get work done within their campus ecosystem.
          </p>
          <p style={{
            fontSize: '1.1rem',
            lineHeight: '1.6'
          }}>
            Connect with peers who offer skills or find services you need — all in a safe, campus-verified environment.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
          marginBottom: '50px'
        }}>
          {['Earn Money', 'Find Services', 'Collaborate', 'Campus Safe'].map(feature => (
            <div key={feature} style={{
              background: 'rgba(255,255,255,0.15)',
              padding: '20px',
              borderRadius: '15px',
              border: '1px solid rgba(255,255,255,0.2)'
            }}>
              <h3 style={{ marginBottom: '10px', fontSize: '1.1rem' }}>{feature}</h3>
            </div>
          ))}
        </div>

        <button
          onClick={onSignIn}
          style={{
            background: 'white',
            color: '#667eea',
            padding: '18px 50px',
            fontSize: '1.2rem',
            fontWeight: 'bold',
            border: 'none',
            borderRadius: '50px',
            cursor: 'pointer',
            boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
            transition: 'transform 0.2s'
          }}
          onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
          onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
        >
          🚀 Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default LandingPage;