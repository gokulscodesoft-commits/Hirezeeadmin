import React from "react";
import "./SeekerProfile.css";

import { useContext, useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { RecruiterProfileContext } from "../UseContexts/RecruiterUseContext/RecruiterProfileContext/RecruiterProfileContext";

const RecruiterBlockList = () => {
  const {
    blockedRecruiters,
    blockRecruitersList,
    loading,
    toggleBlockRecruiter,
  } = useContext(RecruiterProfileContext);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Pagination calculations
  const totalItems = blockedRecruiters.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const paginatedRecruiters = blockedRecruiters.slice(indexOfFirst, indexOfLast);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  useEffect(() => {
    blockRecruitersList();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <div className="seekerprofile-container">
        {/* Pagination Header */}
        <div className="pagination-header-top">
          <span className="pagination-info">
            {totalItems > 0
              ? `${indexOfFirst + 1}-${Math.min(indexOfLast, totalItems)} of ${totalItems}`
              : "0 of 0"}
          </span>
          <div className="pagination-buttons">
            <button
              className="pagination-btn"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              ‹
            </button>
            <button
              className="pagination-btn"
              onClick={handleNextPage}
              disabled={currentPage === totalPages || totalPages === 0}
            >
              ›
            </button>
          </div>
        </div>

        <div className="seekerprofile-table-container">
          <table className="seekerprofile-table">
            <thead>
              <tr>
                <th>School Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Image</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {paginatedRecruiters.map((user) => (
                <tr key={user.id}>
                  <td>{user.schoolName}</td>
                  <td>{user.schoolPhone}</td>
                  <td>{user.schoolEmail}</td>

                  <td>
                    {user.schoolImage ? (
                      <img
                        src={user.schoolImage}
                        alt="school"
                        width="40"
                        height="40"
                        style={{ borderRadius: "50%" }}
                      />
                    ) : (
                      <FaUserCircle size={40} />
                    )}
                  </td>

                  <td>
                    <span className="status-badge blocked">Blocked</span>
                  </td>

                  <td>
                    <button
                      className="block-btn"
                      onClick={() => toggleBlockRecruiter(user.id, user.status)}
                    >
                      Unblock
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default RecruiterBlockList;
