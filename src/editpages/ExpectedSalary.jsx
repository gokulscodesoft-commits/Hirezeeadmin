// // src/pages/ExpectedSalary.jsx
// import React, { useState, useContext } from "react";
// import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
// import { BiSolidEdit } from "react-icons/bi";
// import { AiOutlineDelete } from "react-icons/ai"; // 👈 NEW
// import { IoChevronBackOutline } from "react-icons/io5";
// import { useNavigate } from "react-router-dom";
// import "./expectedSalary.css";
// import AddSalaryModal from "./AddSalaryModal";
// import EditSalaryModal from "./EditSalaryModal";
// import { ExpectedSalaryContext } from "../UseContexts/SeekerUseContext/ExpectedSalaryContext";

// export default function ExpectedSalary() {
//   const navigate = useNavigate();
//   const { salaries, loading, addSalary, updateSalary, deleteSalary } =
//     useContext(ExpectedSalaryContext); // 👈 include deleteSalary

//   const [hiddenRows, setHiddenRows] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 9;
//   const totalPages = Math.ceil(salaries.length / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const paginatedData = salaries.slice(startIndex, startIndex + itemsPerPage);

//   const [showAddModal, setShowAddModal] = useState(false);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [newRange, setNewRange] = useState("");
//   const [editId, setEditId] = useState(null);

//   const handleAddSalary = async () => {
//     if (!newRange.trim()) return;
//     await addSalary({ salary: newRange });
//     setNewRange("");
//     setShowAddModal(false);
//   };

//   const handleEditSalary = (id, currentRange) => {
//     setEditId(id);
//     setNewRange(currentRange);
//     setShowEditModal(true);
//   };

//   const handleUpdateSalary = async () => {
//     await updateSalary(editId, newRange);
//     setShowEditModal(false);
//     setNewRange("");
//     setEditId(null);
//   };

//   const handleDeleteSalary = async (id) => {
//     if (window.confirm("Are you sure you want to delete this salary range?")) {
//       await deleteSalary(id);
//     }
//   };

//   const toggleHideRow = (id) => {
//     setHiddenRows((prev) =>
//       prev.includes(id) ? prev.filter((hid) => hid !== id) : [...prev, id]
//     );
//   };

//   return (
//     <div className="expectedSalary-container">
//       <div className="expectedSalary-rec">
//         <div className="expectedSalary-section">
//           <div className="title-button">
//             <h2
//               className="expectedSalary-title"
//               onClick={() => navigate("/dashboard/seeker-search-filter")}
//             >
//               <IoChevronBackOutline /> Expected Salary List
//             </h2>
//             <button
//               className="expectedSalary-add-btn"
//               onClick={() => setShowAddModal(true)}
//             >
//               Add Salary Range
//             </button>
//           </div>

//           <div className="expectedSalary-table-container">
//             {loading ? (
//               <p>Loading...</p>
//             ) : (
//               <table className="expectedSalary-table">
//                 <thead>
//                   <tr>
//                     <th>Salary Range</th>
//                     <th>Min Value</th>
//                     <th>Max Value</th>
//                     <th>Posted on</th>
//                     <th>Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {paginatedData.map((salary) => (
//                     <tr
//                       key={salary.id}
//                       className={
//                         hiddenRows.includes(salary.id) ? "hidden-row" : ""
//                       }
//                     >
//                       <td>{salary.salary}</td>
//                       <td>{salary.min_value}</td>
//                       <td>{salary.max_value}</td>
//                       <td>
//                         {new Date(salary.created_at).toLocaleDateString()}
//                       </td>
//                       <td className="expectedSalary-actions">
//                         <button
//                           className="expectedSalary-btn view-btn"
//                           onClick={() => toggleHideRow(salary.id)}
//                         >
//                           {hiddenRows.includes(salary.id) ? (
//                             <FaRegEyeSlash />
//                           ) : (
//                             <FaRegEye />
//                           )}
//                         </button>
//                         <button
//                           className="expectedSalary-btn edit-btn"
//                           onClick={() =>
//                             handleEditSalary(salary.id, salary.salary)
//                           }
//                         >
//                           <BiSolidEdit />
//                         </button>
//                         <button
//                           className="expectedSalary-btn delete-btn"
//                           onClick={() => handleDeleteSalary(salary.id)}
//                         >
//                           <AiOutlineDelete />
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             )}

