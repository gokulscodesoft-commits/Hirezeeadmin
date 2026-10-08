import React, { useState, useContext } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { IoChevronBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import "./JobPostSubject.css";
import JobPostJobRoleAddModal from "./JobPostJobRoleAddModal.jsx";
import { JobRoleContext } from "../UseContexts/RecruiterUseContext/JobPostContext/JobRoleContext.jsx";
import { JobRoleCategoriesContext } from "../UseContexts/SeekerUseContext/JobRoleCategoriesContext.jsx";

export default function JobPostJobRoleFilter() {
  const navigate = useNavigate();
  const { jobRoles, loading, error, deleteJobRole } = useContext(JobRoleContext);
  const { jobRoleCategories } = useContext(JobRoleCategoriesContext);

  const categoryLabel = (id) =>
    jobRoleCategories.find((c) => String(c.id) === String(id))?.label || "-";

  const [hiddenRows, setHiddenRows] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Job Role Category filter — local to this page only
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const filteredJobRoles = selectedCategoryId
    ? (jobRoles || []).filter(
        (r) => String(r.job_role_category_id) === String(selectedCategoryId)
      )
    : jobRoles || [];

  // Save from Add Modal
  const handleSaveAdd = async (newItem) => {
    setIsAddModalOpen(false);
  };

  // Handle Delete
  const handleDelete = async (id) => {
    try {
      await deleteJobRole(id);
      setHiddenRows((prev) => prev.filter((hid) => hid !== id));
    } catch (err) {
      console.error("Error deleting job role:", err);
    }
  };

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const totalPages = Math.ceil((filteredJobRoles?.length || 0) / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData =
    filteredJobRoles?.slice(startIndex, startIndex + itemsPerPage) || [];

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

  // Format Dates
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="jobpostsubjectfilter-container">
      <div className="jobpostsubjectfilter-rec">
        <div className="jobpostsubjectfilter-section">
          {/* Header */}
          <div className="jobpostsubjectfilter-title-button">
            <h2
              className="jobpostsubjectfilter-title"
              onClick={() => navigate("/dashboard/job-post-filter")}
            >
              <IoChevronBackOutline /> Job Role List
            </h2>
            <button
              className="jobpostsubjectfilter-add-btn"
              onClick={() => setIsAddModalOpen(true)}
            >
              Add Job Role
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
          {loading && <p className="loading">Loading job roles...</p>}
          {error && <p className="error">{error}</p>}

          {/* Table */}
          <div className="jobpostsubjectfilter-table-container">
            <table className="jobpostsubjectfilter-table">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Job Role</th>
                  <th>Category</th>
                  <th>Posted on</th>
                  <th>Updated on</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((role, index) => (
                  <tr
                    key={role.id}
                    className={
                      hiddenRows.includes(role.id) ? "hidden-row" : ""
                    }
                  >
                    <td>{startIndex + index + 1}</td>
                    <td>{role.title}</td>
                    <td>{categoryLabel(role.job_role_category_id)}</td>
                    <td>{formatDate(role.created_at)}</td>
                    <td>{formatDate(role.updated_at)}</td>
                    <td className="jobpostsubjectfilter-actions">
                      <button
                        className="jobpostsubjectfilter-btn delete-btn"
                        onClick={() => handleDelete(role.id)}
                      >
                        <AiOutlineDelete />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Empty State */}
            {!loading && filteredJobRoles?.length === 0 && (
              <p className="empty">No job roles found.</p>
            )}

            {/* Pagination */}
            {filteredJobRoles?.length > itemsPerPage && (
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
        <JobPostJobRoleAddModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSave={handleSaveAdd}
          categories={jobRoleCategories}
        />
      )}
    </div>
  );
}
