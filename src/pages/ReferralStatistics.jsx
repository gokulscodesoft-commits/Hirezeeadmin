import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./ReferralStatistics.css";
import { FaLink, FaChartLine, FaUserCircle } from "react-icons/fa";

const MODES = {
  seeker: {
    label: "Seeker Referrals",
    endpoint: "/api/admin-referral-statistics",
    nameLabel: "Name",
    searchPlaceholder: "Search by referrer name, email, or code...",
    referralsColumnLabel: "SEEKER Referrals",
    referredListKey: "referred_seekers",
    referredNameLabel: "Seeker Name",
    referredEmptyMessage: "No referred seekers yet",
    viewButtonTitle: "View referred seekers",
    loadingMessage: "Loading referral statistics...",
    errorMessage: "Failed to load referral statistics",
  },
  recruiter: {
    label: "Recruiter Referrals",
    endpoint: "/api/admin-recruiter-referral-statistics",
    nameLabel: "School Name",
    searchPlaceholder: "Search by school name, email, or code...",
    referralsColumnLabel: "RECRUITER Referrals",
    referredListKey: "referred_recruiters",
    referredNameLabel: "School Name",
    referredEmptyMessage: "No referred recruiters yet",
    viewButtonTitle: "View referred recruiters",
    loadingMessage: "Loading recruiter referral statistics...",
    errorMessage: "Failed to load recruiter referral statistics",
  },
};

