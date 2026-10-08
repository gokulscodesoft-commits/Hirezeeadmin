// src/components/LogoutModal.jsx
import React from "react";
import "./LogoutModal.css"; // optional for styling

export default function LogoutModal({ isOpen, onConfirm, onCancel }) {
  if (!isOpen) return null; // do not render if not open

  return (
    <div className="logout-modal-overlay">
      <div className="logout-modal-content">
        <h2>Confirm Logout</h2>
        <p>Are you sure you want to logout?</p>
        <div className="logout-modal-buttons">
          <button className="yes-btn" onClick={onConfirm}>
            Yes
          </button>
          <button className="no-btn" onClick={onCancel}>
            No
          </button>
        </div>
      </div>
    </div>
  );
}
