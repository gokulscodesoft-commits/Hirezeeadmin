import React, { useState, useEffect, useContext } from "react";
import Select from "react-select";
import { FaUserCircle, FaChartLine, FaCopy, FaCheck, FaBriefcase, FaUsers, FaLink, FaSchool } from "react-icons/fa";
import { toast } from "react-toastify";
import "./PartnerReferralStatistics.css";
import { PartnerReferralStatisticsContext } from "../UseContexts/PartnerUseContext/PartnerReferralStatisticsContext";

const INDIAN_STATES = [
  "Andaman and Nicobar",
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chandigarh",
  "Chhattisgarh",
  "Dadra and Nagar Haveli",
  "Daman and Diu",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu and Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Ladakh",
  "Lakshadweep",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Puducherry",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

const stateOptions = INDIAN_STATES.map((state) => ({
  value: state,
  label: state,
}));

const customSelectStyles = {
  control: (base, state) => ({
    ...base,
    padding: "6px 8px",
    border: state.isFocused ? "2px solid #ef6b37" : "1px solid #e9ecef",
    borderRadius: "6px",
    fontSize: "14px",
    fontWeight: 500,
    boxShadow: state.isFocused ? "0 0 0 3px rgba(239, 107, 55, 0.1)" : "0 2px 4px rgba(0, 0, 0, 0.05)",
    cursor: "pointer",
    transition: "all 0.2s ease",
    backgroundColor: "#fff",
  }),
  option: (base, state) => ({
    ...base,
    padding: "10px 12px",
    backgroundColor: state.isSelected
      ? "#ef6b37"
      : state.isFocused
      ? "#f8f9fa"
      : "#fff",
    color: state.isSelected ? "#fff" : "#495057",
    fontWeight: state.isSelected ? 600 : 500,
    cursor: "pointer",
    transition: "all 0.15s ease",
  }),
  menuList: (base) => ({
    ...base,
    maxHeight: "250px",
    borderRadius: "6px",
  }),
  singleValue: (base) => ({
    ...base,
    color: "#495057",
    fontWeight: 500,
  }),
  placeholder: (base) => ({
    ...base,
    color: "#adb5bd",
  }),
};

const PartnerReferralStatistics = () => {
  const {
    statistics,
    loading,
    pagination,
    filterState,
    fetchStatistics,
    updateSearchAndFetch,
    updateStateFilter,
    changePage,
  } = useContext(PartnerReferralStatisticsContext);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [modalView, setModalView] = useState("seekers"); // "seekers" | "recruiters"
  const [copiedCode, setCopiedCode] = useState(null);

  // Fetch statistics on component mount
  useEffect(() => {
    fetchStatistics(1);
  }, []);

  const handleSearch = (e) => {
    const search = e.target.value;
    setSearchTerm(search);
    updateSearchAndFetch(search);
  };

  const handlePreviousPage = () => {
    if (pagination.current_page > 1) {
      changePage(pagination.current_page - 1);
    }
  };

  const handleNextPage = () => {
    if (pagination.current_page < pagination.total_pages) {
      changePage(pagination.current_page + 1);
    }
  };

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    toast.success("Referral code copied!");
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="partner-referral-container">
      {/* Header */}
      <div className="referral-header">
        <h1>
          <FaChartLine className="header-icon" /> Partner Referral Statistics
        </h1>
        <p className="subtitle">Track partner referrals and seeker details</p>
      </div>

      {/* Statistics Cards */}
      <div className="stats-cards-container">
        <div className="stat-card">
          <div className="stat-icon partners-icon">
            <FaBriefcase />
          </div>
          <div className="stat-content">
            <p className="stat-label">Total Partners</p>
            <h3 className="stat-value">{pagination.total}</h3>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon seekers-icon">
            <FaUsers />
          </div>
          <div className="stat-content">
            <p className="stat-label">Total Referred Seekers</p>
            <h3 className="stat-value">
              {statistics.reduce((sum, partner) => sum + partner.total_seekers_referred, 0)}
            </h3>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon recruiters-icon">
            <FaSchool />
          </div>
          <div className="stat-content">
            <p className="stat-label">Total Referred Recruiters</p>
            <h3 className="stat-value">
              {statistics.reduce((sum, partner) => sum + (partner.total_recruiters_referred || 0), 0)}
            </h3>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon codes-icon">
            <FaLink />
          </div>
          <div className="stat-content">
            <p className="stat-label">Active Referral Codes</p>
            <h3 className="stat-value">{statistics.length}</h3>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="referral-search-section">
        <input
          type="text"
          placeholder="Search by partner name or referral code..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
        <Select
          options={[
            { value: "", label: "All States" },
            ...stateOptions,
          ]}
          value={
            filterState
              ? { value: filterState, label: filterState }
              : { value: "", label: "All States" }
          }
          onChange={(option) => {
            updateStateFilter(option.value);
          }}
          placeholder="All States"
          isClearable={false}
          isSearchable
          styles={customSelectStyles}
          className="state-filter-select"
        />
      </div>

      {/* Statistics Table Section */}
      <div className="referral-table-section">
        <div className="table-header">
          <h2>All Partners ({pagination.total})</h2>
        </div>

        {/* Pagination */}
        {statistics.length > 0 && (
          <div className="pagination-controls">
            <span className="pagination-info">
              {(pagination.current_page - 1) * pagination.limit + 1}-
              {Math.min(pagination.current_page * pagination.limit, pagination.total)} of{" "}
              {pagination.total}
            </span>
            <div className="pagination-buttons">
              <button
                onClick={handlePreviousPage}
                disabled={pagination.current_page === 1 || loading}
                className="pagination-btn"
              >
                ❮
              </button>
              <button
                onClick={handleNextPage}
                disabled={pagination.current_page >= pagination.total_pages || loading}
                className="pagination-btn"
              >
                ❯
              </button>
            </div>
          </div>
        )}

        {loading ? (
          <p className="loading-state">Loading statistics...</p>
        ) : statistics.length === 0 ? (
          <p className="empty-state">No partners found</p>
        ) : (
          <div className="table-wrapper">
            <table className="referral-table">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Partner Name</th>
                  <th>Phone</th>
                  <th>City</th>
                  <th>Referral Code</th>
                  <th>Seeker Referrals</th>
                  <th>Recruiter Referrals</th>
                  <th>Created Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {statistics.map((partner, index) => (
                  <tr key={partner.partner_id}>
                    <td className="number-cell">
                      {(pagination.current_page - 1) * pagination.limit + index + 1}
                    </td>
                    <td className="name-cell">{partner.partner_name}</td>
                    <td className="phone-cell">{partner.partner_phone}</td>
                    <td className="city-cell">{partner.partner_city}</td>
                    <td className="code-cell">
                      <div className="code-container">
                        <code className="code-badge">{partner.referral_code}</code>
                        <button
                          className={`copy-btn ${
                            copiedCode === partner.referral_code ? "copied" : ""
                          }`}
                          onClick={() => handleCopyCode(partner.referral_code)}
                          title="Copy referral code"
                        >
                          {copiedCode === partner.referral_code ? (
                            <FaCheck />
                          ) : (
                            <FaCopy />
                          )}
                        </button>
                      </div>
                    </td>
                    <td className="referred-cell">
                      <span className="referred-badge">
                        {partner.total_seekers_referred}
                      </span>
                    </td>
                    <td className="referred-cell">
                      <span className="referred-badge">
                        {partner.total_recruiters_referred || 0}
                      </span>
                    </td>
                    <td className="date-cell">
                      {new Date(partner.partner_created_at).toLocaleDateString()}
                    </td>
                    <td className="action-cell">
                      <button
                        className="view-btn"
                        onClick={() => {
                          setSelectedPartner(partner);
                          setModalView("seekers");
                        }}
                        disabled={partner.total_seekers_referred === 0}
                      >
                        View Seekers
                      </button>
                      <button
                        className="view-btn"
                        onClick={() => {
                          setSelectedPartner(partner);
                          setModalView("recruiters");
                        }}
                        disabled={!partner.total_recruiters_referred}
                      >
                        View Recruiter
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Referred Seekers / Recruiters Modal */}
      {selectedPartner && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>
                {selectedPartner.partner_name} -{" "}
                {modalView === "seekers" ? "Referred Seekers" : "Referred Recruiters"}
              </h3>
              <button
                className="close-btn"
                onClick={() => setSelectedPartner(null)}
              >
                ✕
              </button>
            </div>

            {modalView === "seekers" ? (
              selectedPartner.seekers && selectedPartner.seekers.length > 0 ? (
                <div className="seekers-table-wrapper">
                  <table className="seekers-table">
                    <thead>
                      <tr>
                        <th>No.</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Referred Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedPartner.seekers.map((seeker, index) => (
                        <tr key={seeker.user_id}>
                          <td className="seeker-number">{index + 1}</td>
                          <td className="seeker-name">
                            <div className="seeker-info">
                              {seeker.profile_img_url ? (
                                <img
                                  src={seeker.profile_img_url}
                                  alt={seeker.name}
                                  className="seeker-avatar"
                                />
                              ) : (
                                <FaUserCircle className="seeker-avatar-icon" />
                              )}
                              <span>{seeker.name}</span>
                            </div>
                          </td>
                          <td className="seeker-email">{seeker.email}</td>
                          <td className="seeker-phone">{seeker.phone}</td>
                          <td className="seeker-date">
                            {new Date(seeker.referred_at).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="no-seekers">No seekers referred yet</p>
              )
            ) : selectedPartner.recruiters && selectedPartner.recruiters.length > 0 ? (
              <div className="seekers-table-wrapper">
                <table className="seekers-table">
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>School Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Referred Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedPartner.recruiters.map((recruiter, index) => (
                      <tr key={recruiter.recruiter_id}>
                        <td className="seeker-number">{index + 1}</td>
                        <td className="seeker-name">
                          <div className="seeker-info">
                            {recruiter.school_image_url ? (
                              <img
                                src={recruiter.school_image_url}
                                alt={recruiter.school_name}
                                className="seeker-avatar"
                              />
                            ) : (
                              <FaUserCircle className="seeker-avatar-icon" />
                            )}
                            <span>{recruiter.school_name || "N/A"}</span>
                          </div>
                        </td>
                        <td className="seeker-email">{recruiter.school_email || "N/A"}</td>
                        <td className="seeker-phone">{recruiter.phone}</td>
                        <td className="seeker-date">
                          {new Date(recruiter.referred_at).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="no-seekers">No recruiters referred yet</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PartnerReferralStatistics;
