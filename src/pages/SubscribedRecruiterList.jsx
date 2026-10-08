import React, { useContext, useState, useEffect } from "react";
import { SubscribedContext } from "../UseContexts/RecruiterUseContext/SubscribedContext/SubscribedRecruiterContext";
import { RecruiterSubscriptionContext } from "../UseContexts/GeneralUseContext/RecruiterSubscriptionContext/RecruiterSubscriptionContext.jsx";
import { useSubscriptionPlans } from "../UseContexts/GeneralUseContext/SubscriptionPlansContext/SubscriptionPlanContext.jsx";
import CustomSelect from "../components/CustomSelect.jsx";
import "./SubscribedRecruiterList.css";
import { FaAngleDown, FaAngleUp, FaUserCheck } from "react-icons/fa6";
import { MdAutorenew } from "react-icons/md";
import * as XLSX from "xlsx";
import { toast } from "react-toastify";
import ExtendSubscriptionModal from "../editpages/ExtendSubscriptionModal.jsx";

const SubscribedRecruiterList = () => {
  const { loading, subscribed } = useContext(SubscribedContext);
  const { extendSubscription } = useContext(RecruiterSubscriptionContext);
  const { subscriptions } = useSubscriptionPlans();

  const [currentPage, setCurrentPage] = useState(1);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecruiter, setSelectedRecruiter] = useState(null);
  const [recruitersList, setRecruitersList] = useState(subscribed);

  const [selectedRecruiters, setSelectedRecruiters] = useState([]);

  // Sync recruitersList with subscribed data from context
  useEffect(() => {
    setRecruitersList(subscribed);
  }, [subscribed]);

  const [searchFilters, setSearchFilters] = useState({
    schoolName: "",
    phoneNumber: "",
    membership: "",
  });

  const [appliedFilters, setAppliedFilters] = useState({
    schoolName: "",
    phoneNumber: "",
    membership: "",
  });

  const handleApplySearch = () => {
    setAppliedFilters(searchFilters);
    setCurrentPage(1);
    setSearchModalOpen(false);
  };

  const handleClearSearch = () => {
    setSearchFilters({
      schoolName: "",
      phoneNumber: "",
      membership: "",
    });

    setAppliedFilters({
      schoolName: "",
      phoneNumber: "",
      membership: "",
    });

    setCurrentPage(1);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getDaysRemaining = (endDate) => {
    if (!endDate) return 0;
    const end = new Date(endDate);
    const today = new Date();
    const diffTime = end - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getSubscriptionStatus = (endDate) => {
    const daysRemaining = getDaysRemaining(endDate);
    if (daysRemaining > 30) return "active";
    if (daysRemaining > 0) return "expiring";
    return "expired";
  };

  const filteredRecruiters = recruitersList.filter((rec) => {
    const schoolMatch =
      appliedFilters.schoolName === "" ||
      rec.school_name
        ?.toLowerCase()
        .includes(appliedFilters.schoolName.toLowerCase());

    const phoneMatch =
      appliedFilters.phoneNumber === "" ||
      rec.school_phone?.toString().includes(appliedFilters.phoneNumber);

    const membershipMatch =
      appliedFilters.membership === "" ||
      rec.plan?.plan_name?.toLowerCase() === appliedFilters.membership.toLowerCase();

    return schoolMatch && phoneMatch && membershipMatch;
  });

  const recruitersPerPage = 15;

  const totalRecords = filteredRecruiters.length;

  const totalPages = Math.ceil(totalRecords / recruitersPerPage);

  // Pagination calculations (pure JS, safe)
  const indexOfLast = currentPage * recruitersPerPage;
  const indexOfFirst = indexOfLast - recruitersPerPage;

  const currentRecruiters = filteredRecruiters.slice(indexOfFirst, indexOfLast);

  const handleExtendSuccess = (recruiterId) => {
    // Update the recruiter's is_extended status immediately
    setRecruitersList((prevList) =>
      prevList.map((rec) =>
        rec.recruiter_id === recruiterId ? { ...rec, is_extended: true } : rec
      )
    );
  };

  const handleExtendClick = (recruiter) => {
    // Transform recruiter data to match ExtendSubscriptionModal format
    const transformedRecruiter = {
      id: recruiter.recruiter_id,
      schoolName: recruiter.school_name,
      schoolEmail: recruiter.school_email,
      phoneNumber: recruiter.school_phone,
      current_plan: recruiter.plan,
    };
    setSelectedRecruiter(transformedRecruiter);
    setIsModalOpen(true);
  };

  const handleDownload = () => {
    // If no recruiters selected, download all filtered recruiters (bulk download)
    const dataToExport = selectedRecruiters.length === 0
      ? filteredRecruiters
      : filteredRecruiters.filter((r) => selectedRecruiters.includes(r.recruiter_id));

    if (dataToExport.length === 0) {
      toast.warning("No recruiters to download.");
      return;
    }

    const excelData = dataToExport.map((r) => ({
      School: r.school_name || "N/A",
      Email: r.school_email || "N/A",
      Phone: r.school_phone || "N/A",
      Plan: r.plan?.plan_name || "N/A",
      Status: r.plan?.status || "N/A",
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Recruiters");
    const fileName = selectedRecruiters.length === 0 ? "all_subscribed_recruiters.xlsx" : "selected_subscribed_recruiters.xlsx";
    XLSX.writeFile(workbook, fileName);

    const message = selectedRecruiters.length === 0
      ? `Downloaded all ${dataToExport.length} recruiters successfully`
      : `Downloaded ${dataToExport.length} recruiter(s) successfully`;
    toast.success(message);
  };

  const handleSelectOne = (id) => {
    setSelectedRecruiters((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const pageIds = currentRecruiters.map((r) => r.recruiter_id);
      setSelectedRecruiters(pageIds);
    } else {
      setSelectedRecruiters([]);
    }
  };

  if (loading) return <p>Loading...</p>;
  return (
    <>
      <div className="recruiterprofile-container">
        {/* ===== RECRUITER LIST TABLE ===== */}
        <div className="recruiterprofile-rec-seek">
          <div className="recruiterprofile-section">
            <div className="recruiter-header-btn">
              <h2>Recruiter List</h2>

              {/* download recruiter  */}
              <div className="recruiter-header-buttons">
                <button
                  onClick={handleDownload}
                  className="seekerprofile-add-btn"
                >
                  Download
                </button>
                <button
                  onClick={() => setSearchModalOpen((prev) => !prev)}
                  className="seekerprofile-search-btn"
                >
                  Advanced Search
                  {searchModalOpen ? <FaAngleUp /> : <FaAngleDown />}
                </button>
              </div>
            </div>

            <div className="recruiterprofile-pagination">
              <span className="pagination-range">
                {currentPage} of {totalPages}
              </span>

              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                ❮
              </button>

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                ❯
              </button>
            </div>

            <div className="recruiter-table-wrapper">
              <div className="recruiterprofile-table-container">
                <table className="recruiterprofile-table">
                  <thead>
                    <tr>
                      <th>
                        <input
                          type="checkbox"
                          checked={
                            currentRecruiters.length > 0 &&
                            currentRecruiters.every((r) =>
                              selectedRecruiters.includes(r.recruiter_id)
                            )
                          }
                          onChange={handleSelectAll}
                        />
                      </th>

                      <th>School Name</th>
                      <th>Phone</th>
                      <th>Plan</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredRecruiters.length === 0 ? (
                      <tr>
                        <td colSpan="6">No subscribed recruiters found</td>
                      </tr>
                    ) : (
                      currentRecruiters.map((rec) => (
                        <tr
                          key={rec.recruiter_id}
                          className="recruiterprofile-row"
                        >
                          {/* Checkbox */}
                          <td>
                            <input
                              type="checkbox"
                              checked={selectedRecruiters.includes(rec.recruiter_id)}
                              onChange={() => handleSelectOne(rec.recruiter_id)}
                            />
                          </td>

                          {/* School */}
                          <td>
                            <div className="recruiter-school-cell">
                              {rec.school_image && (
                                <img
                                  src={rec.school_image}
                                  alt="school"
                                  className="school-logo"
                                />
                              )}
                              <div className="recruiter-school-info">
                                {rec.is_extended && (
                                  <span className="extended-badge">✓ Extended</span>
                                )}
                                <div className="school-name-with-email">
                                  <span className="school-name">{rec.school_name || "N/A"}</span>
                                  <span className="school-email-small">{rec.school_email || "N/A"}</span>
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* Phone */}
                          <td>{rec.school_phone || "N/A"}</td>

                          {/* Plan */}
                          <td>
                            <span className="plan-badge">
                              {rec.plan?.plan_name || "N/A"}
                            </span>
                          </td>

                          {/* Status */}
                          <td>{rec.plan?.status || "N/A"}</td>

                          {/* Action */}
                          <td>
                            <button
                              className="extend-btn"
                              onClick={() => handleExtendClick(rec)}
                              title="Extend subscription"
                            >
                              <MdAutorenew /> Extend
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {searchModalOpen && (
          <div
            className="recruiter-modal-overlay"
            onClick={() => setSearchModalOpen(false)}
          >
            <div
              className="recruiter-modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="recruiter-modal-close-btn"
                onClick={() => setSearchModalOpen(false)}
              >
                &times;
              </button>
              <h2 className="recruiter-modal-title">Advanced Search</h2>
              <div className="recruiter-modal-body">
                <div className="recruiter-search-field-group">
                  <label className="recruiter-search-label">School Name</label>
                  <input
                    type="text"
                    className="recruiter-search-input"
                    placeholder="School Name"
                    value={searchFilters.schoolName}
                    onChange={(e) =>
                      setSearchFilters((prev) => ({
                        ...prev,
                        schoolName: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className="recruiter-search-field-group">
                  <label className="recruiter-search-label">Phone Number</label>
                  <input
                    type="text"
                    className="recruiter-search-input"
                    placeholder="Phone Number"
                    value={searchFilters.phoneNumber}
                    onChange={(e) =>
                      setSearchFilters((prev) => ({
                        ...prev,
                        phoneNumber: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className="recruiter-search-field-group">
                  <label className="recruiter-search-label">Membership</label>
                  <CustomSelect
                    value={searchFilters.membership}
                    onChange={(val) =>
                      setSearchFilters((prev) => ({ ...prev, membership: val }))
                    }
                    options={[
                      { value: "", label: "All" },
                      ...subscriptions.map((s) => ({
                        value: s.name,
                        label: s.name,
                      })),
                    ]}
                    placeholder="All Plans"
                  />
                </div>

                <div className="recruiter-search-actions">
                  <button
                    type="button"
                    className="recruiter-search-btn-clear"
                    onClick={handleClearSearch}
                  >
                    Clear
                  </button>
                  <button
                    type="button"
                    className="recruiter-search-btn-apply"
                    onClick={handleApplySearch}
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      {/* Extend Modal */}
      {isModalOpen && selectedRecruiter && (
        <ExtendSubscriptionModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedRecruiter(null);
          }}
          onExtendSuccess={handleExtendSuccess}
          recruiter={selectedRecruiter}
        />
      )}
      </div>
    </>
  );
};

export default SubscribedRecruiterList;
