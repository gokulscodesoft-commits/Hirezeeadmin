import React from "react";
import "./EndDateEditModal.css";

export default function EndDateEditModal({ onClose, onSave, newDate, setNewDate }) {
  return (
    <div className="enddateeditmodal-overlay">
      <div className="enddateeditmodal-content">
        <h3>Edit End Date</h3>
        <div className="enddateeditmodal-body">
          <label>End Date</label>
          <input
            type="text"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
            placeholder="e.g. 15 Days"
          />
        </div>
        <div className="enddateeditmodal-actions">
          <button className="enddateeditmodal-cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button
            className="enddateeditmodal-primary-btn"
            onClick={onSave}
            disabled={!newDate.trim()}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
