// src/pages/ExperienceFilter.jsx
import React, { useState, useContext } from "react";
import { BiSolidEdit } from "react-icons/bi";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { IoChevronBackOutline } from "react-icons/io5";
import "./ExperienceFilter.css";
import { ExperienceContext } from "../UseContexts/SeekerUseContext/ExperienceContext";
import ExperienceModal from "../editpages/ExperienceModal.jsx";
import AddExperienceModal from "../editpages/AddExperienceModal.jsx";

export default function ExperienceFilter() {
  const navigate = useNavigate();
  const {
    experiences,
    loading,
    addExperience,
    deleteExperience,
    updateExperience,
  } = useContext(ExperienceContext);

  const [hiddenRows, setHiddenRows] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedExp, setSelectedExp] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleEdit = (exp) => {
    setSelectedExp(exp);
    setIsEditModalOpen(true);
  };

  const handleAdd = () => {
    setIsAddModalOpen(true);
  };

  const toggleHideRow = (id) => {
    setHiddenRows((prev) =>
      prev.includes(id) ? prev.filter((hid) => hid !== id) : [...prev, id]
    );
  };

  return (
    <div className="experiencefilter-container">
      <div className="experiencefilter-rec">
        <div className="experiencefilter-section">
          <div className="title-button">
            <div className="experiencefilter-header">
              <h2
                className="experiencefilter-title"
                onClick={() => navigate("/dashboard/seeker-search-filter")}
              >
                <IoChevronBackOutline /> Experience List
              </h2>
            </div>
            <button className="experiencefilter-add-btn" onClick={handleAdd}>
              Add Experience
            </button>
          </div>

          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="experiencefilter-table-container">
              <table className="experiencefilter-table">
                <thead>
                  <tr>
                    <th>Experience</th>
                    <th>Min</th>
                    <th>Max</th>
                    <th>Posted on</th>
                    <th>Updated on</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {experiences.map((exp) => (
                    <tr
                      key={exp.id}
                      className={
                        hiddenRows.includes(exp.id) ? "hidden-row" : ""
                      }
                    >
                      <td>{exp.experience}</td>
                      <td>{exp.min_value}</td>
                      <td>{exp.max_value}</td>
                      <td>
                        {new Date(exp.created_at).toLocaleDateString("en-IN")}
                      </td>
                      <td>
                        {new Date(exp.updated_at).toLocaleDateString("en-IN")}
                      </td>
                      <td className="experiencefilter-actions">
                        {/* <button
                          className="experiencefilter-btn view-btn"
                          onClick={() => toggleHideRow(exp.id)}
                        >
                          {hiddenRows.includes(exp.id) ? <FaRegEyeSlash /> : <FaRegEye />}
                        </button> */}
                        <button
                          className="experiencefilter-btn edit-btn"
                          onClick={() => handleEdit(exp)}
                        >
                          <BiSolidEdit />
                        </button>
                        <button
                          className="experiencefilter-btn delete-btn"
                          onClick={() => deleteExperience(exp.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {isAddModalOpen && (
        <AddExperienceModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSave={(payload) => {
            addExperience(payload);
            setIsAddModalOpen(false);
          }}
        />
      )}

      {isEditModalOpen && (
        <ExperienceModal
          experience={selectedExp}
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSave={(updatedExp) => {
            updateExperience(updatedExp.id, updatedExp);
            setIsEditModalOpen(false);
          }}
        />
      )}
    </div>
  );
}
