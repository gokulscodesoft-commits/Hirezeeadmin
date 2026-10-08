import React, { useState, useEffect } from "react";
import "./TeachingQualEditModal.css";

export default function TeachingQualEditModal({
  isOpen,
  onClose,
  onSave,
  value,
  categories,
}) {
  const [qualificationName, setQualificationName] = useState("");
  const [categoryId, setCategoryId] = useState("");

  // ✅ Populate input when modal opens
  useEffect(() => {
    if (value) {
      setQualificationName(value.qualification_name || "");
      setCategoryId(value.job_role_category_id || "");
    }
  }, [value]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!qualificationName.trim()) return;

    // ✅ Always preserve the ID when saving
    onSave({
      id: value.id, // explicitly keep ID
      qualification_name: qualificationName,
      job_role_category_id: categoryId || null,
    });

    onClose(); // close modal after save
  };

  if (!isOpen) return null;

  return (
    <div className="teachingqualif-modal-overlay">
      <div className="teachingqualif-modal-content">
        <h2>Edit Teaching Qualification</h2>

        <form onSubmit={handleSubmit}>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          >
            <option value="">Select Job Role Category (optional)</option>
            {(categories || []).map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.label}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Enter Qualification"
            value={qualificationName}
            onChange={(e) => setQualificationName(e.target.value)}
          />

          <div className="teachingqualif-modal-actions">
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
