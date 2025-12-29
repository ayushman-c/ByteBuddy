import React from 'react';
import { User, LogOut } from 'lucide-react';
import './Navbar.css';

const Navbar = ({ user, onSignOut }) => {
  return (
    <div className="navbar">
      <h1 className="navbar-title">ByteBuddy</h1>
      <div className="navbar-right">
        <div className="navbar-user-info">
          {user.photoURL ? (
            <img 
              src={user.photoURL} 
              alt="Profile" 
              className="navbar-profile-img"
            />
          ) : (
            <div className="navbar-profile-placeholder">
              <User size={24} />
            </div>
          )}
          <span className="navbar-username">{user.displayName}</span>
        </div>
        <button onClick={onSignOut} className="navbar-signout-button">
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Navbar;