import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import LandingPage from './components/LandingPage';
import Dashboard from './pages/Dashboard';
import { signInWithGoogle, logOut } from './services/firebase';

// Component to protect routes
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}>
        <div style={{ color: 'white', fontSize: '1.5rem' }}>Loading ByteBuddy...</div>
      </div>
    );
  }

  return user ? children : <Navigate to="/" />;
}

function AppContent() {
  const { user } = useAuth();

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

  return (
    <Routes>
      {/* Landing page route */}
      <Route 
        path="/" 
        element={
          user ? <Navigate to="/dashboard" /> : <LandingPage onSignIn={handleSignIn} />
        } 
      />

      {/* Dashboard route (protected) */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard user={user} onSignOut={handleSignOut} />
          </ProtectedRoute>
        } 
      />

      {/* Catch all - redirect to landing */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;