import React, { useState, useContext } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { BiSolidEdit } from "react-icons/bi";
import { IoChevronBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import "./JobPostEndDateFilter.css";

import { EndDateContext } from "../UseContexts/RecruiterUseContext/JobPostContext/EndDateContext.jsx";
import EndDateEditModal from "./EndDateEditModal.jsx";

export default function JobPostEndDateFilter() {
  const navigate = useNavigate();
  const { endDates, addEndDate, updateEndDate, deleteEndDate } =
    useContext(EndDateContext);

  // Add Modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Edit Modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [newDate, setNewDate] = useState("");

  // Hidden Rows
  const [hiddenRows, setHiddenRows] = useState([]);

  const handleSaveAdd = async (newItem) => {
    await addEndDate({ expired_date: newItem.endDate });
    setIsAddModalOpen(false);
  };

  const handleDelete = async (id) => {
    await deleteEndDate(id);
    setHiddenRows(hiddenRows.filter((hid) => hid !== id));
  };

  const handleEdit = (filter) => {
    setEditId(filter.id);
    setNewDate(filter.expired_date); // prefill with API field
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = async () => {
    await updateEndDate(editId, { expired_date: newDate });
    setIsEditModalOpen(false);
    setEditId(null);
    setNewDate("");
  };

  const toggleHideRow = (id) => {
    setHiddenRows((prev) =>
      prev.includes(id) ? prev.filter((hid) => hid !== id) : [...prev, id]
    );
  };

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const totalPages = Math.ceil(endDates.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = endDates.slice(startIndex, startIndex + itemsPerPage);

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
    <div className="jobpostenddatefilter-container">
      <div className="jobpostenddatefilter-rec">
        <div className="jobpostenddatefilter-section">
          {/* Header */}
          <div className="jobpostenddatefilter-title-button">
            <h2
              className="jobpostenddatefilter-title"
              onClick={() => navigate("/dashboard/job-post-filter")}
            >
              <IoChevronBackOutline /> End-Date List
            </h2>
          </div>

          {/* Table */}
          <div className="jobpostenddatefilter-table-container">
            <table className="jobpostenddatefilter-table">
              <thead>
                <tr>
                  <th>End Date</th>
                  <th>Created on</th>
                  <th>Updated on</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((filter) => (
                  <tr
                    key={filter.id}
                    className={hiddenRows.includes(filter.id) ? "hidden-row" : ""}
                  >
                    <td>{filter.expired_date}</td>
                    <td>-</td>
                    <td>-</td>
                    <td className="jobpostenddatefilter-actions">
                      <button
                        className="jobpostenddatefilter-btn edit-btn"
                        onClick={() => handleEdit(filter)}
                      >
                        <BiSolidEdit />
                      </button>
                      {/* <button
                        className="jobpostenddatefilter-btn view-btn"
                        onClick={() => toggleHideRow(filter.id)}
                      >
                        {hiddenRows.includes(filter.id) ? (
                          <FaRegEyeSlash />
                        ) : (
                          <FaRegEye />
                        )}
                      </button> */}
                      {/* <button
                        className="jobpostenddatefilter-btn delete-btn"
                        onClick={() => handleDelete(filter.id)}
                      >
                        <AiOutlineDelete />
                      </button> */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            {endDates.length > itemsPerPage && (
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

      {/* Edit Modal */}
      {isEditModalOpen && (
        <EndDateEditModal
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSaveEdit}
          newDate={newDate}
          setNewDate={setNewDate}
        />
      )}
    </div>
  );
}
