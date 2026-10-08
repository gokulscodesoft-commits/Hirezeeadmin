import React, { useState, useContext } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BiSolidEdit } from "react-icons/bi";
import { IoChevronBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import "./QualificationSpecification.css";
import { QualificationSpecificationContext } from "../UseContexts/SeekerUseContext/QualificationSpecificationContext.jsx";
import QualificationSpecificationAddModal from "./QualificationSpecificationAddModal.jsx";
import QualificationSpecificationEditModal from "./QualificationSpecificationEditModal.jsx";

export default function QualificationSpecification() {
  const navigate = useNavigate();
  const {
    specifications,
    loading,
    error,
    addSpecification,
    updateSpecification,
    deleteSpecification,
  } = useContext(QualificationSpecificationContext);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedSpec, setSelectedSpec] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const totalPages = Math.ceil((specifications?.length || 0) / itemsPerPage);
  const paginatedSpecs = specifications?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  ) || [];

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

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleAdd = async (newItem) => {
    await addSpecification(newItem);
    setIsAddModalOpen(false);
  };

  const handleEdit = (spec) => {
    setSelectedSpec(spec);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = async (updatedSpec) => {
    await updateSpecification(updatedSpec.id, { specification: updatedSpec.specification });
    setIsEditModalOpen(false);
  };

  const handleDelete = async (id) => {
    await deleteSpecification(id);
  };

  return (
    <div className="qualificationspecfilter-container">
      <div className="qualificationspecfilter-rec">
        <div className="qualificationspecfilter-section">
          <div className="qualificationspecfilter-title-button">
            <h2
              className="qualificationspecfilter-title"
              onClick={() => navigate("/dashboard/seeker-search-filter")}
            >
              <IoChevronBackOutline /> Qualification Specialization List
            </h2>
            <button
              className="qualificationspecfilter-add-btn"
              onClick={() => setIsAddModalOpen(true)}
            >
              Add Specialization
            </button>
          </div>

          {loading && <p>Loading...</p>}
          {error && <p className="error">⚠️ {error}</p>}

          <div className="qualificationspecfilter-table-container">
            <table className="qualificationspecfilter-table">
              <thead>
                <tr>
                  <th>Specialization</th>
                  <th>Posted on</th>
                  <th>Updated on</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {paginatedSpecs.map((spec) => (
                  <tr key={spec.id}>
                    <td>{spec.specification}</td>
                    <td>{formatDate(spec.created_at)}</td>
                    <td>{formatDate(spec.updated_at)}</td>
                    <td className="qualificationspecfilter-actions">
                      <button
                        className="qualificationspecfilter-btn edit-btn"
                        onClick={() => handleEdit(spec)}
                      >
                        <BiSolidEdit />
                      </button>
                      <button
                        className="qualificationspecfilter-btn delete-btn"
                        onClick={() => handleDelete(spec.id)}
                      >
                        <AiOutlineDelete />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {!loading && specifications?.length === 0 && (
              <p className="empty">No qualification specifications found.</p>
            )}

            {specifications?.length > itemsPerPage && (
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

      {isAddModalOpen && (
        <QualificationSpecificationAddModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSave={handleAdd}
        />
      )}

      {isEditModalOpen && (
        <QualificationSpecificationEditModal
          specificationItem={selectedSpec}
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSaveEdit}
        />
      )}
    </div>
  );
}
