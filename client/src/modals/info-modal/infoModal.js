import './infoModal.css';

function InfoModal({ isOpen, onConfrim, message }) {
  if (!isOpen) return null;

  return (
    <div className="info-modal-overlay">
      <div className="info-modal-box">
        <p>{message}</p>
        <div className="info-modal-buttons">
          <button className="info-confrim-button" onClick={onConfrim}>
            Confrim
          </button>
        </div>
      </div>
    </div>
  );
}

export default InfoModal;
