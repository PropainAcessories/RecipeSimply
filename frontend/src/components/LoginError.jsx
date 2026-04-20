import "./ErrorModal.css";

function LoginError({ message, onClose }) {
  if (!message) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3>Login Error</h3>
        <p>{message}</p>

        <button className="close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

export default LoginError;
