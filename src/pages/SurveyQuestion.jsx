import React, { useState, useContext } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BiSolidEdit } from "react-icons/bi";
import { SurveyQuestionContext } from "../UseContexts/GeneralUseContext/SurveyQuestionContext/SurveyQuestionContext.jsx";
import SurveyQuestionAddModal from "../editpages/SurveyQuestionAddModal.jsx";
import SurveyDeleteConfirmModal from "../editpages/SurveyDeleteConfirmModal.jsx";
import "./SurveyQuestion.css";

export default function SurveyQuestion() {
  const { questions, loading, error, deleteQuestion } = useContext(SurveyQuestionContext);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [questionToDelete, setQuestionToDelete] = useState(null);

  // Handle Delete - Open Modal
  const handleDeleteClick = (question) => {
    setQuestionToDelete(question);
    setIsDeleteModalOpen(true);
  };

  // Confirm Delete
  const handleConfirmDelete = async () => {
    if (questionToDelete) {
      try {
        await deleteQuestion(questionToDelete.id);
        setIsDeleteModalOpen(false);
        setQuestionToDelete(null);
      } catch (err) {
        console.error("Error deleting question:", err);
      }
    }
  };

  // Cancel Delete
  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setQuestionToDelete(null);
  };

  // Handle Edit
  const handleEdit = (question) => {
    setEditingQuestion(question);
    setIsAddModalOpen(true);
  };

  // Format question type display
  const formatQuestionType = (type) => {
    if (!type) return "-";
    return type.charAt(0).toUpperCase() + type.slice(1).replace("_", " ");
  };

  // Group questions by set
  const groupedBySet = questions.reduce((acc, question) => {
    const setNum = question.set_number || "Unknown";
    if (!acc[setNum]) acc[setNum] = [];
    acc[setNum].push(question);
    return acc;
  }, {});

  // Sort sets numerically
  const sortedSets = Object.keys(groupedBySet).sort((a, b) => {
    if (a === "Unknown") return 1;
    if (b === "Unknown") return -1;
    return parseInt(a) - parseInt(b);
  });

  if (loading) return <div className="survey-loading">Loading survey questions...</div>;
  if (error) return <div className="survey-error">Error: {error}</div>;

  return (
    <div className="survey-question-container">
      <div className="survey-question-header">
        <h2>Survey Questions</h2>
        <button
          className="survey-question-add-btn"
          onClick={() => {
            setEditingQuestion(null);
            setIsAddModalOpen(true);
          }}
        >
          Add Question
        </button>
      </div>

      {questions.length === 0 ? (
        <div className="survey-empty">
          <p>No survey questions found. Click "Add Question" to get started.</p>
        </div>
      ) : (
        <div className="survey-sets-container">
          {sortedSets.map((setNumber) => (
            <div key={setNumber} className="survey-set-section">
              <h3 className="survey-set-title">
                {setNumber === "Unknown" ? "Unknown Set" : `Set ${setNumber}`}
              </h3>
              <div className="survey-set-table-container">
                <table className="survey-set-table">
                  <thead>
                    <tr>
                      <th>Question</th>
                      <th>Type</th>
                      <th>Options</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {groupedBySet[setNumber].map((question) => (
                      <tr key={question.id}>
                        <td>{question.question}</td>
                        <td>
                          <span className={`type-badge type-${question.question_type}`}>
                            {formatQuestionType(question.question_type)}
                          </span>
                        </td>
                        <td>
                          {question.question_type === "multiple_choice" && question.options
                            ? Array.isArray(question.options)
                              ? question.options.join(", ")
                              : question.options
                            : "-"}
                        </td>
                        <td className="survey-actions">
                          <button
                            className="survey-btn edit-btn"
                            onClick={() => handleEdit(question)}
                            title="Edit"
                          >
                            <BiSolidEdit />
                          </button>
                          <button
                            className="survey-btn delete-btn"
                            onClick={() => handleDeleteClick(question)}
                            title="Delete"
                          >
                            <AiOutlineDelete />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      {isAddModalOpen && (
        <SurveyQuestionAddModal
          isOpen={isAddModalOpen}
          onClose={() => {
            setIsAddModalOpen(false);
            setEditingQuestion(null);
          }}
          editingQuestion={editingQuestion}
        />
      )}

      {/* Delete Confirmation Modal */}
      <SurveyDeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        questionText={questionToDelete?.question}
      />
    </div>
  );
}
