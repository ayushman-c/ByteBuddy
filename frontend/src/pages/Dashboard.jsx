import React, { useState, useEffect } from 'react';
import { Search, Briefcase, User, Plus } from 'lucide-react';
import Navbar from '../components/Navbar';
import GigCard from '../components/GigCard';
import CreateGigModal from '../components/CreateGigModal';
import ChatModal from '../components/ChatModal';
import { getAllGigs, getUserGigs, createGig as createGigAPI, deleteGig as deleteGigAPI } from '../services/api';

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

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      <Navbar user={user} onSignOut={onSignOut} />

      {/* Tab Navigation */}
      <div style={{
        background: 'white',
        padding: '0 40px',
        borderBottom: '1px solid #e0e0e0',
        display: 'flex',
        gap: '30px'
      }}>
        {[
          { id: 'browse', label: 'Browse Gigs', icon: Search },
          { id: 'my-gigs', label: 'My Gigs', icon: Briefcase },
          { id: 'profile', label: 'Profile', icon: User }
        ].map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                background: 'none',
                border: 'none',
                padding: '20px 0',
                cursor: 'pointer',
                borderBottom: activeTab === tab.id ? '3px solid #667eea' : '3px solid transparent',
                color: activeTab === tab.id ? '#667eea' : '#666',
                fontWeight: activeTab === tab.id ? 'bold' : 'normal',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '1rem',
                transition: 'all 0.2s'
              }}
            >
              <Icon size={20} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div style={{ padding: '40px' }}>
        {activeTab === 'browse' && (
          <div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '30px'
            }}>
              <h2 style={{ fontSize: '1.8rem', color: '#333', margin: 0 }}>Browse Gigs</h2>
              <div style={{ position: 'relative', width: '300px' }}>
                <input
                  type="text"
                  placeholder="Search gigs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 40px 12px 15px',
                    borderRadius: '25px',
                    border: '1px solid #ddd',
                    fontSize: '1rem',
                    boxSizing: 'border-box'
                  }}
                />
                <Search size={20} style={{
                  position: 'absolute',
                  right: '15px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#999'
                }} />
              </div>
            </div>

            {loading ? (
              <div style={{ textAlign: 'center', padding: '40px', color: '#999' }}>
                Loading gigs...
              </div>
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '25px'
              }}>
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
              <div style={{
                textAlign: 'center',
                padding: '60px',
                background: 'white',
                borderRadius: '15px',
                color: '#999'
              }}>
                <Search size={64} style={{ margin: '0 auto 20px', opacity: 0.3 }} />
                <p style={{ fontSize: '1.2rem', margin: 0 }}>No gigs found</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'my-gigs' && (
          <div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '30px'
            }}>
              <h2 style={{ fontSize: '1.8rem', color: '#333', margin: 0 }}>My Gigs</h2>
              <button
                onClick={() => setShowCreateModal(true)}
                style={{
                  background: '#667eea',
                  color: 'white',
                  border: 'none',
                  padding: '12px 25px',
                  borderRadius: '25px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '1rem',
                  transition: 'background 0.2s'
                }}
                onMouseOver={(e) => e.target.style.background = '#5568d3'}
                onMouseOut={(e) => e.target.style.background = '#667eea'}
              >
                <Plus size={20} />
                Create New Gig
              </button>
            </div>

            {loading ? (
              <div style={{ textAlign: 'center', padding: '40px', color: '#999' }}>
                Loading your gigs...
              </div>
            ) : userGigs.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '60px',
                background: 'white',
                borderRadius: '15px',
                color: '#999'
              }}>
                <Briefcase size={64} style={{ margin: '0 auto 20px', opacity: 0.3 }} />
                <p style={{ fontSize: '1.2rem', margin: 0 }}>
                  No gigs yet. Create your first gig to get started!
                </p>
              </div>
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '25px'
              }}>
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
          <div style={{
            maxWidth: '600px',
            margin: '0 auto',
            background: 'white',
            borderRadius: '15px',
            padding: '40px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
          }}>
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="Profile"
                  style={{
                    width: '120px',
                    height: '120px',
                    borderRadius: '50%',
                    marginBottom: '20px',
                    objectFit: 'cover'
                  }}
                />
              ) : (
                <div style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px',
                  color: 'white'
                }}>
                  <User size={60} />
                </div>
              )}
              <h2 style={{ fontSize: '2rem', marginBottom: '10px', color: '#333', margin: '0 0 10px 0' }}>
                {user.displayName}
              </h2>
              <p style={{ color: '#999', fontSize: '1.1rem', margin: 0 }}>{user.email}</p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '20px',
              marginBottom: '30px'
            }}>
              <div style={{
                background: '#f8f9fa',
                padding: '20px',
                borderRadius: '10px',
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: '2rem',
                  fontWeight: 'bold',
                  color: '#667eea',
                  marginBottom: '5px'
                }}>
                  {userGigs.length}
                </div>
                <div style={{ color: '#666' }}>Active Gigs</div>
              </div>
              <div style={{
                background: '#f8f9fa',
                padding: '20px',
                borderRadius: '10px',
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: '2rem',
                  fontWeight: 'bold',
                  color: '#667eea',
                  marginBottom: '5px'
                }}>
                  0
                </div>
                <div style={{ color: '#666' }}>Messages</div>
              </div>
            </div>

            <div style={{
              padding: '20px',
              background: '#f8f9fa',
              borderRadius: '10px'
            }}>
              <h3 style={{ marginBottom: '10px', color: '#333', margin: '0 0 10px 0' }}>
                Profile Information
              </h3>
              <div style={{ color: '#666', lineHeight: '1.8' }}>
                <p style={{ margin: '5px 0' }}>
                  <strong>User ID:</strong> {user.uid}
                </p>
                <p style={{ margin: '5px 0' }}>
                  <strong>Member Since:</strong> {new Date().toLocaleDateString()}
                </p>
                <p style={{ margin: '5px 0' }}>
                  <strong>Status:</strong> <span style={{ color: '#4caf50' }}>Active</span>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
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
