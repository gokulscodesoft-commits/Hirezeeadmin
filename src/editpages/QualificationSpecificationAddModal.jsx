import React, { useState } from "react";
import "./QualificationSpecification.css";

export default function QualificationSpecificationAddModal({ isOpen, onClose, onSave }) {
  const [specification, setSpecification] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!specification.trim()) return;

    await onSave({ specification });

    setSpecification("");
  };

  if (!isOpen) return null;

  return (
    <div className="qualificationspec-modal-overlay">
      <div className="qualificationspec-modal-content">
        <h3>Add Qualification Specialization</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter specification"
            value={specification}
            onChange={(e) => setSpecification(e.target.value)}
          />
          <div className="qualificationspec-modal-actions">
            <button type="submit" className="qualificationspec-save-btn">
              Save
            </button>
            <button
              type="button"
              className="qualificationspec-cancel-btn"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
