import React, { useState, useContext } from "react";
import { toast } from "react-toastify";
import "./JobPostSubjectAddModal.css";
import { JobRoleContext } from "../UseContexts/RecruiterUseContext/JobPostContext/JobRoleContext.jsx";

export default function JobPostJobRoleAddModal({ isOpen, onClose, categories }) {
  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const { addJobRole } = useContext(JobRoleContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error("Please enter a job role");
      return;
    }

    try {
      await addJobRole({ title, job_role_category_id: categoryId || null });
      setTitle("");
      setCategoryId("");
      onClose();
    } catch (error) {
      // JobRoleContext.addJobRole already toasts on failure — just log here.
      console.error("Failed to add job role:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Add Job Role</h3>
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
            placeholder="Enter job role"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
