import React from "react";
import { MdClose } from "react-icons/md";
import "./SurveyDeleteConfirmModal.css";

export default function SurveyDeleteConfirmModal({ isOpen, onConfirm, onCancel, questionText }) {
  if (!isOpen) return null;

  return (
    <div className="survey-delete-overlay">
      <div className="survey-delete-modal">
        <div className="survey-delete-header">
          <h3>Delete Question</h3>
          <button className="survey-delete-close" onClick={onCancel}>
            <MdClose size={24} />
          </button>
        </div>

        <div className="survey-delete-body">
          <p className="survey-delete-message">
            This question already sent to seeker and recruiter
          </p>
          <p className="survey-delete-question">
            <strong>"{questionText}"</strong>
          </p>
          <p className="survey-delete-warning">Are you sure you want to delete this question?</p>
        </div>

        <div className="survey-delete-actions">
          <button className="survey-delete-cancel-btn" onClick={onCancel}>
            Cancel
          </button>
          <button className="survey-delete-confirm-btn" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
