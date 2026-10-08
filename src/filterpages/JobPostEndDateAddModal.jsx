import React, { useState } from "react";
import "./JobPostEndDateFilter.css";

export default function JobPostEndDateAddModal({ isOpen, onClose, onSave }) {
  const [endDate, setEndDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!endDate) return;
    onSave({
      endDate,
      postedOn: new Date().toLocaleDateString(),
      createdBy: "Admin",
    });
    setEndDate("");
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Add End Date</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter end date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          <div className="modal-actions">
            <button type="submit" className="save-btn">
              Save
            </button>
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
