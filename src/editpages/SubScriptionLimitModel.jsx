import React, { useState, useEffect } from "react";
import "./SubScriptionLimitModel.css";

const SubScriptionLimitModel = ({ isOpen, onClose, onSave, subscription }) => {
  const [aiLimits, setAilimits] = useState("");
  const [applicantviews, setApplicantviews] = useState("");
  const [totalJobpost, setTotalJobpost] = useState("");
  const [contactDetails, setContactDetails] = useState("");
  const [viewsType, setViewsType] = useState("");
  const [trialDays, setTrialDays] = useState("");

  if (!isOpen) return null;

  useEffect(() => {
    if (subscription) {
      setAilimits(
        subscription.limits.ai_limit === null
          ? "null"
          : subscription.limits.ai_limit
      );
      setApplicantviews(
        subscription.limits.applicant_views === null
          ? "null"
          : subscription.limits.applicant_views
      );
      setTotalJobpost(
        subscription.limits.job_posts_per_month === null
          ? "null"
          : subscription.limits.job_posts_per_month
      );

      // ✅ SHOW ONLY
      setViewsType(subscription.limits.views_type ?? "null");

      setContactDetails(String(subscription.limits.show_contact_details));

      // Trial Days - Only for Free plan
      if (subscription.name === "Trial") {
        setTrialDays(
          subscription.limits.trial_days === null
            ? "null"
            : subscription.limits.trial_days
        );
      }
    }
  }, [subscription]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      limits: {
        ai_limit: aiLimits === "null" ? null : Number(aiLimits),
        applicant_views:
          applicantviews === "null" ? null : Number(applicantviews),
        job_posts_per_month:
          totalJobpost === "null" ? null : Number(totalJobpost),

        // 🔥 FIX FOR BOOLEAN
        show_contact_details:
          contactDetails === "true"
            ? true
            : contactDetails === "false"
            ? false
            : null,

        // ✅ VERY IMPORTANT
        views_type: subscription?.limits?.views_type,

        // Trial Days - Only for Free plan
        ...(subscription.name === "Trial" && {
          trial_days: trialDays === "null" ? null : Number(trialDays),
        }),
      },
    };

    await onSave(subscription.id, updatedData);
    onClose();
  };

  return (
    <>
      <div className="subscriptionmodal-overlay">
        <div className="subscriptionmodal-content">
          <h3>Edit Subscription Limits</h3>

          <form onSubmit={handleSubmit}>
            <label>AI Limits</label>
            <input
              value={aiLimits}
              onChange={(e) => setAilimits(e.target.value)}
            />

            <label>Applicant views</label>
            <input
              value={applicantviews}
              onChange={(e) => setApplicantviews(e.target.value)}
            />

            <label>Total Job post</label>
            <input
              value={totalJobpost}
              onChange={(e) => setTotalJobpost(e.target.value)}
            />

            <label>Contact Details</label>
            <input
              value={contactDetails}
              onChange={(e) => setContactDetails(e.target.value)}
            />

            <label>View Type</label>
            <input
              value={viewsType}
              disabled
              style={{
                backgroundColor: "#f2f2f2",
                cursor: "not-allowed",
              }}
            />

            {subscription.name === "Trial" && (
              <>
                <label>Trial Days</label>
                <input
                  value={trialDays}
                  onChange={(e) => setTrialDays(e.target.value)}
                />
              </>
            )}

            <div className="subscriptionmodal-actions">
              <button
                type="button"
                onClick={onClose}
                className="subscriptionmodal-cancel-btn"
              >
                Cancel
              </button>
              <button type="submit" className="subscriptionmodal-save-btn">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SubScriptionLimitModel;
