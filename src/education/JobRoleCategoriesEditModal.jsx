import React, { useState, useEffect } from "react";
import "./JobRoleCategoriesAddModal.css";

export default function JobRoleCategoriesEditModal({ isOpen, onClose, onSave, value }) {
  const [categoryValue, setCategoryValue] = useState("");

  // Populate inputs when modal opens
  useEffect(() => {
    if (value) {
      setCategoryValue(value.value || "");
    }
  }, [value]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!categoryValue.trim()) return;

    onSave({
      id: value.id, // explicitly keep ID
      value: categoryValue,
    });

    onClose(); // close modal after save
  };

  if (!isOpen) return null;

  return (
    <div className="jobrolecateg-modal-overlay">
      <div className="jobrolecateg-modal-content">
        <h2>Edit Job Category</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter category (e.g. teaching)"
            value={categoryValue}
            onChange={(e) => setCategoryValue(e.target.value)}
          />

          <div className="jobrolecateg-modal-actions">
            <button type="submit" className="save-btn">
              Update
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
