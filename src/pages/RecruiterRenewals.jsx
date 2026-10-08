import React, { useContext, useState } from "react";
import { RecruiterSubscriptionContext } from "../UseContexts/GeneralUseContext/RecruiterSubscriptionContext/RecruiterSubscriptionContext.jsx";
import { MdAutorenew } from "react-icons/md";
import { FaCalendarAlt, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import ExtendSubscriptionModal from "../editpages/ExtendSubscriptionModal.jsx";
import "./RecruiterRenewals.css";

export default function RecruiterRenewals() {
  const { recruiters, loading, error } = useContext(RecruiterSubscriptionContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecruiter, setSelectedRecruiter] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

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

  // Calculate stats
  const stats = {
    total: recruiters.length,
    active: recruiters.filter((r) => getSubscriptionStatus(r.current_plan?.end_date) === "active").length,
    expired: recruiters.filter((r) => getSubscriptionStatus(r.current_plan?.end_date) === "expired").length,
  };

  // Filter recruiters
  const filteredRecruiters = recruiters.filter((r) => {
    const matchesSearch =
      r.schoolName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.schoolEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.phoneNumber?.includes(searchTerm);

    if (filterStatus === "all") return matchesSearch;
    return matchesSearch && getSubscriptionStatus(r.current_plan?.end_date) === filterStatus;
  });

  const handleExtendClick = (recruiter) => {
    setSelectedRecruiter(recruiter);
    setIsModalOpen(true);
  };

  if (loading) {
    return <div className="recruiter-renewals-loading">Loading recruiter renewals...</div>;
  }

  if (error) {
    return <div className="recruiter-renewals-error">Error: {error}</div>;
  }

  return (
    <div className="recruiter-renewals-container">
      {/* Header */}
      <div className="renewals-header">
        <div>
          <h1>Recruiter Renewals</h1>
          <p className="subtitle">Manage and extend recruiter subscription plans</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="renewals-stats-grid">
        <div className="stat-card total">
          <div className="stat-icon">
            <FaCalendarAlt />
          </div>
          <div className="stat-content">
            <p className="stat-label">Total Recruiters</p>
            <h3>{stats.total}</h3>
          </div>
        </div>
        <div className="stat-card active">
          <div className="stat-icon">
            <FaCheckCircle />
          </div>
          <div className="stat-content">
            <p className="stat-label">Active Plans</p>
            <h3>{stats.active}</h3>
          </div>
        </div>
        <div className="stat-card expired">
          <div className="stat-icon">
            <FaTimesCircle />
          </div>
          <div className="stat-content">
            <p className="stat-label">Expired Plans</p>
            <h3>{stats.expired}</h3>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="renewals-filters">
        <input
          type="text"
          className="filter-search"
          placeholder="Search by school name, email, or phone..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="filter-status"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="expired">Expired</option>
        </select>
      </div>

      {/* Table */}
      {filteredRecruiters.length > 0 ? (
        <div className="renewals-table-container">
          <table className="renewals-table">
            <thead>
              <tr>
                <th>School Name</th>
                <th>Plan</th>
                <th>End Date</th>
                <th>Days Remaining</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecruiters.map((recruiter) => {
                const daysRemaining = getDaysRemaining(recruiter.current_plan?.end_date);
                const status = getSubscriptionStatus(recruiter.current_plan?.end_date);

                return (
                  <tr key={recruiter.id}>
                    <td>
                      <div className="school-info">
                        <p className="school-name">{recruiter.schoolName}</p>
                        <p className="school-email">{recruiter.schoolEmail}</p>
                      </div>
                    </td>
                    <td>
                      <span className="plan-badge">
                        {recruiter.current_plan?.plan_name || "N/A"}
                      </span>
                    </td>
                    <td>{formatDate(recruiter.current_plan?.end_date)}</td>
                    <td>
                      <span className={`days-badge ${status}`}>
                        {daysRemaining > 0 ? `${daysRemaining} days` : "Expired"}
                      </span>
                    </td>
                    <td>
                      <span className={`status-badge ${status}`}>
                        {status === "active" && "Active"}
                        {status === "expiring" && "Expiring Soon"}
                        {status === "expired" && "Expired"}
                      </span>
                    </td>
                    <td>
                      <button
                        className="extend-btn"
                        onClick={() => handleExtendClick(recruiter)}
                        title="Extend subscription"
                      >
                        <MdAutorenew /> Extend
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="no-results">
          <p>No recruiters found matching your search criteria</p>
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
          recruiter={selectedRecruiter}
        />
      )}
    </div>
  );
}
