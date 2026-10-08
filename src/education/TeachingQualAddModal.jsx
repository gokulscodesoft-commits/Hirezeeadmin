import React, { useState } from "react";
import "./TeachingQualAddModal.css";

export default function TeachingQualAddModal({
  isOpen,
  onClose,
  onSave,
  categories,
  defaultCategoryId,
}) {
  const [qualificationName, setQualificationName] = useState("");
  const [categoryId, setCategoryId] = useState(defaultCategoryId || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!qualificationName.trim() || !categoryId) return;

    // 👇 job_role_category_id is required — POST is scoped by it in the URL
    const newItem = {
      qualification_name: qualificationName,
      job_role_category_id: categoryId,
    };

    onSave(newItem); // calls addTeachingQual from context
    setQualificationName(""); // reset
    onClose(); // close modal
  };

  if (!isOpen) return null;

  return (
    <div className="teachingqualif-modal-overlay">
      <div className="teachingqualif-modal-content">
        <h2>Add Teaching Qualification</h2>

        <form onSubmit={handleSubmit}>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          >
            <option value="">Select Job Role Category</option>
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
