// src/education/JobRoleCategories.jsx
import React, { useState, useContext } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BiSolidEdit } from "react-icons/bi";
import { IoChevronBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import "./JobRoleCategories.css";

import JobRoleCategoriesAddModal from "./JobRoleCategoriesAddModal.jsx";
import JobRoleCategoriesEditModal from "./JobRoleCategoriesEditModal.jsx";

import { JobRoleCategoriesContext } from "../UseContexts/SeekerUseContext/JobRoleCategoriesContext.jsx";

export default function JobRoleCategories() {
  const navigate = useNavigate();

  const {
    jobRoleCategories,
    loading,
    addJobRoleCategory,
    updateJobRoleCategory,
    // deleteJobRoleCategory,
  } = useContext(JobRoleCategoriesContext);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);

  // Add
  const handleSaveAdd = async (value) => {
    await addJobRoleCategory(value);
    setIsAddModalOpen(false);
  };

  // Edit
  const handleSaveEdit = async (updatedItem) => {
    await updateJobRoleCategory(updatedItem.id, updatedItem.value, updatedItem.is_active);
    setIsEditModalOpen(false);
    setEditItem(null);
  };

  // Delete
  // const handleDelete = async (id) => {
  //   await deleteJobRoleCategory(id);
  // };

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const totalPages = Math.ceil(jobRoleCategories.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = jobRoleCategories.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="jobrolecateg-container">
      <div className="jobrolecateg-rec">
        <div className="jobrolecateg-section">
          {/* Header */}
          <div className="jobrolecateg-title-button">
            <h2
              className="jobrolecateg-title"
              onClick={() => navigate("/dashboard/education")}
            >
              <IoChevronBackOutline /> Job Categories List
            </h2>
            <button
              className="jobrolecateg-add-btn"
              onClick={() => setIsAddModalOpen(true)}
            >
              Add Category
            </button>
          </div>

          {/* Loading */}
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="jobrolecateg-table-container">
              <table className="jobrolecateg-table">
                <thead>
                  <tr>
                    <th>Value</th>
                    <th>Status</th>
                    <th>Updated on</th>
                    {/* <th>Action</th> */}
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.map((item) => (
                    <tr key={item.id}>
                      <td>{item.value}</td>
                      <td>{item.is_active ? "Active" : "Inactive"}</td>
                      <td>
                        {item.updated_at
                          ? new Date(item.updated_at).toLocaleDateString()
                          : "-"}
                      </td>
                      {/* <td className="jobrolecateg-actions">
                        <button
                          className="jobrolecateg-btn edit-btn"
                          onClick={() => {
                            setEditItem(item);
                            setIsEditModalOpen(true);
                          }}
                        >
                          <BiSolidEdit />
                        </button>
                        <button
                          className="jobrolecateg-btn delete-btn"
                          onClick={() => handleDelete(item.id)}
                        >
                          <AiOutlineDelete />
                        </button>
                      </td> */}
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
            </div>
          )}
        </div>
      </div>

      {/* Add Modal */}
      {isAddModalOpen && (
        <JobRoleCategoriesAddModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSave={handleSaveAdd}
        />
      )}

      {/* Edit Modal */}
      {isEditModalOpen && editItem && (
        <JobRoleCategoriesEditModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setEditItem(null);
          }}
          onSave={handleSaveEdit}
          value={editItem}
        />
      )}
    </div>
  );
}
