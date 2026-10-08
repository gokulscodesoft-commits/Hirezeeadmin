import React, { useState, useContext } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { BiSolidEdit } from "react-icons/bi";
import { IoChevronBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import "./HighestEducation.css";

import HighestEduAddModal from "./HighestEduAddModal.jsx";
import HighestEduEditModal from "./HighestEduEditModal.jsx";

import { HighestEducationContext } from "../UseContexts/SeekerUseContext/HighestEducationContext.jsx";

export default function HighestEducation() {
  const navigate = useNavigate();

  const {
    highestEdu,
    loading,
    addHighestEdu,
    updateHighestEdu,
    deleteHighestEdu,
  } = useContext(HighestEducationContext);

  // Hidden Rows
  const [hiddenRows, setHiddenRows] = useState([]);

  // Add/Edit modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);

  // Add
  const handleSaveAdd = async (newItem) => {
    await addHighestEdu(newItem);
    setIsAddModalOpen(false);
  };

  // Edit
  const handleSaveEdit = async (updatedItem) => {
    await updateHighestEdu(updatedItem.id, updatedItem);
    setIsEditModalOpen(false);
    setEditItem(null);
  };

  // Delete
  const handleDelete = async (id) => {
    await deleteHighestEdu(id);
    setHiddenRows((prev) => prev.filter((hid) => hid !== id));
  };

  // Toggle hide
  const toggleHideRow = (id) => {
    setHiddenRows((prev) =>
      prev.includes(id) ? prev.filter((hid) => hid !== id) : [...prev, id]
    );
  };

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const totalPages = Math.ceil(highestEdu.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = highestEdu.slice(startIndex, startIndex + itemsPerPage);

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
    <div className="highestedu-container">
      <div className="highestedu-rec">
        <div className="highestedu-section">
          {/* Header */}
          <div className="highestedu-title-button">
            <h2
              className="highestedu-title"
              onClick={() => navigate("/dashboard/education")}
            >
              <IoChevronBackOutline /> Highest Education List
            </h2>
            <button
              className="highestedu-add-btn"
              onClick={() => setIsAddModalOpen(true)}
            >
              Add Degree
            </button>
          </div>

          {/* Loading */}
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="highestedu-table-container">
              <table className="highestedu-table">
                <thead>
                  <tr>
                    <th>Degree</th>
                    <th>Posted on</th>
                    <th>Updated on</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.map((deg) => (
                    <tr
                      key={deg.id}
                      className={
                        hiddenRows.includes(deg.id) ? "hidden-row" : ""
                      }
                    >
                      {/* Match API schema */}
                      <td>{deg.highest_qualification}</td>
                      <td>{deg.postedOn || "-"}</td>
                      <td>{deg.updatedOn || "-"}</td>
                      <td className="highestedu-actions">
                        {/* Toggle Visibility */}
                        {/* <button
                          className="highestedu-btn view-btn"
                          onClick={() => toggleHideRow(deg.id)}
                        >
                          {hiddenRows.includes(deg.id) ? (
                            <FaRegEyeSlash />
                          ) : (
                            <FaRegEye />
                          )}
                        </button> */}

                        {/* Edit */}
                        <button
                          className="highestedu-btn edit-btn"
                          onClick={() => {
                            setEditItem(deg);
                            setIsEditModalOpen(true);
                          }}
                        >
                          <BiSolidEdit />
                        </button>

                        {/* Delete */}
                        <button
                          className="highestedu-btn delete-btn"
                          onClick={() => handleDelete(deg.id)}
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
        <HighestEduAddModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSave={handleSaveAdd}
        />
      )}

      {/* Edit Modal */}
      {isEditModalOpen && editItem && (
        <HighestEduEditModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setEditItem(null);
          }}
          onSave={handleSaveEdit}
          degree={editItem}
        />
      )}
    </div>
  );
}
