import './editModal.css';
import { useState, useEffect } from 'react';

function EditModal({ isOpen, onClose, onConfirm, firstName: propFirstName, lastName: propLastName }) {
  const [firstName, setFirstName] = useState(propFirstName);
  const [lastName, setLastName] = useState(propLastName);

  useEffect(() => {
    setFirstName(propFirstName);
    setLastName(propLastName);
  }, [propFirstName, propLastName]);

  // handle first name change
  const handleFirstNameChange = (e) => setFirstName(e.target.value);

  // handle last name change
  const handleLastNameChange = (e) => setLastName(e.target.value);

  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm({ firstName, lastName });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="edit-modal-overlay">
      <div className="edit-modal-box">
        {/* modal header */}
        <h2>Edit Personal Details</h2>
        <form onSubmit={handleSubmit}>
          {/* form inputs */}
          <div className="input-group">
            <label htmlFor="first-name">First Name: </label>
            <input id="first-name" type="text" value={firstName} onChange={handleFirstNameChange} required />
          </div>
          <div className="input-group">
            <label htmlFor="last-name">Last Name: </label>
            <input id="last-name" type="text" value={lastName} onChange={handleLastNameChange} required />
          </div>

          {/* close button */}
          <button type="button" onClick={onClose}>
            Cancel
          </button>

          {/* submit button */}
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default EditModal;