const ReferralStatistics = () => {
  const [mode, setMode] = useState("seeker");
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState(null);
  const [selectedReferrer, setSelectedReferrer] = useState(null);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const ITEMS_PER_PAGE = 10;
  const config = MODES[mode];

  useEffect(() => {
    setStatistics(null);
    setPagination(null);
    setSearchTerm("");
    setSelectedReferrer(null);
    fetchReferralStatistics(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  const fetchReferralStatistics = async (page = 1) => {
    try {
      setLoading(true);
      const offset = (page - 1) * ITEMS_PER_PAGE;
      const response = await axios.get(
        `${API_BASE_URL}${config.endpoint}?limit=${ITEMS_PER_PAGE}&offset=${offset}`
      );

      if (response.data.status === "Success") {
        setStatistics(response.data.result);
        setPagination(response.data.result.pagination);
        setCurrentPage(page);
      }
    } catch (error) {
      console.error("Error fetching referral statistics:", error);
      toast.error(config.errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const calculateConversionRate = () => {
    if (!pagination || pagination.total === 0) return 0;
    return ((statistics.total_referrals / pagination.total) * 100).toFixed(1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      fetchReferralStatistics(currentPage - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleNextPage = () => {
    if (pagination && currentPage < pagination.total_pages) {
      fetchReferralStatistics(currentPage + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const getDisplayRange = () => {
    if (!pagination) return "0-0";
    const start = (currentPage - 1) * ITEMS_PER_PAGE + 1;
    const end = Math.min(currentPage * ITEMS_PER_PAGE, pagination.total);
    return `${start}-${end} of ${pagination.total}`;
  };

  const filteredReferrers = statistics
    ? statistics.referral_network.filter((referrer) =>
        [
          referrer.referrer_name,
          referrer.referrer_email,
          referrer.referrer_code,
        ]
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
    : [];

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const referredList = selectedReferrer
    ? selectedReferrer[config.referredListKey] || []
    : [];

  return (
    <div className="referral-container">
      {/* Header */}
      <div className="referral-header">
        <h1>Referral Statistics</h1>
        <p className="subtitle">Track who referred whom in your network</p>
      </div>

      {/* Seeker / Recruiter Tabs */}
      <div className="referral-tabs">
        {Object.keys(MODES).map((key) => (
          <button
            key={key}
            className={`referral-tab-btn ${mode === key ? "active" : ""}`}
            onClick={() => setMode(key)}
          >
            {MODES[key].label}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="loading">{config.loadingMessage}</p>
      ) : (
        <>
          {/* Stats Cards */}
          {statistics && (
            <div className="stats-cards">
              <div className="stat-card">
                <div className="stat-icon">
                  <FaLink />
                </div>
                <div className="stat-content">
                  <p className="stat-label">Total Referrals</p>
                  <p className="stat-value">{statistics.total_referrals}</p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">
                  <FaChartLine />
                </div>
                <div className="stat-content">
                  <p className="stat-label">Conversion Rate</p>
                  <p className="stat-value">{calculateConversionRate()}%</p>
                </div>
              </div>
            </div>
          )}

          {/* Search Section */}
          <div className="search-section">
            <input
              type="text"
              placeholder={config.searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <p className="search-count">
              {filteredReferrers.length} of{" "}
              {statistics?.referral_network.length || 0}
            </p>
          </div>

          {/* Pagination Controls */}
          {statistics && (
            <div className="pagination-section">
              <span className="pagination-range">
                {pagination ? getDisplayRange() : "Loading..."}
              </span>
              <div className="pagination-buttons">
                <button
                  className="pagination-btn"
                  onClick={handlePreviousPage}
                  disabled={!pagination || currentPage === 1}
                  title="Previous page"
                >
                  ❮
                </button>
                <button
                  className="pagination-btn"
                  onClick={handleNextPage}
                  disabled={!pagination || currentPage === pagination.total_pages}
                  title="Next page"
                >
                  ❯
                </button>
              </div>
            </div>
          )}

          {/* Referral Table */}
          <div className="referral-table-section">
            <h2>Referral Details</h2>
            {filteredReferrers.length === 0 ? (
              <p className="empty-state">No referrers found</p>
            ) : (
              <div className="referral-table-wrapper">
                <table className="referral-table">
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th></th>
                      <th>{config.nameLabel}</th>
                      <th>Phone</th>
                      <th>Referral Code</th>
                      <th>{config.referralsColumnLabel}</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredReferrers.map((referrer, index) => (
                      <tr key={referrer.referrer_id} className="referrer-row">
                        <td className="number-cell">{index + 1}</td>
                        <td className="avatar-cell">
                          {referrer.referrer_profile_img ? (
                            <img
                              src={referrer.referrer_profile_img}
                              alt={referrer.referrer_name}
                              className="avatar"
                            />
                          ) : (
                            <FaUserCircle className="avatar-icon" />
                          )}
                        </td>
                        <td className="name-cell referrer-name">
                          {referrer.referrer_name}
                        </td>
                        <td className="phone-cell">{referrer.referrer_phone}</td>
                        <td className="code-cell">
                          <code className="code-badge">
                            {referrer.referrer_code}
                          </code>
                        </td>
                        <td className="count-cell">{referrer.total_referred}</td>
                        <td className="action-cell">
                          <button
                            className="view-btn"
                            onClick={() => setSelectedReferrer(referrer)}
                            title={config.viewButtonTitle}
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}

      {/* Referrer Details Modal */}
      {selectedReferrer && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedReferrer(null)}
        >
          <div
            className="modal-content modal-large"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <div className="modal-header-content">
                <div className="modal-referrer-avatar">
                  {selectedReferrer.referrer_profile_img ? (
                    <img
                      src={selectedReferrer.referrer_profile_img}
                      alt={selectedReferrer.referrer_name}
                    />
                  ) : (
                    <FaUserCircle className="avatar-icon-large" />
                  )}
                </div>
                <div className="modal-referrer-info">
                  <h3>{selectedReferrer.referrer_name}</h3>
                  <p className="modal-referrer-code">
                    Code: <code>{selectedReferrer.referrer_code}</code>
                  </p>
                </div>
              </div>
              <button
                className="modal-close-btn"
                onClick={() => setSelectedReferrer(null)}
              >
                ✕
              </button>
            </div>
            <div className="modal-body">
              <h4 className="seekers-title">
                {config.referredNameLabel === "School Name" ? "Referred Recruiters" : "Referred Seekers"} ({referredList.length})
              </h4>
              {referredList.length === 0 ? (
                <p className="empty-message">{config.referredEmptyMessage}</p>
              ) : (
                <div className="seekers-table-container">
                  <table className="seekers-modal-table">
                    <thead>
                      <tr>
                        <th>No.</th>
                        <th></th>
                        <th>{config.referredNameLabel}</th>
                        <th>Phone</th>
                        <th>Code</th>
                        <th>Joined Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {referredList.map((item, index) => {
                        const id = item.seeker_id ?? item.recruiter_id;
                        const name = item.seeker_name ?? item.recruiter_name;
                        const code = item.seeker_code ?? item.recruiter_code;
                        const profileImg =
                          item.seeker_profile_img ?? item.recruiter_profile_img;

                        return (
                          <tr key={id}>
                            <td className="number-cell">{index + 1}</td>
                            <td className="avatar-cell">
                              {profileImg ? (
                                <img
                                  src={profileImg}
                                  alt={name}
                                  className="avatar"
                                />
                              ) : (
                                <FaUserCircle className="avatar-icon" />
                              )}
                            </td>
                            <td className="seeker-name">{name}</td>
                            <td className="seeker-phone">{item.referrer_phone}</td>
                            <td className="seeker-code">
                              <code className="code-badge">{code}</code>
                            </td>
                            <td className="seeker-date">
                              <span className="date-badge">
                                {formatDate(item.referred_date)}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button
                className="modal-btn-close"
                onClick={() => setSelectedReferrer(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReferralStatistics;
