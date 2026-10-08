// src/pages/JobPostEducationQualification.jsx
import React, { useState, useContext } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { BiSolidEdit } from "react-icons/bi";
import { IoChevronBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import "./JobPostEducationQualification.css";

import JobPostEducationAddModal from "./JobPostEducationAddModal.jsx";
// import JobPostEducationEditModal from "./JobPostEducationEditModal.jsx";

import { EducationQualificationContext } from "../UseContexts/RecruiterUseContext/JobPostContext/EducationQualificationContext.jsx";
import { JobRoleCategoriesContext } from "../UseContexts/SeekerUseContext/JobRoleCategoriesContext.jsx";

export default function JobPostEducationQualification() {
  const navigate = useNavigate();

  const {
    qualifications,
    loading,
    addQualification,
    updateQualification,
    deleteQualification,
  } = useContext(EducationQualificationContext);

  const { jobRoleCategories } = useContext(JobRoleCategoriesContext);

  const categoryLabel = (id) =>
    jobRoleCategories.find((c) => String(c.id) === String(id))?.label || "-";

  const [hiddenRows, setHiddenRows] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);

  // Job Role Category filter — local to this page only
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const filteredQualifications = selectedCategoryId
    ? (qualifications || []).filter(
        (q) => String(q.job_role_category_id) === String(selectedCategoryId)
      )
    : qualifications || [];

  // ✅ Add
  const handleSaveAdd = async (newItem) => {
    await addQualification(newItem);
    setIsAddModalOpen(false);
  };

  // ✅ Edit
  // const handleSaveEdit = async (updatedItem) => {
  //   await updateQualification(updatedItem.id, updatedItem);
  //   setIsEditModalOpen(false);
  //   setEditItem(null);
  // };

  // ✅ Delete
  const handleDelete = async (id) => {
    await deleteQualification(id);
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
  const totalPages = Math.ceil(filteredQualifications.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredQualifications.slice(
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

  if (loading) return <div>Loading...</div>;

  return (
    <div className="jobposteducation-container">
      <div className="jobposteducation-rec">
        <div className="jobposteducation-section">
          {/* Header */}
          <div className="jobposteducation-title-button">
            <h2
              className="jobposteducation-title"
              onClick={() => navigate("/dashboard/job-post-filter")}
            >
              <IoChevronBackOutline /> Education Qualification List
            </h2>
            <button
              className="jobposteducation-add-btn"
              onClick={() => setIsAddModalOpen(true)}
            >
              Add Qualification
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

          {/* Table */}
          <div className="jobposteducation-table-container">
            <table className="jobposteducation-table">
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
                    className={hiddenRows.includes(item.id) ? "hidden-row" : ""}
                  >
                    <td>{item.qualification}</td>
                    <td>{categoryLabel(item.job_role_category_id)}</td>
                    <td>{item.postedOn || "-"}</td>
                    <td>{item.updatedOn || "-"}</td>
                    <td className="jobposteducation-actions">
                      {/* <button
                        className="jobposteducation-btn view-btn"
                        onClick={() => toggleHideRow(item.id)}
                      >
                        {hiddenRows.includes(item.id) ? (
                          <FaRegEyeSlash />
                        ) : (
                          <FaRegEye />
                        )}
                      </button> */}

                      {/* <button
                        className="jobposteducation-btn edit-btn"
                        onClick={() => {
                          setEditItem(item);
                          setIsEditModalOpen(true);
                        }}
                      >
                        <BiSolidEdit />
                      </button> */}

                      <button
                        className="jobposteducation-btn delete-btn"
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
        </div>
      </div>

      {/* Add Modal */}
      {isAddModalOpen && (
        <JobPostEducationAddModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSave={handleSaveAdd}
          categories={jobRoleCategories}
        />
      )}

      {/* Edit Modal */}
      {/* {isEditModalOpen && editItem && (
        <JobPostEducationEditModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setEditItem(null);
          }}
          onSave={handleSaveEdit}
          value={editItem}
        />
      )} */}
    </div>
  );
}
