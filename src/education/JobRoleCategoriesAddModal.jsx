import React, { useState } from "react";
import { toast } from "react-toastify";
import "./JobRoleCategoriesAddModal.css";

export default function JobRoleCategoriesAddModal({ isOpen, onClose, onSave }) {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value.trim()) {
      toast.error("Please enter a job role category");
      return;
    }

    onSave(value); // calls addJobRoleCategory from context
    setValue(""); // reset
    onClose(); // close modal
  };

  if (!isOpen) return null;

  return (
    <div className="jobrolecateg-modal-overlay">
      <div className="jobrolecateg-modal-content">
        <h2>Add Job Category</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter category (e.g. teaching)"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />

          <div className="jobrolecateg-modal-actions">
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
