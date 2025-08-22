// components/message-wall/MessageFormModal.jsx
'use client';

import { useState } from 'react';
// You would import your server action here
import { submitMessageAction } from '@/app/actions'; 

export default function MessageFormModal({ onClose }) {
  const [formData, setFormData] = useState({
    author_name: '',
    relation: 'Friend',
    content: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    console.log("hello?")
    
    console.log("Submitting:", formData);
    
    const result = await submitMessageAction(formData);

    if (result.success) {
      alert("Thanks! Your message is pending approval.");
      onClose();
    } else {
      alert("Sorry, there was an error: " + result.error);
    }

    setIsSubmitting(false);
    // onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>&times;</button>
        <h2>Add Your Message</h2>
        
        <form onSubmit={handleSubmit}>
          <label htmlFor="author_name">Your Name</label>
          <input 
            type="text" 
            id="author_name" 
            name="author_name" 
            value={formData.author_name}
            onChange={handleChange}
            required 
          />

          <label htmlFor="relation">How do you know me?</label>
          <select 
            id="relation" 
            name="relation" 
            value={formData.relation}
            onChange={handleChange}
          >
            <option value="Friend">Friend</option>
            <option value="Family">Family</option>
            <option value="Classroom">Classroom</option>
            <option value="Follower">Follower</option>
          </select>

          <label htmlFor="content">Message (max 280 characters)</label>
          <textarea 
            id="content" 
            name="content"
            value={formData.content}
            onChange={handleChange}
            maxLength="280"
            required
          />
          
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit Message'}
          </button>
        </form>
      </div>
    </div>
  );
}
