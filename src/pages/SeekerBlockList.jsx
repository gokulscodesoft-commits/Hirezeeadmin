import { useContext, useEffect, useState } from "react";

import { useNavigate, useLocation } from "react-router-dom";
import { IoIosPeople } from "react-icons/io";
import { FaUserClock, FaUserCheck, FaDeleteLeft } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import SeekerFilterModal from "../editpages/SeekerFilterModal.jsx";
import { SeekerProfileLoader } from "../Loader/Loader.jsx";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { toast } from "react-toastify";
import axios from "axios";
import "./SeekerProfile.css";
import { SeekerProfileContext } from "../UseContexts/SeekerUseContext/SeekerProfileContent.jsx";

const SeekerBlockList = () => {
  const { blockedUsers, blockusersList, loading, toggleBlockSeeker } =
    useContext(SeekerProfileContext);

  useEffect(() => {
    blockusersList();
  }, []);

  const [visibleColumns] = useState([
    "name",
    "phone",
    "email",
    "image",
    "status",
    "action",
  ]);

  const allColumns = [
    { key: "name", label: "Name" },
    { key: "phone", label: "Phone" },
    { key: "email", label: "Email" },
    { key: "image", label: "Image" },
    { key: "status", label: "Status" },
    { key: "action", label: "Action" },
  ];

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <div className="seekerprofile-container">
        {/* Table */}
        <div className="seekerprofile-table-container">
          <table className="seekerprofile-table">
            <thead>
              <tr>
                {allColumns
                  .filter((c) => visibleColumns.includes(c.key))
                  .map((col) => (
                    <th key={col.key}>{col.label}</th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {blockedUsers.map((user) => (
                <tr key={user.id}>
                  {visibleColumns.includes("name") && <td>{user.name}</td>}

                  {visibleColumns.includes("phone") && <td>{user.phone}</td>}

                  {visibleColumns.includes("email") && <td>{user.email}</td>}

                  {visibleColumns.includes("image") && (
                    <td>
                      {user.profile_img ? (
                        <img
                          src={user.profile_img}
                          alt="profile"
                          width="40"
                          height="40"
                          style={{ borderRadius: "50%" }}
                        />
                      ) : (
                        <FaUserCircle size={40} />
                      )}
                    </td>
                  )}

                  {visibleColumns.includes("status") && (
                    <td>
                      <span className="status-badge blocked">Blocked</span>
                    </td>
                  )}

                  {visibleColumns.includes("action") && (
                    <td>
                      <button
                        className="block-btn"
                        onClick={() => toggleBlockSeeker(user.id, "blocked")}
                      >
                        Unblock
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default SeekerBlockList;
