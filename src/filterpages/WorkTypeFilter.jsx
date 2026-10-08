import React, { useState, useContext } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { IoChevronBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import "./WorkTypeFilter.css";
import WorkTypeAddModal from "./WorkTypeAddModal.jsx";
import { WorkTypeContext } from "../UseContexts/RecruiterUseContext/JobPostContext/WorkTypeContext.jsx";

export default function WorkTypeFilter() {
  const navigate = useNavigate();
  const { workTypes, loading, addWorkType, deleteWorkType } =
    useContext(WorkTypeContext);

  const [hiddenRows, setHiddenRows] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // ✅ Save new WorkType
  const handleSaveAdd = async (newItem) => {
    await addWorkType(newItem);
    setIsAddModalOpen(false);
  };

  // ✅ Handle Delete
  const handleDelete = async (id) => {
    try {
      await deleteWorkType(id);
      setHiddenRows((prev) => prev.filter((hid) => hid !== id));
    } catch (err) {
      console.error("Error deleting work type:", err);
    }
  };

  // ✅ Toggle hide/show row
  const toggleHideRow = (id) => {
    setHiddenRows((prev) =>
      prev.includes(id) ? prev.filter((hid) => hid !== id) : [...prev, id]
    );
  };

  // ✅ Format API date
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // ✅ Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const totalPages = Math.ceil(workTypes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = workTypes.slice(startIndex, startIndex + itemsPerPage);

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
    <div className="worktypefilter-container">
      <div className="worktypefilter-rec">
        <div className="worktypefilter-section">
          {/* Header */}
          <div className="worktypefilter-header">
            <h2
              className="worktypefilter-title"
              onClick={() => navigate("/dashboard/job-post-filter")}
            >
              <IoChevronBackOutline /> Work Type List
            </h2>
            <button
              className="worktypefilter-add-btn"
              onClick={() => setIsAddModalOpen(true)}
            >
              Add Work Type
            </button>
          </div>

          {/* Loader */}
          {loading && <p>Loading work types...</p>}

          {/* Table */}
          {!loading && (
            <div className="worktypefilter-table-container">
              <table className="worktypefilter-table">
                <thead>
                  <tr>
                    <th>Work Type</th>
                    <th>Posted on</th>
                    <th>Updated on</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.map((workType) => (
                    <tr
                      key={workType.id}
                      className={
                        hiddenRows.includes(workType.id) ? "hidden-row" : ""
                      }
                    >
                      <td>{workType.job_type}</td>
                      <td>{formatDate(workType.created_at)}</td>
                      <td>{formatDate(workType.updated_at)}</td>
                      <td className="worktypefilter-actions">
                        {/* <button
                          className="worktypefilter-btn view-btn"
                          onClick={() => toggleHideRow(workType.id)}
                        >
                          {hiddenRows.includes(workType.id) ? (
                            <FaRegEyeSlash />
                          ) : (
                            <FaRegEye />
                          )}
                        </button> */}
                        <button
                          className="worktypefilter-btn delete-btn"
                          onClick={() => handleDelete(workType.id)}
                        >
                          <AiOutlineDelete />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Pagination */}
              {workTypes.length > itemsPerPage && (
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
          )}
        </div>
      </div>

      {/* Add Modal */}
      {isAddModalOpen && (
        <WorkTypeAddModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSave={handleSaveAdd}
        />
      )}
    </div>
  );
}
