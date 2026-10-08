// src/pages/TeachingQualification.jsx
import React, { useState, useContext } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { BiSolidEdit } from "react-icons/bi";
import { IoChevronBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import "./TeachingQualification.css";

import TeachingQualAddModal from "./TeachingQualAddModal.jsx";
import TeachingQualEditModal from "./TeachingQualEditModal.jsx";

import { TeachingQualificationContext } from "../UseContexts/SeekerUseContext/TeachingQualificationContext.jsx";
import { JobRoleCategoriesContext } from "../UseContexts/SeekerUseContext/JobRoleCategoriesContext.jsx";

export default function TeachingQualification() {
  const navigate = useNavigate();

  // ✅ use context instead of local data
  const {
    teachingQual,
    loading,
    selectedCategoryId,
    setSelectedCategoryId,
    addTeachingQual,
    updateTeachingQual,
    deleteTeachingQual,
  } = useContext(TeachingQualificationContext);

  const { jobRoleCategories } = useContext(JobRoleCategoriesContext);

  const [hiddenRows, setHiddenRows] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const categoryLabel = (id) =>
    jobRoleCategories.find((c) => String(c.id) === String(id))?.label || "-";

  // ✅ Add
  const handleSaveAdd = async (newItem) => {
    await addTeachingQual(newItem);
    setIsAddModalOpen(false);
  };

  // ✅ Edit
  const handleSaveEdit = async (updatedItem) => {
    await updateTeachingQual(updatedItem.id, updatedItem);
    setIsEditModalOpen(false);
    setEditItem(null);
  };

  // ✅ Delete
  const handleDelete = async (id) => {
    await deleteTeachingQual(id);
    setHiddenRows((prev) => prev.filter((hid) => hid !== id));
  };

  // ✅ Toggle hide
  const toggleHideRow = (id) => {
    setHiddenRows((prev) =>
      prev.includes(id) ? prev.filter((hid) => hid !== id) : [...prev, id]
    );
  };

  // ✅ Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const totalPages = Math.ceil(teachingQual.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = teachingQual.slice(
    startIndex,
    startIndex + itemsPerPage
  );

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

  return (
    <div className="teachingqualif-container">
      <div className="teachingqualif-rec">
        <div className="teachingqualif-section">
          {/* Header */}
          <div className="teachingqualif-title-button">
            <h2
              className="teachingqualif-title"
              onClick={() => navigate("/dashboard/education")}
            >
              <IoChevronBackOutline /> Teaching Qualification List
            </h2>
            <button
              className="teachingqualif-add-btn"
              onClick={() => setIsAddModalOpen(true)}
            >
              Add Qualification
            </button>
          </div>

          {/* Category Filter */}
          <div className="teachingqualif-filter">
            <label>Job Role Category:</label>
            <select
              value={selectedCategoryId || ""}
              onChange={(e) => {
                setCurrentPage(1);
                setSelectedCategoryId(e.target.value || null);
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

          {/* Loading */}
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="teachingqualif-table-container">
              <table className="teachingqualif-table">
                <thead>
                  <tr>
                    <th>Qualification</th>
                    <th>Category</th>
                    <th>Posted on</th>
                    <th>Updated on</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.map((item) => (
                    <tr
                      key={item.id}
                      className={
                        hiddenRows.includes(item.id) ? "hidden-row" : ""
                      }
                    >
                      {/* match API schema */}
                      <td>{item.qualification_name}</td>
                      <td>{categoryLabel(item.job_role_category_id)}</td>
                      <td>{item.postedOn || "-"}</td>
                      <td>{item.updatedOn || "-"}</td>
                      <td className="teachingqualif-actions">
                        {/* <button
                          className="teachingqualif-btn view-btn"
                          onClick={() => toggleHideRow(item.id)}
                        >
                          {hiddenRows.includes(item.id) ? (
                            <FaRegEyeSlash />
                          ) : (
                            <FaRegEye />
                          )}
                        </button> */}
                        <button
                          className="teachingqualif-btn edit-btn"
                          onClick={() => {
                            setEditItem(item);
                            setIsEditModalOpen(true);
                          }}
                        >
                          <BiSolidEdit />
                        </button>
                        <button
                          className="teachingqualif-btn delete-btn"
                          onClick={() => handleDelete(item.id)}
                        >
                          <AiOutlineDelete />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Pagination */}
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
            </div>
          )}
        </div>
      </div>

      {/* Add Modal */}
      {isAddModalOpen && (
        <TeachingQualAddModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSave={handleSaveAdd}
          categories={jobRoleCategories}
          defaultCategoryId={selectedCategoryId}
        />
      )}

      {/* Edit Modal */}
      {isEditModalOpen && editItem && (
        <TeachingQualEditModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setEditItem(null);
          }}
          onSave={handleSaveEdit}
          value={editItem}
          categories={jobRoleCategories}
        />
      )}
    </div>
  );
}
