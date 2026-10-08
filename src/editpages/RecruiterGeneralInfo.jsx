import "./RecruiterGeneralInfo.css";
import { FaSchool } from "react-icons/fa";
import { IoChevronBackOutline } from "react-icons/io5";
import { MdClose } from "react-icons/md";
import { MdEmail, MdPhone, MdCheckCircle } from "react-icons/md";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useRecruiterJobPosts } from "../UseContexts/RecruiterUseContext/RecruiterProfileContext/RecruiterJobPostsContext.jsx";
import RecruiterProfileLoader from "../Loader/Loader.jsx"; // optional loader
import { useContext, useState } from "react";
import { RecruiterProfileContext } from "../UseContexts/RecruiterUseContext/RecruiterProfileContext/RecruiterProfileContext.jsx";

export default function RecruiterGeneralInfo() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams(); // recruiter_id from URL
  const { recruiters, loading, error } = useRecruiterJobPosts();
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // const { toggleBlockRecruiter, blockRecruitersList } = useContext(
  //   RecruiterProfileContext
  // );
  const {
    toggleBlockRecruiter,
    toggleVerifyRecruiter,
    recruiters: formattedRecruiters,
  } = useContext(RecruiterProfileContext);

  if (loading) return <RecruiterProfileLoader />;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  const recruiter = recruiters.find((r) => r.recruiter_id === Number(id));
  const formattedRecruiter = formattedRecruiters.find(
    (r) => r.id === Number(id)
  );

  // const recruiter = recruiters.find((r) => r.id === Number(id));

  if (!recruiter) return <p>Recruiter not found.</p>;

  const { school_profile, stats, job_posts } = recruiter;

  const handleBack = () => {
    if (location.state?.from) {
      navigate(location.state.from);
    } else {
      navigate("/dashboard/recruiter-profile"); // fallback
    }
  };

  const handleJobClick = (job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const handleStatCardClick = (filterType) => {
    let selectedJobData = null;

    if (filterType === "total_job_posts" && job_posts.length > 0) {
      selectedJobData = job_posts[0];
    } else if (filterType === "open_job_posts") {
      selectedJobData =
        job_posts.find((job) => job.current_status === "Active") ||
        job_posts[0];
    } else if (filterType === "total_applications") {
      selectedJobData =
        job_posts.find((job) => job.applicants_count > 0) || job_posts[0];
    } else if (filterType === "selected_candidates") {
      selectedJobData =
        job_posts.find((job) => job.selected_count > 0) || job_posts[0];
    } else if (filterType === "recommend_invite_ai" && job_posts.length > 0) {
      selectedJobData = job_posts[0];
    }

    if (selectedJobData) {
      setSelectedJob(selectedJobData);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedJob(null);
  };

  return (
    <div className="recruitergeneralinfo-container">
      {/* Header */}
      <div className="recruitergeneralinfo-header">
        <h2 onClick={handleBack} className="recruitergeneralinfo-back">
          <IoChevronBackOutline className="back-icon" />
          <span>Recruiter Information</span>
        </h2>

        <button
          className="block-btn"
          onClick={() =>
            toggleBlockRecruiter(
              formattedRecruiter?.id,
              formattedRecruiter?.status
            )
          }
        >
          {formattedRecruiter?.status === "blocked" ? "Unblock" : "Block"}
        </button>
      </div>

      {/* Profile Icon */}
      <div className="recruitergeneralinfo-icon">
        {school_profile?.school_image ? (
          <img
            src={school_profile.school_image}
            alt={school_profile.school_name}
            className="profile-icon"
            style={{
              width: "90px",
              height: "90px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        ) : (
          <FaSchool className="profile-icon" />
        )}
      </div>

      {/* Form */}
      <form className="recruitergeneralinfo-form">
        <div className="recruitergeneralinfo-row">
          <div className="recruitergeneralinfo-field">
            <label>School Name</label>
            <input
              type="text"
              value={school_profile?.school_name || "N/A"}
              readOnly
            />
          </div>
          <div className="recruitergeneralinfo-field">
            <label>Address</label>
            <input
              type="text"
              value={school_profile?.school_address || "N/A"}
              readOnly
            />
          </div>
        </div>

        <div className="recruitergeneralinfo-row">
          <div className="recruitergeneralinfo-field">
            <label>Email Id</label>
            <input
              type="email"
              value={school_profile?.school_email || "N/A"}
              readOnly
            />
          </div>
          <div className="recruitergeneralinfo-field">
            <label>Number</label>
            <input
              type="text"
              value={
                school_profile?.school_phone_number ||
                recruiter.phone_number ||
                "N/A"
              }
              readOnly
            />
          </div>
        </div>

        <div className="recruitergeneralinfo-row">
          <div className="recruitergeneralinfo-field">
            <label>State</label>
            <input
              type="text"
              value={school_profile?.recruiter_address?.state || "N/A"}
              readOnly
            />
          </div>
          <div className="recruitergeneralinfo-field">
            <label>District</label>
            <input
              type="text"
              value={school_profile?.recruiter_address?.city || "N/A"}
              readOnly
            />
          </div>
          <div className="recruitergeneralinfo-field">
            <label>Taluk</label>
            <input
              type="text"
              value={school_profile?.recruiter_address?.area || "N/A"}
              readOnly
            />
          </div>
        </div>

        <div className="recruitergeneralinfo-row">
          <div className="recruitergeneralinfo-field">
            <label className="recruitergeneralinfo-label-row">
              Udise Number
              {formattedRecruiter?.isAdminVerified &&
                school_profile?.udise_number && (
                  <MdCheckCircle className="recruitergeneralinfo-verified-tick" />
                )}
            </label>
            <input
              type="text"
              value={school_profile?.udise_number || "N/A"}
              readOnly
            />
          </div>
          <div className="recruitergeneralinfo-field">
            <label>Principal / Correspondent / HR Name</label>
            <input
              type="text"
              value={school_profile?.principal_correspondent_hr_name || "N/A"}
              readOnly
            />
          </div>
        </div>

        <div className="recruitergeneralinfo-row">
          <div className="recruitergeneralinfo-field">
            <label className="recruitergeneralinfo-label-row">
              School Affiliation / Recognition Letter
              {formattedRecruiter?.isAdminVerified &&
                school_profile?.school_affiliation_letter && (
                  <MdCheckCircle className="recruitergeneralinfo-verified-tick" />
                )}
            </label>
            {school_profile?.school_affiliation_letter ? (
              <a
                href={school_profile.school_affiliation_letter}
                target="_blank"
                rel="noopener noreferrer"
                className="recruitergeneralinfo-doc-link"
              >
                View Document
              </a>
            ) : (
              <div className="recruitergeneralinfo-doc-link recruitergeneralinfo-doc-link-empty">
                N/A
              </div>
            )}
            <button
              type="button"
              className={
                formattedRecruiter?.isAdminVerified
                  ? "verify-btn recruitergeneralinfo-verify-btn"
                  : "verify-btn verify-btn-unverify recruitergeneralinfo-verify-btn"
              }
              onClick={() =>
                toggleVerifyRecruiter(
                  formattedRecruiter?.id,
                  formattedRecruiter?.isAdminVerified
                )
              }
            >
              {formattedRecruiter?.isAdminVerified ? "Verified" : "Unverified"}
            </button>
          </div>
          <div className="recruitergeneralinfo-field">
            <label className="recruitergeneralinfo-label-row">
              Board Affiliation Certificate
              {formattedRecruiter?.isAdminVerified &&
                school_profile?.board_affiliation_certificate && (
                  <MdCheckCircle className="recruitergeneralinfo-verified-tick" />
                )}
            </label>
            {school_profile?.board_affiliation_certificate ? (
              <a
                href={school_profile.board_affiliation_certificate}
                target="_blank"
                rel="noopener noreferrer"
                className="recruitergeneralinfo-doc-link"
              >
                View Document
              </a>
            ) : (
              <div className="recruitergeneralinfo-doc-link recruitergeneralinfo-doc-link-empty">
                N/A
              </div>
            )}
          </div>
        </div>

        {/* Detail Cards */}
        <div className="detailCard-wrap">
          <div
            className="detail-card"
            onClick={() => handleStatCardClick("total_job_posts")}
            style={{ cursor: "pointer" }}
          >
            <h2>{stats?.total_job_posts || 0}</h2>
            <span>Total</span>
            <span>Job Posts</span>
          </div>

          <div
            className="detail-card"
            onClick={() => handleStatCardClick("open_job_posts")}
            style={{ cursor: "pointer" }}
          >
            <h2>{stats?.open_job_posts || 0}</h2>
            <span>Open</span>
            <span>Job Posts</span>
          </div>

          <div
            className="detail-card"
            onClick={() => handleStatCardClick("total_applications")}
            style={{ cursor: "pointer" }}
          >
            <h2>{stats?.total_applications || 0}</h2>
            <span>Total</span>
            <span>Applicants</span>
          </div>

          <div
            className="detail-card"
            onClick={() => handleStatCardClick("selected_candidates")}
            style={{ cursor: "pointer" }}
          >
            <h2>{stats?.selected_candidates || 0}</h2>
            <span>Selected</span>
            <span>Candidates</span>
          </div>

          <div
            className="detail-card"
            onClick={() => handleStatCardClick("recommend_invite_ai")}
            style={{ cursor: "pointer" }}
          >
            <h2>{job_posts?.length || 0}</h2>
            <span>Recommend</span>
            <span>Invite-AI</span>
          </div>
        </div>
      </form>

      {/* Job Postings Table */}
      <div className="recruiter-jobs-section">
        <h3>Job Postings</h3>
        <div className="recruiter-jobs-table-container">
          <table className="recruiter-jobs-table">
            <thead>
              <tr>
                <th>Job Name</th>
                <th>Subject</th>
                <th>PinCode</th>
                <th>Posted Date</th>
                <th>Applicants</th>
                <th>Selected</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {job_posts && job_posts.length > 0 ? (
                job_posts.map((job) => (
                  <tr
                    key={job.job_post_id}
                    className="recruiter-jobs-row"
                    onClick={() => handleJobClick(job)}
                    style={{ cursor: "pointer" }}
                  >
                    <td>{job.job_role}</td>
                    <td>{job.subject}</td>

                    <td>{job.pincode?.pincode || "N/A"}</td>
                    <td>{job.post_date}</td>
                    <td>{job.applicants_count}</td>
                    <td>{job.selected_count}</td>
                    <td
                      className={`job-status ${
                        job.current_status === "Active"
                          ? "active"
                          : job.current_status === "Closed"
                          ? "closed"
                          : "expired"
                      }`}
                    >
                      {job.current_status}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    style={{ textAlign: "center", color: "#999" }}
                  >
                    No Job Posts Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Job Details Modal */}
      {isModalOpen && selectedJob && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{selectedJob.job_role}</h2>
              <button className="modal-close" onClick={closeModal}>
                <MdClose size={24} />
              </button>
            </div>

            <div className="modal-body">
              <div className="applicants-section">
                <h3>Applied Users ({selectedJob.applicants_count})</h3>
                {selectedJob.applied_users &&
                selectedJob.applied_users.length > 0 ? (
                  <div className="applicants-list">
                    {selectedJob.applied_users.map((applicant) => (
                      <div
                        key={applicant.application_id}
                        className="applicant-card"
                        onClick={() =>
                          navigate(
                            `/dashboard/seeker-profile/${applicant.user_id}`
                          )
                        }
                        style={{ cursor: "pointer" }}
                      >
                        <div className="applicant-profile">
                          {applicant.profile_img ? (
                            <img
                              src={applicant.profile_img}
                              alt={applicant.name}
                              className="applicant-avatar"
                            />
                          ) : (
                            <div className="applicant-avatar-placeholder">
                              {applicant.name.charAt(0).toUpperCase()}
                            </div>
                          )}
                        </div>
                        <div className="applicant-header">
                          <div className="applicant-info">
                            <h4>{applicant.name}</h4>
                            <p className="applicant-email">
                              <MdEmail className="contact-icon" />
                              {applicant.email}
                            </p>
                            <p className="applicant-phone">
                              <MdPhone className="contact-icon" />
                              {applicant.phone}
                            </p>
                            <p className="applied-date">
                              Applied: {applicant.applied_date}
                            </p>
                          </div>
                          <span
                            className={`status-badge ${applicant.status?.toLowerCase()}`}
                          >
                            {applicant.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="no-applicants">No applicants yet</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
