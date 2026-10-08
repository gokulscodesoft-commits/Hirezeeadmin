import React, { useState } from "react";
import "./Languages.css"; // ✅ reuse same styles

export default function ProficiencyAddModal({ isOpen, onClose, onSave }) {
  const [proficiency, setProficiency] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!proficiency.trim()) return;

    await onSave({
      admin_proficiency: proficiency, // ✅ matches API field
    });

    setProficiency("");
  };

  if (!isOpen) return null;

  return (
    <div className="language-modal-overlay">
      <div className="language-modal-content">
        <h3>Add Proficiency</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter proficiency (e.g., Basic, Professional)"
            value={proficiency}
            onChange={(e) => setProficiency(e.target.value)}
          />
          <div className="language-modal-actions">
            <button type="submit" className="language-save-btn">
              Save
            </button>
            <button
              type="button"
              className="language-cancel-btn"
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
