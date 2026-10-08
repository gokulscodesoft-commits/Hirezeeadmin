// src/pages/JobPostCompartmentLevel.jsx
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./JobPostCompartmentLevel.css";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { IoChevronBackOutline } from "react-icons/io5";
import { CompartmentLevelContext } from "../UseContexts/RecruiterUseContext/JobPostContext/CompartmentContext";

const JobPostCompartmentLevel = () => {
  const navigate = useNavigate();
  const { levels, loading } = useContext(CompartmentLevelContext);

  // Track hidden rows
  const [hiddenRows, setHiddenRows] = useState([]);

  // --- Pagination logic ---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const totalPages = Math.ceil(levels.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = levels.slice(startIndex, startIndex + itemsPerPage);

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

  const toggleHideRow = (id) => {
    setHiddenRows((prev) =>
      prev.includes(id) ? prev.filter((hid) => hid !== id) : [...prev, id]
    );
  };

  return (
    <div className="jobpostcompartment-container">
      <div className="jobpostcompartment-rec">
        <div className="jobpostcompartment-section">
          {/* Header */}
          <div className="title-button">
            <h2
              className="jobpostcompartment-title back-title"
              onClick={() => navigate("/dashboard/job-post-filter")}
              style={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <IoChevronBackOutline /> Compartment / Level List
            </h2>
          </div>

          {/* Loading */}
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="jobpostcompartment-table-container">
              <table className="jobpostcompartment-table">
                <thead>
                  <tr>
                    <th>Compartment / Level</th>
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
                      <td>{item.compartment_level}</td>
                      <td>{new Date(item.created_at).toLocaleDateString("en-IN")}</td>
                      <td>{new Date(item.updated_at).toLocaleDateString("en-IN")}</td>
                      <td className="jobpostcompartment-actions">
                        {/* <button
                          className="jobpostcompartment-btn view-btn"
                          onClick={() => toggleHideRow(item.id)}
                        >
                          {hiddenRows.includes(item.id) ? <FaRegEyeSlash /> : <FaRegEye />}
                        </button> */}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Pagination controls */}
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
    </div>
  );
};

export default JobPostCompartmentLevel;
