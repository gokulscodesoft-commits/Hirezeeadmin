// src/pages/EducationAddModal.jsx
import React, { useState, useContext } from "react";
import "./EducationAddModal.css";
import { SeekerEduQualification as SeekerEduQualificationContext } from "../UseContexts/SeekerUseContext/SeekerEduQualificationContext";

export default function EducationAddModal({ isOpen, onClose }) {
  const [qualificationName, setQualificationName] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Correct context name
  const { addQualification } = useContext(SeekerEduQualificationContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!qualificationName.trim()) return;

    setLoading(true);
    const newItem = {
      education_qualification_list: qualificationName,
    };

    try {
      await addQualification(newItem); // API handled in context
      setQualificationName(""); // reset input
      onClose(); // close modal
    } catch (err) {
      console.error("Error adding qualification:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="education-modal-overlay">
      <div className="education-modal-content">
        <h3>Add Education Qualification</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter qualification"
            value={qualificationName}
            onChange={(e) => setQualificationName(e.target.value)}
            disabled={loading}
          />
          <div className="education-modal-actions">
            <button
              type="submit"
              className="education-save-btn"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </button>
            <button
              type="button"
              className="education-cancel-btn"
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
