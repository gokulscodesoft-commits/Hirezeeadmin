import React, { useState } from "react";
import "./Languages.css";

export default function 

({ isOpen, onClose, onSave }) {
  const [language, setLanguage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!language.trim()) return;

    await onSave({
      admin_languages: language, // backend field
    });

    setLanguage("");
  };

  if (!isOpen) return null;

  return (
    <div className="language-modal-overlay">
      <div className="language-modal-content">
        <h3>Add Language</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          />
          <div className="language-modal-actions">
            <button type="submit" className="language-save-btn">
              Save
            </button>
            <button
              type="button"
              className="language-cancel-btn"
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
