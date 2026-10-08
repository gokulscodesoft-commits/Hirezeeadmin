import React, { useState, useContext } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { IoChevronBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import "./Subject.css";
import SubjectAddModal from "./SubjectAddModal.jsx";
import { SubjectContext } from "../UseContexts/RecruiterUseContext/JobPostContext/SubjectContext.jsx";
import { JobRoleCategoriesContext } from "../UseContexts/SeekerUseContext/JobRoleCategoriesContext.jsx";

import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

export default function SubjectFilter() {
  const navigate = useNavigate();
  const {
    subjects,
    loading,
    error,
    addSubjectForJobRoleCategory,
    deleteSubject,
    reorderSubjects,
  } = useContext(SubjectContext);

  const { jobRoleCategories } = useContext(JobRoleCategoriesContext);

  const categoryLabel = (id) =>
    jobRoleCategories.find((c) => String(c.id) === String(id))?.label || "-";

  const [hiddenRows, setHiddenRows] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // ✅ Job Role Category filter — local to this page only, so it doesn't
  // leak into the unrelated Job Post Subject filter page that shares this context.
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const filteredSubjects = selectedCategoryId
    ? (subjects || []).filter(
        (s) => String(s.job_role_category_id) === String(selectedCategoryId)
      )
    : subjects || [];

  // ✅ Save from Add Modal
  const handleSaveAdd = async ({ job_role_category_id, ...rest }) => {
    await addSubjectForJobRoleCategory(job_role_category_id, rest); // calls API
    setIsAddModalOpen(false);
  };

  // ✅ Handle Delete
  const handleDelete = async (id) => {
    try {
      await deleteSubject(id); // calls API
      setHiddenRows((prev) => prev.filter((hid) => hid !== id));
    } catch (err) {
      console.error("Error deleting subject:", err);
    }
  };

  // ✅ Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const totalPages = Math.ceil((filteredSubjects?.length || 0) / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData =
    filteredSubjects?.slice(startIndex, startIndex + itemsPerPage) || [];

  const getPageNumbers = () => {
    if (totalPages <= 1) return totalPages === 1 ? [1] : [];
    const delta = 1;
    const range = [];
    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }
    if (currentPage - delta > 2) range.unshift("...");
    if (currentPage + delta < totalPages - 1) range.push("...");
    range.unshift(1);
    range.push(totalPages);
    return range;
  };

  // ✅ Toggle Hide Row
  const toggleHideRow = (id) => {
    setHiddenRows((prev) =>
      prev.includes(id) ? prev.filter((hid) => hid !== id) : [...prev, id]
    );
  };

  // ✅ Format Dates
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const sourceIndex = result.source.index + startIndex;
    const destinationIndex = result.destination.index + startIndex;

    const items = Array.from(subjects);
    const [moved] = items.splice(sourceIndex, 1);
    items.splice(destinationIndex, 0, moved);

    reorderSubjects(
      items.map((item, index) => ({
        ...item,
        order_index: index + 1,
      }))
    );
  };

  const renderRow = (subject, index) => (
    <>
      <td>{startIndex + index + 1}</td>
      <td>{subject.category_name}</td>
      <td>{categoryLabel(subject.job_role_category_id)}</td>
      <td>{formatDate(subject.created_at)}</td>
      <td>{formatDate(subject.updated_at)}</td>
      <td className="jobpostsubjectfilter-actions">
        <button
          className="jobpostsubjectfilter-btn delete-btn"
          onClick={() => handleDelete(subject.id)}
        >
          <AiOutlineDelete />
        </button>
      </td>
    </>
  );

  return (
    <div className="subjectfilter-container">
      <div className="subjectfilter-rec">
        <div className="subjectfilter-section">
          {/* Header */}
          <div className="subjectfilter-title-button">
            <h2
              className="subjectfilter-title"
              onClick={() => navigate("/dashboard/education")}
            >
              <IoChevronBackOutline /> Specialization List
            </h2>
            <button
              className="subjectfilter-add-btn"
              onClick={() => setIsAddModalOpen(true)}
            >
              Add Specialization
            </button>
          </div>

          {/* Category Filter */}
          <div className="subjectfilter-filter">
            <label>Job Role Category:</label>
            <select
              value={selectedCategoryId}
              onChange={(e) => {
                setCurrentPage(1);
                setSelectedCategoryId(e.target.value);
              }}
            >
              <option value="">All Categories</option>
              {jobRoleCategories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          {/* Loader / Error */}
          {loading && <p>Loading Specialization...</p>}
          {error && <p className="error">⚠️ {error}</p>}

          {/* Table */}
          <div className="subjectfilter-table-container">
            <table className="subjectfilter-table">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Specialization</th>
                  <th>Category</th>
                  <th>Posted on</th>
                  <th>Updated on</th>
                  <th>Action</th>
                </tr>
              </thead>

              {selectedCategoryId ? (
                // Filtered view: reordering (order_index) spans the full
                // unfiltered list, so drag-and-drop is disabled here.
                <tbody>
                  {paginatedData.map((subject, index) => (
                    <tr key={subject.id}>{renderRow(subject, index)}</tr>
                  ))}
                </tbody>
              ) : (
                <DragDropContext onDragEnd={handleDragEnd}>
                  <Droppable droppableId="subjects">
                    {(provided) => (
                      <tbody ref={provided.innerRef} {...provided.droppableProps}>
                        {paginatedData.map((subject, index) => (
                          <Draggable
                            key={subject.id}
                            draggableId={subject.id.toString()}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <tr
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={{
                                  ...provided.draggableProps.style,
                                  background: snapshot.isDragging
                                    ? "#f0f9ff"
                                    : "white",
                                }}
                              >
                                {renderRow(subject, index)}
                              </tr>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </tbody>
                    )}
                  </Droppable>
                </DragDropContext>
              )}
            </table>

            {/* Empty State */}
            {!loading && filteredSubjects?.length === 0 && (
              <p className="empty">No Specialization found.</p>
            )}

            {/* Pagination */}
            {filteredSubjects?.length > itemsPerPage && (
              <div className="pagination">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  Prev
                </button>
                {getPageNumbers().map((p, idx) =>
                  p === "..." ? (
                    <span key={`ellipsis-${idx}`} className="pagination-ellipsis">
                      …
                    </span>
                  ) : (
                    <button
                      key={p}
                      className={currentPage === p ? "active" : ""}
                      onClick={() => setCurrentPage(p)}
                    >
                      {p}
                    </button>
                  )
                )}
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Modal */}
      {isAddModalOpen && (
        <SubjectAddModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSave={handleSaveAdd}
          categories={jobRoleCategories}
        />
      )}
    </div>
  );
}
