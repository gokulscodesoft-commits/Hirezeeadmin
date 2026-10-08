import React, { useState, useEffect, useContext } from "react";
import "./SurveyQuestionAddModal.css";
import { SurveyQuestionContext } from "../UseContexts/GeneralUseContext/SurveyQuestionContext/SurveyQuestionContext.jsx";
import { MdClose } from "react-icons/md";

export default function SurveyQuestionAddModal({ isOpen, onClose, editingQuestion }) {
  const { addQuestion, updateQuestion, questions } = useContext(SurveyQuestionContext);
  const [formData, setFormData] = useState({
    set_number: 1,
    question: "",
    question_type: "text",
    options: [],
    order_number: 1,
  });
  const [optionsInput, setOptionsInput] = useState("");
  const [error, setError] = useState("");

  // Populate form if editing or auto-set order number
  useEffect(() => {
    if (editingQuestion) {
      setFormData({
        set_number: editingQuestion.set_number,
        question: editingQuestion.question,
        question_type: editingQuestion.question_type,
        options: editingQuestion.options || [],
        order_number: editingQuestion.order_number,
      });
      setOptionsInput(
        Array.isArray(editingQuestion.options)
          ? editingQuestion.options.join(", ")
          : editingQuestion.options || ""
      );
    } else {
      // Auto-generate order number based on set
      const questionsInSet = questions.filter(
        (q) => q.set_number === formData.set_number
      );
      const nextOrder = questionsInSet.length + 1;
      setFormData((prev) => ({
        ...prev,
        order_number: nextOrder,
      }));
    }
  }, [editingQuestion, formData.set_number, questions]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "set_number" || name === "order_number" ? parseInt(value) : value,
    }));
    setError("");
  };

  const handleOptionsChange = (e) => {
    setOptionsInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!formData.question.trim()) {
      setError("Question text is required");
      return;
    }

    if (formData.set_number < 1 || formData.set_number > 5) {
      setError("Set number must be between 1 and 5");
      return;
    }

    if (formData.order_number < 1) {
      setError("Order number must be at least 1");
      return;
    }

    // Handle options for multiple_choice
    let submitData = { ...formData };
    if (formData.question_type === "multiple_choice") {
      if (!optionsInput.trim()) {
        setError("Please enter at least one option");
        return;
      }
      submitData.options = optionsInput
        .split(",")
        .map((opt) => opt.trim())
        .filter((opt) => opt.length > 0);

      if (submitData.options.length === 0) {
        setError("Please enter at least one valid option");
        return;
      }
    } else {
      submitData.options = [];
    }

    try {
      if (editingQuestion) {
        await updateQuestion(editingQuestion.id, submitData);
      } else {
        await addQuestion(submitData);
      }
      setFormData({
        set_number: 1,
        question: "",
        question_type: "text",
        options: [],
        order_number: 1,
      });
      setOptionsInput("");
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save question");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="survey-modal-overlay">
      <div className="survey-modal-content">
        <div className="survey-modal-header">
          <h3>{editingQuestion ? "Edit Survey Question" : "Add Survey Question"}</h3>
          <button className="survey-modal-close" onClick={onClose}>
            <MdClose size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="survey-modal-form">
          {error && <div className="survey-modal-error">{error}</div>}

          {/* Set Number */}
          <div className="survey-form-group">
            <label>Survey Set *</label>
            <select
              name="set_number"
              value={formData.set_number}
              onChange={handleInputChange}
              disabled={!!editingQuestion}
            >
              <option value={1}>Set 1</option>
              <option value={2}>Set 2</option>
              <option value={3}>Set 3</option>
              <option value={4}>Set 4</option>
              <option value={5}>Set 5</option>
            </select>
          </div>

          {/* Question Text */}
          <div className="survey-form-group">
            <label>Question *</label>
            <textarea
              name="question"
              value={formData.question}
              onChange={handleInputChange}
              placeholder="Enter the survey question"
              rows="3"
            />
          </div>

          {/* Question Type */}
          <div className="survey-form-group">
            <label>Question Type *</label>
            <select
              name="question_type"
              value={formData.question_type}
              onChange={handleInputChange}
            >
              <option value="text">Text (Free-form response)</option>
              <option value="multiple_choice">Multiple Choice</option>
              <option value="rating">Rating (1-5 scale)</option>
            </select>
          </div>

          {/* Options (only for multiple_choice) */}
          {formData.question_type === "multiple_choice" && (
            <div className="survey-form-group">
              <label>Options * (comma-separated)</label>
              <textarea
                value={optionsInput}
                onChange={handleOptionsChange}
                placeholder="e.g., Option 1, Option 2, Option 3"
                rows="3"
              />
              <p className="survey-form-help">
                Enter each option separated by a comma. Example: Friend, Social Media, Google
              </p>
            </div>
          )}

          {/* Order Number */}
          <div className="survey-form-group">
            <label>Order Number</label>
            <input
              type="number"
              name="order_number"
              value={formData.order_number}
              onChange={handleInputChange}
              min="1"
              disabled
              placeholder="Auto-generated"
            />
            <p className="survey-form-help">Automatically assigned based on question count</p>
          </div>

          {/* Actions */}
          <div className="survey-modal-actions">
            <button type="button" className="survey-modal-cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="survey-modal-save-btn">
              {editingQuestion ? "Update" : "Add"} Question
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
