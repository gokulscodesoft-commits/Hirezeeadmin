import React, { useState } from "react";
import { toast } from "react-toastify";
import "./SubjectAddModal.css";

export default function SubjectAddModal({ isOpen, onClose, onSave, categories }) {
  const [subject, setSubject] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!categoryId) {
      toast.error("Please select a Job Role Category");
      return;
    }

    if (!subject.trim()) {
      toast.error("Please enter a specialization name");
      return;
    }

    // Pass API-compatible data
    await onSave({
      category_name: subject,   // ✅ matches your backend field
      job_role_category_id: categoryId,
    });

    setSubject("");
    setCategoryId("");
  };

  if (!isOpen) return null;

  return (
    <div className="subject-modal-overlay">
      <div className="subject-modal-content">
        <h3>Add Specialization</h3>
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
            placeholder="Enter Specialization"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
          <div className="subject-modal-actions">
            <button type="submit" className="subject-save-btn">
              Save
            </button>
            <button
              type="button"
              className="subject-cancel-btn"
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