//             {!loading && salaries.length > 0 && (
//               <div className="pagination">
//                 <button
//                   disabled={currentPage === 1}
//                   onClick={() => setCurrentPage(currentPage - 1)}
//                 >
//                   Prev
//                 </button>
//                 {[...Array(totalPages)].map((_, index) => (
//                   <button
//                     key={index + 1}
//                     className={currentPage === index + 1 ? "active" : ""}
//                     onClick={() => setCurrentPage(index + 1)}
//                   >
//                     {index + 1}
//                   </button>
//                 ))}
//                 <button
//                   disabled={currentPage === totalPages}
//                   onClick={() => setCurrentPage(currentPage + 1)}
//                 >
//                   Next
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {showAddModal && (
//         <AddSalaryModal
//           onClose={() => setShowAddModal(false)}
//           onCreate={handleAddSalary}
//           newRange={newRange}
//           setNewRange={setNewRange}
//         />
//       )}
//       {showEditModal && (
//         <EditSalaryModal
//           onClose={() => setShowEditModal(false)}
//           onSave={handleUpdateSalary}
//           newRange={newRange}
//           setNewRange={setNewRange}
//         />
//       )}
//     </div>
//   );
// }

// src/pages/ExpectedSalary.jsx
import React, { useState, useContext } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { BiSolidEdit } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import { IoChevronBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import "./ExpectedSalary.css";
import AddSalaryModal from "./AddSalaryModal";
import EditSalaryModal from "./EditSalaryModal";
import { ExpectedSalaryContext } from "../UseContexts/SeekerUseContext/ExpectedSalaryContext";

export default function ExpectedSalary() {
  const navigate = useNavigate();

  const { salaries, loading, addSalary, updateSalary, deleteSalary } =
    useContext(ExpectedSalaryContext);

  const [hiddenRows, setHiddenRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const totalPages = Math.ceil(salaries.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = salaries.slice(startIndex, startIndex + itemsPerPage);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newRange, setNewRange] = useState("");
  const [editId, setEditId] = useState(null);

  const handleAddSalary = async () => {
    if (!newRange.trim()) return;
    await addSalary({ salary: newRange });
    setNewRange("");
    setShowAddModal(false);
  };

  const handleEditSalary = (id, currentRange) => {
    setEditId(id);
    setNewRange(currentRange);
    setShowEditModal(true);
  };

  const handleUpdateSalary = async () => {
    await updateSalary(editId, newRange);
    setShowEditModal(false);
    setNewRange("");
    setEditId(null);
  };

  // ✅ NO CONFIRMATION — DIRECT DELETE
  const handleDeleteSalary = async (id) => {
    await deleteSalary(id);
  };

  const toggleHideRow = (id) => {
    setHiddenRows((prev) =>
      prev.includes(id) ? prev.filter((hid) => hid !== id) : [...prev, id]
    );
  };

  return (
    <div className="expectedSalary-container">
      <div className="expectedSalary-rec">
        <div className="expectedSalary-section">
          <div className="title-button">
            <h2
              className="expectedSalary-title"
              onClick={() => navigate("/dashboard/seeker-search-filter")}
            >
              <IoChevronBackOutline /> Expected Salary List
            </h2>

            <button
              className="expectedSalary-add-btn"
              onClick={() => setShowAddModal(true)}
            >
              Add Salary Range
            </button>
          </div>

          <div className="expectedSalary-table-container">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <table className="expectedSalary-table">
                <thead>
                  <tr>
                    <th>Salary Range</th>
                    <th>Min Value</th>
                    <th>Max Value</th>
                    <th>Posted on</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {paginatedData.map((salary) => (
                    <tr
                      key={salary.id}
                      className={
                        hiddenRows.includes(salary.id) ? "hidden-row" : ""
                      }
                    >
                      <td>{salary.salary}</td>
                      <td>{salary.min_value}</td>
                      <td>{salary.max_value}</td>
                      <td>
                        {new Date(salary.created_at).toLocaleDateString()}
                      </td>
                      <td className="expectedSalary-actions">
                        {/* <button
                          className="expectedSalary-btn view-btn"
                          onClick={() => toggleHideRow(salary.id)}
                        >
                          {hiddenRows.includes(salary.id) ? (
                            <FaRegEyeSlash />
                          ) : (
                            <FaRegEye />
                          )}
                        </button> */}

                        <button
                          className="expectedSalary-btn edit-btn"
                          onClick={() =>
                            handleEditSalary(salary.id, salary.salary)
                          }
                        >
                          <BiSolidEdit />
                        </button>

                        <button
                          className="expectedSalary-btn delete-btn"
                          onClick={() => handleDeleteSalary(salary.id)}
                        >
                          <AiOutlineDelete />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {!loading && salaries.length > 0 && (
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

      {showAddModal && (
        <AddSalaryModal
          onClose={() => setShowAddModal(false)}
          onCreate={handleAddSalary}
          newRange={newRange}
          setNewRange={setNewRange}
        />
      )}

      {showEditModal && (
        <EditSalaryModal
          onClose={() => setShowEditModal(false)}
          onSave={handleUpdateSalary}
          newRange={newRange}
          setNewRange={setNewRange}
        />
      )}
    </div>
  );
}
