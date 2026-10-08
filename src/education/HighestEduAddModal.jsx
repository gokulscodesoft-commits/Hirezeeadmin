import React, { useState } from "react";
import "./HighestEduAddModal.css";

export default function HighestEduAddModal({ isOpen, onClose, onSave }) {
  const [degree, setDegree] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!degree.trim()) return;

    const newItem = {
      highest_qualification: degree, // ✅ match API field
    };

    setLoading(true);
    await onSave(newItem); // this calls context -> API
    setLoading(false);

    setDegree("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="highestedu-modal-overlay">
      <div className="highestedu-modal-content">
        <h2>Add New Degree</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter Degree Name"
            value={degree}
            onChange={(e) => setDegree(e.target.value)}
            disabled={loading}
          />

          <div className="highestedu-modal-actions">
            <button type="submit" className="save-btn" disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </button>
            <button
              type="button"
              className="cancel-btn"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
