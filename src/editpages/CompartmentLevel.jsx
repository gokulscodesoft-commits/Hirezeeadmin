// src/pages/CompartmentLevel.jsx
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./CompartmentLevel.css";
import { FaEye, FaRegEyeSlash } from "react-icons/fa";
import { IoChevronBackOutline } from "react-icons/io5";
import { CompartmentLevelContext } from "../UseContexts/RecruiterUseContext/JobPostContext/CompartmentContext";

const CompartmentLevel = () => {
  const navigate = useNavigate();

  // ✅ Get levels + loading from context
  const { levels, loading } = useContext(CompartmentLevelContext);

  const [hiddenRows, setHiddenRows] = useState([]);

  // --- Pagination ---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const totalPages = Math.ceil(levels.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = levels.slice(startIndex, startIndex + itemsPerPage);

  const toggleHideRow = (id) => {
    setHiddenRows((prev) =>
      prev.includes(id) ? prev.filter((hid) => hid !== id) : [...prev, id]
    );
  };

  return (
    <div className="compartment-container">
      <div className="compartment-rec">
        <div className="compartment-section">
          {/* Header */}
          <div className="title-button">
            <h2
              className="compartment-title back-title"
              onClick={() => navigate("/dashboard/seeker-search-filter")}
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

          {/* Loading State */}
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="compartment-table-container">
              <table className="compartment-table">
                <thead>
                  <tr>
                    <th>Compartment / Level</th>
                    <th>Posted on</th>
                    <th>Created by</th>
                    {/* <th>Action</th>  */}
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
                      <td>{item.compartment_level}</td>
                      <td>
                        {new Date(item.created_at).toLocaleDateString("en-IN")}
                      </td>
                      <td>Admin</td>
                      <td className="compartment-actions">
                        {/* <button
                          className="compartment-btn view-btn"
                          onClick={() => toggleHideRow(item.id)}
                        >
                          {hiddenRows.includes(item.id) ? (
                            <FaRegEyeSlash />
                          ) : (
                            <FaEye />
                          )}
                        </button> */}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="pagination">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                  >
                    Prev
                  </button>
                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index + 1}
                      className={currentPage === index + 1 ? "active" : ""}
                      onClick={() => setCurrentPage(index + 1)}
                    >
                      {index + 1}
                    </button>
                  ))}
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
    </div>
  );
};

export default CompartmentLevel;
