import React, { useState } from "react";
import { BiSolidEdit } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { IoChevronBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import "./JobPostExperience.css";
import { jobPostExperienceFilters as initialJobPostExperienceFilters } from "../data/contentData.js";

export default function JobPostExperienceFilter() {
  const navigate = useNavigate();
  const [experienceFilters, setExperienceFilters] = useState(initialJobPostExperienceFilters);

  // Track which rows are hidden
  const [hiddenRows, setHiddenRows] = useState([]);

  const handleDelete = (id) => {
    setExperienceFilters(experienceFilters.filter((f) => f.id !== id));
    setHiddenRows(hiddenRows.filter((hid) => hid !== id));
  };

  const toggleHideRow = (id) => {
    if (hiddenRows.includes(id)) {
      setHiddenRows(hiddenRows.filter((hid) => hid !== id));
    } else {
      setHiddenRows([...hiddenRows, id]);
    }
  };

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const totalPages = Math.ceil(experienceFilters.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = experienceFilters.slice(
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
    <div className="jobpostexperiencefilter-container">
      <div className="jobpostexperiencefilter-rec">
        <div className="jobpostexperiencefilter-section">
          <div className="title-button">
            <div className="jobpostexperiencefilter-header">
              <h2
                className="jobpostexperiencefilter-title"
                onClick={() => navigate("/dashboard/job-post-filter")}
              >
                <IoChevronBackOutline /> Experience List
              </h2>
            </div>
          </div>

          <div className="jobpostexperiencefilter-table-container">
            <table className="jobpostexperiencefilter-table">
              <thead>
                <tr>
                  <th>Specification</th>
                  <th>Posted on</th>
                  <th>Created by</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((filter) => (
                  <tr
                    key={filter.id}
                    className={hiddenRows.includes(filter.id) ? "hidden-row" : ""}
                  >
                    <td>{filter.experience}</td>
                    <td>{filter.postedOn}</td>
                    <td>{filter.createdBy}</td>
                    <td className="jobpostexperiencefilter-actions">
                      <button
                        className="jobpostexperiencefilter-btn view-btn"
                        onClick={() => toggleHideRow(filter.id)}
                      >
                        {hiddenRows.includes(filter.id) ? <FaRegEyeSlash /> : <FaRegEye />}
                      </button>
                      <button
                        className="jobpostexperiencefilter-btn delete-btn"
                        onClick={() => handleDelete(filter.id)}
                      >
                        <AiOutlineDelete />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            {experienceFilters.length > itemsPerPage && (
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
    </div>
  );
}
