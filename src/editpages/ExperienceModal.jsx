import React, { useState, useEffect } from "react";
import "./ExperienceModal.css";

const ExperienceModal = ({ isOpen, onClose, onSave, experience }) => {
  const [range, setRange] = useState("");

  useEffect(() => {
    if (experience) {
      setRange(
        `${parseInt(experience.min_value)}-${parseInt(experience.max_value)}`
      );
    }
  }, [experience]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!range.includes("-")) return;

    const [min, max] = range.split("-").map((v) => Number(v.trim()));

    if (isNaN(min) || isNaN(max) || min > max) return;

    onSave({
      id: experience.id,
      experience: `${min}-${max} Experience`, // 🔥 REQUIRED
      min_value: min,
      max_value: max,
    });
  };

  return (
    <div className="experienceModal-overlay">
      <div className="experienceModal-content">
        <h3>Edit Experience</h3>
        <form onSubmit={handleSubmit}>
          <label>Experience (e.g. 5-10)</label>
          <input
            type="text"
            value={range}
            onChange={(e) => setRange(e.target.value)}
            placeholder="e.g. 5-10"
          />

          <div className="experienceModal-actions">
            <button
              type="button"
              className="experienceModal-cancel-btn"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="experienceModal-save-btn">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExperienceModal;
