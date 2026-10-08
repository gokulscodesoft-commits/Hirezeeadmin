import React, { useContext } from "react";
import "./RecruiterReportAbuse.css";
import { SeekerAbuseContext } from "../UseContexts/SeekerAbuseContext/SeekerReportAnuseContext";

const SeekerReportAbuse = () => {
  const { abuseReports, loading, deleteAbuseReport } =
    useContext(SeekerAbuseContext);

  if (loading) {
    return <div className="abuse-loading">Loading abuse reports...</div>;
  }
  return (
    <>
      <div className="abuse-container">
        <h2 className="title">Seeker Abuse Reports</h2>

        <div className="card-grid">
          {abuseReports.map((item) => (
            <div className="abuse-card" key={item.report_id}>
              <div className="seeker-section">
                <img
                  src={item.school_image}
                  alt="profile"
                  className="profile-img"
                />
                <div>
                  <h3 className="abused-name">{item.school_name}</h3>
                  {/* <p className="abused-email">{item.user_email}</p>
                  <p className="abused-number">{item.user_phone}</p> */}
                </div>
              </div>

              <hr />

              <div className="recruiter-section">
                <h4 className="recruiter-report">Reported By Seeker</h4>
                <p>Seeker Phone: {item.user_phone}</p>
                <p>Seeker Name: {item.user_name}</p>
                <p>Seeker Email: {item.user_email}</p>
              </div>

              <div className="message-section">
                <h4>Abuse Message</h4>
                <p>{item.message}</p>
              </div>

              <div className="card-footer">
                {/* <span className="date">{item.created_at}</span> */}
                <span className="date">
                  {new Date(item.created_at).toLocaleDateString("en-GB")}
                </span>

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

export default SeekerReportAbuse;
