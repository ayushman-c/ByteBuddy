import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import LandingPage from './components/LandingPage';
import Dashboard from './pages/Dashboard';
import { signInWithGoogle, logOut } from './services/firebase';
import './App.css';

function AppContent() {
  const { user, loading } = useAuth();

  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Sign in error:', error);
      alert('Failed to sign in. Please try again.');
    }
  };

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  if (loading) {
    return (
      <div className="app-loading">
        <div className="app-loading-text">Loading ByteBuddy...</div>
      </div>
    );
  }

  return user ? (
    <Dashboard user={user} onSignOut={handleSignOut} />
  ) : (
    <LandingPage onSignIn={handleSignIn} />
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;