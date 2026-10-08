import React from "react";
import "./EditSalaryModal.css";

export default function EditSalaryModal({ onClose, onSave, newRange, setNewRange }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Edit Salary Range</h3>
        <div className="modal-body">
          <label>Salary</label>
          <input
            type="text"
            value={newRange}
            onChange={(e) => setNewRange(e.target.value)}
          />
        </div>
        <div className="modal-actions">
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button className="primary-btn" onClick={onSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
