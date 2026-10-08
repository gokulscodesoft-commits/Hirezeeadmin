import React from "react";
import "./AddSalaryModal.css";

export default function AddSalaryModal({ onClose, onCreate, newRange, setNewRange }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Add Salary Range</h3>
        <div className="modal-body">
          <label>Salary</label>
          <input
            type="text"
            placeholder="₹40,000 - ₹50,000"
            value={newRange}
            onChange={(e) => setNewRange(e.target.value)}
          />
        </div>
        <div className="modal-actions">
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button className="primary-btn" onClick={onCreate}>
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
