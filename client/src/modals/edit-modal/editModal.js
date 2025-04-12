import { useState, useEffect } from 'react';
import './editModal.css';

function EditModal({ isOpen, onClose, onSubmit, firstName: propFirstName, lastName: propLastName }) {
  const [firstName, setFirstName] = useState(propFirstName);
  const [lastName, setLastName] = useState(propLastName);

  // Update state if props change (e.g., when EditModal is reopened with different values)
  useEffect(() => {
    setFirstName(propFirstName);
    setLastName(propLastName);
  }, [propFirstName, propLastName]);

  const handleFirstNameChange = (e) => setFirstName(e.target.value);
  const handleLastNameChange = (e) => setLastName(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ firstName, lastName });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="edit-modal-overlay">
      <div className="edit-modal-box">
        <h2>Edit Personal Details</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="first-name">First Name: </label>
            <input id="first-name" type="text" value={firstName} onChange={handleFirstNameChange} required />
          </div>
          <div className="input-group">
            <label htmlFor="last-name">Last Name: </label>
            <input id="last-name" type="text" value={lastName} onChange={handleLastNameChange} required />
          </div>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default EditModal;
