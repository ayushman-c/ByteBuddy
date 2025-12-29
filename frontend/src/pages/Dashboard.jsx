import React, { useState, useEffect } from 'react';
import { Search, Briefcase, User, Plus } from 'lucide-react';
import Navbar from '../components/Navbar';
import GigCard from '../components/GigCard';
import CreateGigModal from '../components/CreateGigModal';
import ChatModal from '../components/ChatModal';
import { getAllGigs, getUserGigs, createGig as createGigAPI, deleteGig as deleteGigAPI } from '../services/api';
import './Dashboard.css';

const Dashboard = ({ user, onSignOut }) => {
  const [activeTab, setActiveTab] = useState('browse');
  const [allGigs, setAllGigs] = useState([]);
  const [userGigs, setUserGigs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedGig, setSelectedGig] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadGigs();
  }, []);

  const loadGigs = async () => {
    try {
      setLoading(true);
      const [all, myGigs] = await Promise.all([
        getAllGigs(),
        getUserGigs()
      ]);
      setAllGigs(all || []);
      setUserGigs(myGigs || []);
    } catch (error) {
      console.error('Error loading gigs:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Failed to load gigs';
      console.error('Error details:', errorMessage);
      // Set empty arrays on error so UI doesn't break
      setAllGigs([]);
      setUserGigs([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateGig = async (gigData) => {
    try {
      await createGigAPI(gigData);
      setShowCreateModal(false);
      await loadGigs();
    } catch (error) {
      console.error('Error creating gig:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Failed to create gig';
      alert(`Failed to create gig: ${errorMessage}`);
    }
  };

  const handleDeleteGig = async (gigId) => {
    if (!window.confirm('Are you sure you want to delete this gig?')) return;
    
    try {
      await deleteGigAPI(gigId);
      await loadGigs();
    } catch (error) {
      console.error('Error deleting gig:', error);
      alert('Failed to delete gig');
    }
  };

  const filteredGigs = allGigs.filter(gig =>
    gig.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    gig.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    gig.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const tabs = [
    { id: 'browse', label: 'Browse Gigs', icon: Search },
    { id: 'my-gigs', label: 'My Gigs', icon: Briefcase },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  return (
    <div className="dashboard">
      <Navbar user={user} onSignOut={onSignOut} />

      <div className="dashboard-tabs">
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`dashboard-tab-button ${
                activeTab === tab.id ? 'dashboard-tab-button-active' : ''
              }`}
            >
              <Icon size={20} />
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="dashboard-content">
        {activeTab === 'browse' && (
          <div>
            <div className="dashboard-section-header">
              <h2 className="dashboard-section-title">Browse Gigs</h2>
              <div className="dashboard-search-container">
                <input
                  type="text"
                  placeholder="Search gigs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="dashboard-search-input"
                />
                <Search size={20} className="dashboard-search-icon" />
              </div>
            </div>

            {loading ? (
              <div className="dashboard-loading">Loading gigs...</div>
            ) : (
              <div className="dashboard-gigs-grid">
                {filteredGigs.map(gig => (
                  <GigCard
                    key={gig._id}
                    gig={gig}
                    onContact={setSelectedGig}
                    isOwner={gig.userId === user.dbUser?._id}
                  />
                ))}
              </div>
            )}

            {!loading && filteredGigs.length === 0 && (
              <div className="dashboard-empty">
                <Search size={64} className="dashboard-empty-icon" />
                <p className="dashboard-empty-text">No gigs found</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'my-gigs' && (
          <div>
            <div className="dashboard-section-header">
              <h2 className="dashboard-section-title">My Gigs</h2>
              <button
                onClick={() => setShowCreateModal(true)}
                className="dashboard-create-button"
              >
                <Plus size={20} />
                Create New Gig
              </button>
            </div>

            {loading ? (
              <div className="dashboard-loading">Loading your gigs...</div>
            ) : userGigs.length === 0 ? (
              <div className="dashboard-empty">
                <Briefcase size={64} className="dashboard-empty-icon" />
                <p className="dashboard-empty-text">
                  No gigs yet. Create your first gig to get started!
                </p>
              </div>
            ) : (
              <div className="dashboard-gigs-grid">
                {userGigs.map(gig => (
                  <GigCard
                    key={gig._id}
                    gig={gig}
                    onDelete={handleDeleteGig}
                    isOwner={true}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="dashboard-profile-container">
            <div className="dashboard-profile-header">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="Profile"
                  className="dashboard-profile-img"
                />
              ) : (
                <div className="dashboard-profile-placeholder">
                  <User size={60} />
                </div>
              )}
              <h2 className="dashboard-profile-name">{user.displayName}</h2>
              <p className="dashboard-profile-email">{user.email}</p>
            </div>

            <div className="dashboard-profile-stats">
              <div className="dashboard-stat-card">
                <div className="dashboard-stat-value">{userGigs.length}</div>
                <div className="dashboard-stat-label">Active Gigs</div>
              </div>
              <div className="dashboard-stat-card">
                <div className="dashboard-stat-value">0</div>
                <div className="dashboard-stat-label">Messages</div>
              </div>
            </div>

            <div className="dashboard-profile-info">
              <h3 className="dashboard-profile-info-title">Profile Information</h3>
              <div className="dashboard-profile-info-content">
                <p className="dashboard-profile-info-item">
                  <strong>User ID:</strong> {user.uid}
                </p>
                <p className="dashboard-profile-info-item">
                  <strong>Member Since:</strong> {new Date().toLocaleDateString()}
                </p>
                <p className="dashboard-profile-info-item">
                  <strong>Status:</strong> <span className="dashboard-profile-status">Active</span>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {showCreateModal && (
        <CreateGigModal
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreateGig}
        />
      )}

      {selectedGig && (
        <ChatModal
          gig={selectedGig}
          user={user}
          onClose={() => setSelectedGig(null)}
        />
      )}
    </div>
  );
};

export default Dashboard;
