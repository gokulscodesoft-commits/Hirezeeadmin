import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BiSolidEdit } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import "./JobPostFilter.css";
import { jobPostSearchPages, jobPostFilterRoutes } from "../data/contentData.js";
import { JobPostLoader } from "../Loader/Loader.jsx"

export default function JobPostFilter() {
  const navigate = useNavigate();
  const [filterList, setFilterList] = useState(jobPostSearchPages);
  const [hiddenRows, setHiddenRows] = useState([]);
  const [loading, setLoading] = useState(true)

  const handleEdit = (filter) => {
    const path = jobPostFilterRoutes[filter.specifications];
    if (path) navigate(path);
  };

  const handleDelete = (id) => {
    setFilterList(filterList.filter((f) => f.id !== id));
  };

  const toggleHideRow = (id) => {
    if (hiddenRows.includes(id)) {
      setHiddenRows(hiddenRows.filter((hid) => hid !== id));
    } else {
      setHiddenRows([...hiddenRows, id]);
    }
  };

  // remove this before production
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <JobPostLoader />

  return (
    <div className="jobpostfilter-container">
      <div className="jobpostfilter-rec-seek">
        <div className="jobpostfilter-section">
          <h2>All Job Post Filters List</h2>
          <div className="jobpostfilter-table-container">
            {/* <button className="jobpostfilter-add-btn">Add Filter</button> */}

            <table className="jobpostfilter-table">
              <thead>
                <tr>
                  <th>Specification</th>
                  <th>Posted on</th>
                  <th>Created by</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {filterList.map((filter) => (
                  <tr
                    key={filter.id}
                    className={hiddenRows.includes(filter.id) ? "hidden-row" : ""}
                  >
                    <td>{filter.specifications}</td>
                    <td>{filter.postedOn}</td>
                    <td>{filter.createdBy}</td>
                    <td className="jobpostfilter-actions">
                      {/* <button
                        className="jobpostfilter-btn view-btn"
                        onClick={() => toggleHideRow(filter.id)}
                      >
                        {hiddenRows.includes(filter.id) ? (
                          <FaRegEyeSlash />
                        ) : (
                          <FaRegEye />
                        )}
                      </button> */}

                      {!["Location", "Pincode", "Number Of Opening"].includes(
                        filter.specifications
                      ) && (
                          <button
                            className="jobpostfilter-btn edit-btn"
                            onClick={() => handleEdit(filter)}
                          >
                            <BiSolidEdit />
                          </button>
                        )}
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
