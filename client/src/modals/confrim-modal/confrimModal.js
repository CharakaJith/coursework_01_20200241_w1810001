import './confrimModal.css';

function ConfirmModal({ isOpen, onClose, onConfirm, title, message }) {
  if (!isOpen) return null;

  return (
    <div className="confrim-modal-overlay">
      <div className="confrim-modal-box">
        <h2>{title}</h2>
        <p>{message}</p>
        <div className="confrim-modal-buttons">
          <button type="button" className="confrim-confirm-btn" onClick={onConfirm}>
            Confrim
          </button>
          <button type="button" className="confrim-cancel-btn" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
