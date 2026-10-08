import React, { useState, useEffect } from "react";
import "./QualificationSpecification.css";

export default function QualificationSpecificationEditModal({
  specificationItem,
  isOpen,
  onClose,
  onSave,
}) {
  const [specification, setSpecification] = useState("");

  useEffect(() => {
    setSpecification(specificationItem?.specification || "");
  }, [specificationItem]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!specification.trim()) return;
    onSave({ id: specificationItem.id, specification });
  };

  return (
    <div className="qualificationspec-modal-overlay">
      <div className="qualificationspec-modal-content">
        <h3>Edit Qualification Specialization</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
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
