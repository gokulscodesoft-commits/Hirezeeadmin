import React, { useContext } from "react";
import "./RecruiterReportAbuse.css";
import { RecruiterAbuseContext } from "../UseContexts/RecruiterAbuseContext/RecruiterReportAbuseContext";

const RecruiterReportAbuse = () => {
  const { abuseReports, loading, deleteAbuseReport } = useContext(
    RecruiterAbuseContext
  );

  if (loading) {
    return <div className="abuse-loading">Loading abuse reports...</div>;
  }

  return (
    <>
      <div className="abuse-container">
        <h2 className="title">Recruiter Abuse Reports</h2>

        <div className="card-grid">
          {abuseReports.map((item) => (
            <div className="abuse-card" key={item.report_id}>
              <div className="seeker-section">
                <img
                  src={item.user_profile_img}
                  alt="profile"
                  className="profile-img"
                />

                <div>
                  <h3 className="abused-name">{item.user_name}</h3>
                  <p className="abused-email">{item.user_email}</p>
                  <p className="abused-number">{item.user_phone}</p>
                </div>
              </div>

              <hr />

              <div className="recruiter-section">
                <h4 className="recruiter-report">Reported By Recruiter</h4>
                <p>School Phone: {item.recruiter_phone}</p>
                <p>School Name: {item.school_name}</p>
              </div>

              <div className="message-section">
                <h4>Abuse Message</h4>
                <p>{item.message}</p>
              </div>

              <div className="card-footer">
                <span className="date">{item.created_at}</span>

                <button
                  className="delete-btn"
                  onClick={() => deleteAbuseReport(item.report_id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default RecruiterReportAbuse;
