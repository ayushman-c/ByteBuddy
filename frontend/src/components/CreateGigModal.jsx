import React, { useState } from 'react';
import { X, Sparkles } from 'lucide-react';
import { improveDescription } from '../services/api';
import './CreateGigModal.css';

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
      onCreate({
        ...formData,
        price: parseFloat(formData.price)
      });
      onClose();
    } else {
      alert('Please fill in all fields');
    }
  };

  const categories = [
    { value: '', label: 'Select a category' },
    { value: 'Tutoring', label: 'Tutoring' },
    { value: 'Design', label: 'Design' },
    { value: 'Programming', label: 'Programming' },
    { value: 'Writing', label: 'Writing' },
    { value: 'Other', label: 'Other' }
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Create New Gig</h2>
          <button onClick={onClose} className="modal-close-button">
            <X size={24} />
          </button>
        </div>

        <div className="modal-form-group">
          <label className="modal-label">Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="modal-input"
            placeholder="e.g., Python Tutoring"
          />
        </div>

        <div className="modal-form-group">
          <label className="modal-label">Category</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="modal-input"
          >
            {categories.map(cat => (
              <option key={cat.value} value={cat.value}>{cat.label}</option>
            ))}
          </select>
        </div>

        <div className="modal-form-group">
          <div className="modal-description-header">
            <label className="modal-label">Description</label>
            <button
              onClick={handleImprove}
              disabled={!formData.description || improving}
              className="modal-improve-button"
            >
              <Sparkles size={14} />
              {improving ? 'Improving...' : 'Improve with AI'}
            </button>
          </div>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="modal-textarea"
            placeholder="Describe your service..."
          />
        </div>

        <div className="modal-form-group">
          <label className="modal-label">Price ($)</label>
          <input
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            className="modal-input"
            placeholder="15"
            min="0"
            step="0.01"
          />
        </div>

        <button onClick={handleSubmit} className="modal-submit-button">
          Create Gig
        </button>
      </div>
    </div>
  );
};

export default CreateGigModal;