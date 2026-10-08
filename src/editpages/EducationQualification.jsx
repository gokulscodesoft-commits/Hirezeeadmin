import React, { useContext, useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { IoChevronBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import "./EducationQualification.css";
import EducationAddModal from "./EducationAddModal.jsx";
import { SeekerEduQualification as SeekerEduQualificationContext } from "../UseContexts/SeekerUseContext/SeekerEduQualificationContext.jsx";
import { EducationLoader } from "../Loader/Loader.jsx";

export default function EducationQualification() {
  const navigate = useNavigate();

  const {
    qualifications,
    loading,
    addQualification,
    deleteQualification,
  } = useContext(SeekerEduQualificationContext);

  const [hiddenRows, setHiddenRows] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Add qualification
  const handleSaveAdd = async (newItem) => {
    await addQualification(newItem);
    setIsAddModalOpen(false);
  };

  // Delete qualification
  const handleDelete = async (id) => {
    try {
      await deleteQualification(id);
      setHiddenRows((prev) => prev.filter((hid) => hid !== id));
    } catch {
      // already handled in context
    }
  };

  // Hide/unhide
  const toggleHideRow = (id) => {
    setHiddenRows((prev) =>
      prev.includes(id) ? prev.filter((hid) => hid !== id) : [...prev, id]
    );
  };

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const totalPages = Math.ceil(qualifications.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = qualifications.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  if (loading) return <EducationLoader />;

  return (
    <div className="education-container">
      <div className="education-rec">
        <div className="education-section">
          {/* Header */}
          <div className="title-button">
            <h2
              className="education-title"
              onClick={() => navigate("/dashboard/seeker-search-filter")}
            >
              <IoChevronBackOutline /> Education Qualification List
            </h2>

            <button
              className="education-add-btn"
              onClick={() => setIsAddModalOpen(true)}
            >
              Add Qualification
            </button>
          </div>

          {/* Table */}
          <div className="education-table-container">
            <table className="education-table">
              <thead>
                <tr>
                  <th>Qualification</th>
                  <th>Posted on</th>
                  <th>Created by</th>
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
                    <td>{item.postedOn}</td>
                    <td>{item.createdBy}</td>
                    <td className="education-actions">
                      {/* <button
                        className="education-btn view-btn"
                        onClick={() => toggleHideRow(item.id)}
                      >
                        {hiddenRows.includes(item.id) ? (
                          <FaRegEyeSlash />
                        ) : (
                          <FaRegEye />
                        )}
                      </button> */}
                      <button
                        className="education-btn delete-btn"
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
        </div>
      </div>

      {/* Add Modal */}
      {isAddModalOpen && (
        <EducationAddModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSave={handleSaveAdd}
        />
      )}
    </div>
  );
}
