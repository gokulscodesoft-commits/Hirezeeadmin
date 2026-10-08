import { useState, useEffect } from "react";
import { BiSolidEdit } from "react-icons/bi";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./SeekerSearchFilter.css";
import { seekerSearchPages, seekerFilterRoutes } from "../data/contentData.js";

import SeekerSearchLoader from "../Loader/Loader.jsx"

export default function SeekerSearchFilter() {
  const [filterList, setFilterList] = useState(seekerSearchPages);
  const [hiddenRows, setHiddenRows] = useState([]); // store ids of hidden rows
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

   // remove this before production
    useEffect(() => {
      const timer = setTimeout(() => setLoading(false), 400);
      return () => clearTimeout(timer);
    }, []);

  const handleEdit = (filter) => {
    const path = seekerFilterRoutes[filter.specifications];
    if (path) navigate(path);
  };

  // const handleDelete = (id) => {
  //   setFilterList(filterList.filter((f) => f.id !== id));
  // };

  const toggleHideRow = (id) => {
    if (hiddenRows.includes(id)) {
      setHiddenRows(hiddenRows.filter((hid) => hid !== id));
    } else {
      setHiddenRows([...hiddenRows, id]);
    }
  };

  if (loading) return <SeekerSearchLoader/>

  return (
    <div className="seekerfilter-container">
      <div className="seekerfilter-rec-seek">
        <div className="seekerfilter-section">
          <h2>All Seeker Filters List</h2>
          <div className="seekerfilter-table-container">
            <button className="seekerfilter-add-btn">Add Filter</button>
            <table className="seekerfilter-table">
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
                    <td className="seekerfilter-actions">
                      {/* <button
                        className="seekerfilter-btn view-btn"
                        onClick={() => toggleHideRow(filter.id)}
                      >
                        {hiddenRows.includes(filter.id) ? (
                          <FaRegEyeSlash />
                        ) : (
                          <FaRegEye />
                        )}
                      </button> */}

                      {filter.specifications !== "Location" && (
                        <button
                          className="seekerfilter-btn edit-btn"
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
