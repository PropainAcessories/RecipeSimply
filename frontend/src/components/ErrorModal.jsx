import React from "react";
import "./modal.css";

export default function Modal({ open, onClose }) {
  if (!open) return null;
  const frown =":("
  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Site down {frown}</h2>
        <p>
          Our servers are currently unavailable. We're working to fix this as
          quickly as possible.
        </p>

        <button onClick={onClose}>Okay</button>
      </div>
    </div>
  );
}
