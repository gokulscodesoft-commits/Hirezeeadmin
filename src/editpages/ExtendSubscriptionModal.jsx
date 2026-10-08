import React, { useState, useContext } from "react";
import { MdClose } from "react-icons/md";
import { RecruiterSubscriptionContext } from "../UseContexts/GeneralUseContext/RecruiterSubscriptionContext/RecruiterSubscriptionContext.jsx";
import "./ExtendSubscriptionModal.css";

export default function ExtendSubscriptionModal({ isOpen, onClose, recruiter, onExtendSuccess }) {
  const { extendSubscription } = useContext(RecruiterSubscriptionContext);
  const [days, setDays] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getCurrentEndDate = () => {
    const endDate = recruiter.current_plan?.end_date;
    return endDate ? new Date(endDate) : new Date();
  };

  const calculateNewDate = (daysValue) => {
    if (!daysValue) return "Select days to extend";
    const currentEnd = getCurrentEndDate();
    const numDays = parseInt(daysValue) || 0;
    const newEnd = new Date(currentEnd.getTime() + numDays * 24 * 60 * 60 * 1000);
    return newEnd.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getNewEndDate = (daysValue) => {
    if (!daysValue) return null;
    const currentEnd = getCurrentEndDate();
    const numDays = parseInt(daysValue) || 0;
    return new Date(currentEnd.getTime() + numDays * 24 * 60 * 60 * 1000);
  };

  const formatDateOnly = (date) => {
    if (!date) return "N/A";
    return date.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleExtend = async () => {
    const numDays = parseInt(days);
    if (!days || isNaN(numDays) || numDays <= 0) {
      setError("Please select a number below or enter days manually");
      return;
    }

    setLoading(true);
    try {
      await extendSubscription(recruiter.id, numDays);

      // Call success callback to update parent list immediately
      if (onExtendSuccess) {
        onExtendSuccess(recruiter.id);
      }

      // Auto close after 1 second
      setTimeout(() => {
        onClose();
        setDays("");
        setError("");
      }, 1000);
    } catch (err) {
      console.error("Failed to extend subscription:", err);
    } finally {
      setLoading(false);
    }
  };

  const quickExtendDays = [7, 30, 60, 90];

  if (!isOpen) return null;

  return (
    <div className="extend-modal-overlay">
      <div className="extend-modal-content">
        <div className="extend-modal-header">
          <h3>Extend Subscription</h3>
          <button
            className="extend-modal-close"
            onClick={onClose}
          >
            <MdClose size={24} />
          </button>
        </div>

        <div className="extend-modal-body">
          {/* Preview Card & Form */}
          {/* Recruiter Info */}
          <div className="recruiter-info-section">
            <h4>Recruiter Details</h4>
            <div className="info-row">
              <span className="label">School Name:</span>
              <span className="value">{recruiter.schoolName}</span>
            </div>
            <div className="info-row">
              <span className="label">Current Plan:</span>
              <span className="value plan-badge">{recruiter.current_plan?.plan_name}</span>
            </div>
            <div className="info-row">
              <span className="label">Current End Date:</span>
              <span className="value end-date-value">{formatDate(recruiter.current_plan?.end_date)}</span>
            </div>
          </div>

          {/* Extension Form */}
          <div className="extension-form-section">
            <h4>Extend Period</h4>

            {/* Days Input */}
            <div className="form-group">
              <label>Days to Extend</label>
              <input
                type="text"
                value={days}
                onChange={(e) => {
                  const numericValue = e.target.value.replace(/[^0-9]/g, "");
                  setDays(numericValue);
                  setError("");
                }}
                className={`days-input ${error ? "input-error" : ""}`}
                disabled={loading}
                placeholder="Enter number only"
              />
              {error && <span className="error-message">{error}</span>}
            </div>

            {/* Quick Buttons */}
            <div className="quick-extend-buttons">
              {quickExtendDays.map((d) => (
                <button
                  key={d}
                  className={`quick-btn ${parseInt(days) === d ? "active" : ""}`}
                  onClick={() => setDays(d.toString())}
                  disabled={loading}
                >
                  +{d}d
                </button>
              ))}
            </div>

            {/* New End Date Preview */}
            <div className="new-end-date">
              <p className="preview-label">New End Date</p>
              <p className="preview-date">{calculateNewDate(days)}</p>
            </div>

            {/* Preview Details Card */}
            {days && (
              <div className="preview-details-card">
                <div className="preview-badge">Preview</div>
                <div className="detail-item">
                  <span className="detail-icon">🏫</span>
                  <div className="detail-content">
                    <p className="detail-label">School Name</p>
                    <p className="detail-value">{recruiter.schoolName}</p>
                  </div>
                </div>
                <div className="detail-item">
                  <span className="detail-icon">📋</span>
                  <div className="detail-content">
                    <p className="detail-label">Plan Name</p>
                    <p className="detail-value">{recruiter.current_plan?.plan_name}</p>
                  </div>
                </div>
                <div className="detail-item">
                  <span className="detail-icon">➕</span>
                  <div className="detail-content">
                    <p className="detail-label">Days Added</p>
                    <p className="detail-value">+{days} days</p>
                  </div>
                </div>
                <div className="detail-item">
                  <span className="detail-icon">📅</span>
                  <div className="detail-content">
                    <p className="detail-label">Date Comparison</p>
                    <p className="detail-value">{formatDate(recruiter.current_plan?.end_date)} → {getNewEndDate(days) ? formatDateOnly(getNewEndDate(days)) : "N/A"}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="extend-modal-actions">
          <button
            className="extend-modal-cancel-btn"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            className="extend-modal-confirm-btn"
            onClick={handleExtend}
            disabled={loading}
          >
            {loading ? "Extending..." : "Confirm Extension"}
          </button>
        </div>
      </div>
    </div>
  );
}
