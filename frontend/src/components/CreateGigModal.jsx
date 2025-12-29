import React, { useState } from 'react';
import { X, Sparkles } from 'lucide-react';
import { improveDescription } from '../services/api';

const CreateGigModal = ({ onClose, onCreate }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: ''
  });
  const [improving, setImproving] = useState(false);

  const handleImprove = async () => {
    if (!formData.description) return;
    
    setImproving(true);
    try {
      const improved = await improveDescription(formData.description);
      setFormData({ ...formData, description: improved });
    } catch (error) {
      console.error('Error improving description:', error);
      alert('Failed to improve description. Please try again.');
    }
    setImproving(false);
  };

  const handleSubmit = () => {
    if (formData.title && formData.description && formData.price && formData.category) {
      // Convert price to number before sending
      onCreate({
        ...formData,
        price: parseFloat(formData.price)
      });
      onClose();
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        background: 'white',
        borderRadius: '15px',
        padding: '30px',
        maxWidth: '500px',
        width: '90%',
        maxHeight: '90vh',
        overflow: 'auto'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '25px'
        }}>
          <h2 style={{ fontSize: '1.5rem', color: '#333', margin: 0 }}>Create New Gig</h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#999',
              padding: '5px'
            }}
          >
            <X size={24} />
          </button>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '8px', 
            color: '#333', 
            fontWeight: 'bold' 
          }}>
            Title
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid #ddd',
              fontSize: '1rem',
              boxSizing: 'border-box'
            }}
            placeholder="e.g., Python Tutoring"
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '8px', 
            color: '#333', 
            fontWeight: 'bold' 
          }}>
            Category
          </label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid #ddd',
              fontSize: '1rem',
              boxSizing: 'border-box'
            }}
          >
            <option value="">Select a category</option>
            <option value="Tutoring">Tutoring</option>
            <option value="Design">Design</option>
            <option value="Programming">Programming</option>
            <option value="Writing">Writing</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '8px'
          }}>
            <label style={{ color: '#333', fontWeight: 'bold' }}>
              Description
            </label>
            <button
              onClick={handleImprove}
              disabled={!formData.description || improving}
              style={{
                background: improving ? '#ddd' : '#667eea',
                color: 'white',
                border: 'none',
                padding: '6px 12px',
                borderRadius: '15px',
                cursor: improving ? 'not-allowed' : 'pointer',
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}
            >
              <Sparkles size={14} />
              {improving ? 'Improving...' : 'Improve with AI'}
            </button>
          </div>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid #ddd',
              fontSize: '1rem',
              minHeight: '120px',
              resize: 'vertical',
              boxSizing: 'border-box',
              fontFamily: 'inherit'
            }}
            placeholder="Describe your service..."
          />
        </div>

        <div style={{ marginBottom: '25px' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '8px', 
            color: '#333', 
            fontWeight: 'bold' 
          }}>
            Price ($)
          </label>
          <input
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid #ddd',
              fontSize: '1rem',
              boxSizing: 'border-box'
            }}
            placeholder="15"
            min="0"
            step="0.01"
          />
        </div>

        <button
          onClick={handleSubmit}
          style={{
            width: '100%',
            background: '#667eea',
            color: 'white',
            border: 'none',
            padding: '15px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '1rem',
            transition: 'background 0.2s'
          }}
          onMouseOver={(e) => e.target.style.background = '#5568d3'}
          onMouseOut={(e) => e.target.style.background = '#667eea'}
        >
          Create Gig
        </button>
      </div>
    </div>
  );
};

export default CreateGigModal;