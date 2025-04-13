import './deleteModal.css';
import { useState, useEffect } from 'react';

function DeleteModal({ isOpen, onClose, onConfirm, email: propEmail }) {
  const [emailInput, setEmailInput] = useState('');
  const [isMatch, setIsMatch] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setEmailInput('');
    }
  }, [isOpen]);

  useEffect(() => {
    if (propEmail) {
      setIsMatch(emailInput.trim().toLowerCase() === propEmail.toLowerCase());
    } else {
      setIsMatch(false);
    }
  }, [emailInput, propEmail]);

  if (!isOpen) return null;

  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isMatch) {
      onConfirm();
    }
  };

  return (
    <div className="delete-modal-overlay">
      <div className="delete-modal-box">
        <h2>Deactivate Account</h2>
        <p>
          To confirm deactivation, please type <strong>{propEmail}</strong> below.
        </p>
        <form onSubmit={handleSubmit}>
          {/* email input */}
          <input type="email" placeholder="Enter your email" value={emailInput} onChange={(e) => setEmailInput(e.target.value)} />

          <div className="delete-modal-buttons">
            {/* deactivate button */}
            <button type="submit" className="delete-confirm-btn" disabled={!isMatch}>
              Deactivate
            </button>

            {/* cancel button */}
            <button type="button" onClick={onClose} className="delete-cancel-btn">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default DeleteModal;
