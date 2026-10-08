import React, { useState, useContext } from "react";
import "./WorkTypeAddModal.css";
import { WorkTypeContext } from "../UseContexts/RecruiterUseContext/JobPostContext/WorkTypeContext.jsx";

export default function WorkTypeAddModal({ isOpen, onClose }) {
  const [type, setType] = useState("");
  const { addWorkType } = useContext(WorkTypeContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!type.trim()) return;

    try {
      await addWorkType({
        job_type: type, // ✅ match API field
      });
      setType(""); // reset input
      onClose();   // close modal after success
    } catch (error) {
      console.error("Failed to add work type:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay-worktype">
      <div className="modal-content-worktype">
        <h3>Add Work Type</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter work type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
          <div className="modal-actions-worktype">
            <button type="submit" className="save-btn-worktype">
              Save
            </button>
            <button
              type="button"
              className="cancel-btn-worktype"
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
