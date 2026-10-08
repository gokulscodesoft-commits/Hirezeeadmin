import "./GeneralInformation.css";
import { FaUserCircle } from "react-icons/fa";
import { IoChevronBackOutline } from "react-icons/io5";
import { FaFilePdf } from "react-icons/fa6";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useContext } from "react";
import { GeneralInformationContext } from "../UseContexts/SeekerUseContext/GeneralInformationContext";
import { SeekerProfileContext } from "../UseContexts/SeekerUseContext/SeekerProfileContent";

export default function GeneralInformation() {
  const navigate = useNavigate();
  const location = useLocation();

  const { id } = useParams(); // ✅ dynamic user id from URL
  const { users } = useContext(GeneralInformationContext);

  const { seekers, loading, toggleBlockSeeker, toggleAadhaarVerified } =
    useContext(SeekerProfileContext);

  // 🔑 find the right profile based on dynamic id
  // const profile = users.find((u) => u.id === parseInt(id));

  const profile = seekers.find((s) => s.id === parseInt(id));

  if (!profile) return <p className="loading-text">Profile not found!</p>;

  const handleBack = () => {
    if (location.state?.from) {
      navigate(location.state.from);
    } else {
      navigate("/dashboard/seeker-profile");
    }
  };

  if (loading) return <p className="loading-text">Loading...</p>;

  return (
    <div className="generalinfo-container">
      {/* Header */}
      <div className="generalinfo-header">
        <h2 onClick={handleBack} className="generalinfo-back">
          <IoChevronBackOutline className="back-icon" />
          <span>General Information</span>
        </h2>
        <button
          className="block-btn"
          onClick={() => toggleBlockSeeker(profile.id, profile.status)}
        >
          {profile.status?.toLowerCase() === "blocked"
            ? "Unblock User"
            : "Block User"}
        </button>

        {/* {seekers.map((profile) => (
          <button
            className="block-btn"
            onClick={() => toggleBlockSeeker(profile.id, profile.status)}
          >
            {profile.status?.toLowerCase() === "blocked"
              ? "Unblock User"
              : "Block User"}
          </button>
        ))} */}
      </div>

      {/* Profile Icon */}
      <div className="generalinfo-icon">
        {profile.profile_img ? (
          <img
            src={profile.profile_img}
            alt={`${profile.user}'s profile`}
            className="profile-img"
          />
        ) : (
          <FaUserCircle className="profile-icon" />
        )}
      </div>

      {/* Form */}
      <form className="generalinfo-form">
        <div className="generalinfo-row">
          <div className="generalinfo-field">
            <label>Name</label>
            <input type="text" value={profile.name} readOnly />
          </div>
          <div className="generalinfo-field">
            <label>Specialization</label>
            <input type="text" value={profile.specialization} readOnly />
          </div>
        </div>

        <div className="generalinfo-row">
          <div className="generalinfo-field">
            <label>Email ID</label>
            <input type="email" value={profile.email} readOnly />
          </div>
          <div className="generalinfo-field">
            <label>Phone Number</label>
            <input type="text" value={profile.phone} readOnly />
          </div>
        </div>

        <div className="generalinfo-row">
          <div className="generalinfo-field aadhaar-field">
            <label>Aadhaar Number</label>
            <div className="aadhaar-control">
              <input type="text" value={profile.aadhaarNumber || ""} readOnly />
              <button
                type="button"
                className={`aadhaar-verify-btn ${
                  profile.aadhaarVerified ? "verified" : "unverified"
                }`}
                onClick={() =>
                  toggleAadhaarVerified(profile.id, profile.aadhaarVerified)
                }
              >
                {profile.aadhaarVerified ? "Verified" : "Unverified"}
              </button>
            </div>
          </div>
        </div>

        <div className="generalinfo-row">
          <div className="generalinfo-field">
            <label>Highest Qualification (UG/PG)</label>
            <input type="text" value={profile.highestQualification} readOnly />
          </div>
          <div className="generalinfo-field">
            <label>Teaching Qualification</label>
            <input type="text" value={profile.teachingQualification} readOnly />
          </div>
        </div>

        {/* Address */}
        <div className="generalinfo-row">
          <div className="generalinfo-field">
            <label>State</label>
            <input type="text" value={profile.state || ""} readOnly />
          </div>
          <div className="generalinfo-field">
            <label>District</label>
            <input type="text" value={profile.area || ""} readOnly />
          </div>

          <div className="generalinfo-field">
            <label>Taluk</label>
            <input type="text" value={profile.city || ""} readOnly />
          </div>
        </div>

        {/* Resume */}
        <div className="generalinfo-row-resume">
          <div className="generalinfo-field-resume">
            <label>Resume</label>
            {profile.resume ? (
              <a
                href={profile.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="resume-link"
              >
                <FaFilePdf className="pdf-icon" />
                <div className="resume-info">
                  <span className="resume-text">{profile.user}_resume.pdf</span>
                  <span className="resume-size">500 KB</span>
                </div>
              </a>
            ) : (
              <p className="resume-missing">No resume uploaded</p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
