// src/editpages/AddExperienceModal.jsx
import React, { useState, useEffect } from "react";
import "./AddExperienceModal.css";

export default function AddExperienceModal({
  isOpen,
  onClose,
  onSave,
  experience,
}) {
  // const [experience, setExperience] = useState("");

  const [range, setRange] = useState("");

  // const handleSubmit = () => {
  //   if (experience.trim()) {
  //     onSave({ experience }); // ✅ correct field
  //     setExperience("");
  //   }
  // };
  useEffect(() => {
    if (experience) {
      setRange(
        `${parseInt(experience.min_value)}-${parseInt(experience.max_value)}`
      );
    }
  }, [experience]);

  const handleSubmit = () => {
    if (!range.includes("-")) return;

    const [min, max] = range.split("-").map((v) => Number(v.trim()));

    if (isNaN(min) || isNaN(max) || min > max) return;

    onSave({
      experience: `${min}-${max} Experience`,
      min_value: min,
      max_value: max,
    });

    setRange("");
  };

  if (!isOpen) return null;

  return (
    // <div className="addExperienceModal-overlay">
    //   <div className="addExperienceModal-content">
    //     <h3>Add Experience</h3>
    //     <div className="addExperienceModal-field">
    //       <label>Experience</label>
    //       <input
    //         type="text"
    //         value={experience}
    //         onChange={(e) => setExperience(e.target.value)}
    //         placeholder="Enter experience"
    //       />
    //     </div>

    //     <div className="addExperienceModal-actions">
    //       <button className="addExperienceModal-cancel-btn" onClick={onClose}>
    //         Cancel
    //       </button>
    //       <button
    //         className="addExperienceModal-save-btn"
    //         onClick={handleSubmit}
    //       >
    //         Create
    //       </button>
    //     </div>
    //   </div>
    // </div>
    <div className="addExperienceModal-overlay">
      <div className="addExperienceModal-content">
        <h3>Add Experience</h3>

        <label>Experience (Years)</label>
        <input
          value={range}
          onChange={(e) => setRange(e.target.value)}
          placeholder="e.g. 5-10"
        />

        <div className="addExperienceModal-actions">
          <button onClick={onClose} className="addExperienceModal-cancel-btn">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="addExperienceModal-save-btn"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
