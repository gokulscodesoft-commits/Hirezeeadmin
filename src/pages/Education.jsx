import React, { useState, useEffect } from "react";
import { BiSolidEdit } from "react-icons/bi";
import { IoChevronBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import "./Education.css";
import { educationFilter, jobRoleFilter } from "../data/contentData.js";
import { EducationLoader } from "../Loader/Loader.jsx"

export default function Education() {
  const navigate = useNavigate();
    const [loading, setLoading] = useState(true)

  // Handle Edit Navigation (Education List)
  const handleEducationEdit = (filterName) => {
    if (filterName === "Highest Education") {
      navigate("/dashboard/highest-education");
    } else if (filterName === "Teaching Qualification") {
      navigate("/dashboard/teaching-qualification");
    } else if (filterName === "Specialization") {
      navigate("/dashboard/seeker-search-filter/subject");
    }
  };

  // Handle Edit Navigation (Job Role List)
  const handleJobRoleEdit = (filterName) => {
    if (filterName === "Job Categories") {
      navigate("/dashboard/job-role-categories");
    }
  };

  // remove this before production
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <EducationLoader />

  return (
    <div className="education-container">
      <div className="education-rec">
        {/* Job Role List */}
        <div className="education-section">
          {/* Header */}
          <div className="education-title-button">
            <h2
              className="education-title"
              onClick={() => navigate("/dashboard/job-post-filter")}
            >
              <IoChevronBackOutline /> Job Role List
            </h2>
          </div>

          {/* Table */}
          <div className="education-table-container">
            <table className="education-table">
              <thead>
                <tr>
                  <th>Filter</th>
                  <th>Posted on</th>
                  <th>Created by</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {jobRoleFilter.map((item) => (
                  <tr key={item.id}>
                    <td>{item.filter}</td>
                    <td>{item.postedOn}</td>
                    <td>{item.createdBy}</td>
                    <td className="education-actions">
                      <button
                        className="education-btn edit-btn"
                        onClick={() => handleJobRoleEdit(item.filter)}
                      >
                        <BiSolidEdit />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Education List */}
        <div className="education-section">
          {/* Header */}
          <div className="education-title-button">
            <h2 className="education-title">
              Education List
            </h2>
          </div>

          {/* Table */}
          <div className="education-table-container">
            <table className="education-table">
              <thead>
                <tr>
                  <th>Filter</th>
                  <th>Posted on</th>
                  <th>Created by</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {educationFilter.map((item) => (
                  <tr key={item.id}>
                    <td>{item.filter}</td>
                    <td>{item.postedOn}</td>
                    <td>{item.createdBy}</td>
                    <td className="education-actions">
                      <button
                        className="education-btn edit-btn"
                        onClick={() => handleEducationEdit(item.filter)}
                      >
                        <BiSolidEdit />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
