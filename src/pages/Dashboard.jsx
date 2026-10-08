import React, { useState, useEffect, useContext } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { FaUserCircle, FaSchool, FaAndroid, FaApple } from "react-icons/fa";
import { HiMiniBriefcase } from "react-icons/hi2";

import { MdPeopleAlt } from "react-icons/md";
import { IoIosPeople } from "react-icons/io";
import { TbCoinRupeeFilled, TbCircleDashedNumber0 } from "react-icons/tb";
import { LuIndianRupee } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

import { DashboardLoader } from "../Loader/Loader";
import { SeekerProfileContext } from "../UseContexts/SeekerUseContext/SeekerProfileContent.jsx";
import { RecruiterProfileContext } from "../UseContexts/RecruiterUseContext/RecruiterProfileContext/RecruiterProfileContext.jsx";
import { useDashboardGraph } from "../UseContexts/GeneralUseContext/DashBoardContext/DashboardGraphContext.jsx";
import { useDashboardMetrics } from "../UseContexts/GeneralUseContext/DashBoardContext/DashboardMetricDataContext.jsx";

const Dashboard = () => {
  const navigate = useNavigate();

  // ---- ALL HOOKS MUST BE AT TOP ---- //
  const { seekers, loading: seekerLoading } = useContext(SeekerProfileContext);
  const { recruiters, loading: recruiterLoading } = useContext(
    RecruiterProfileContext
  );

  const {
    graphData,
    selectedYear,
    maxScale,
    loading: graphLoading,
    hasData,
    fetchGraphData,
    setSelectedYear,
  } = useDashboardGraph();

  const { metrics, loadingMetrics, errorMetrics } = useDashboardMetrics();

  // small loader delay for UI
  const [loadingUI, setLoadingUI] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoadingUI(false), 400);
    return () => clearTimeout(timer);
  }, []);

  // ---- COMBINED LOADING ---- //
  if (
    loadingUI ||
    seekerLoading ||
    recruiterLoading ||
    graphLoading ||
    loadingMetrics
  ) {
    return <DashboardLoader />;
  }

  // ---- ERROR STATE ---- //
  if (errorMetrics) {
    return <p>Error loading dashboard metrics: {errorMetrics}</p>;
  }

  // ---- UI ---- //
  return (
    <div className="dashboard-container">
      {/* --- TOP ROW CARDS --- */}
      <div className="top-row">
        <div className="small-cards">
          {/* Total Seekers */}
          <div className="card">
            <div className="card-body">
              <div className="card-icon">
                <IoIosPeople />
              </div>
              <div className="font-num">
                <h4>Total Seeker</h4>
                <p>
                  <span className="amount">{metrics?.total_users ?? 0}</span>
                </p>
              </div>
            </div>
            <div className="card-footer">
              <button onClick={() => navigate("/dashboard/seeker-profile")}>
                View More
              </button>
            </div>
          </div>

          {/* Total Recruiters */}
          <div className="card">
            <div className="card-body">
              <div className="card-icon">
                <HiMiniBriefcase />
              </div>
              <div className="font-num">
                <h4>Total Recruiter</h4>
                <p>
                  <span className="amount">
                    {metrics?.total_recruiters ?? 0}
                  </span>
                </p>
              </div>
            </div>
            <div className="card-footer">
              <button onClick={() => navigate("/dashboard/recruiter-profile")}>
                View More
              </button>
            </div>
          </div>

          {/* Subscribed Users */}
          {/* <div className="card-2">
            <div className="card-body2">
              <div className="card-icon2">
                <MdPeopleAlt />
              </div>
              <div className="font-num2">
                <h4>Subscribed Users</h4>
                <p>
                  <span className="amount2">
                    {metrics?.subscribed_recruiters ?? 0}
                  </span>
                </p>
              </div>
            </div>
            <div className="card-footer">
              <button onClick={() => navigate("/dashboard/seeker-profile")}>
                View More
              </button>
            </div>
          </div> */}

          <div className="card">
            <div className="card-body">
              <div className="card-icon">
                <MdPeopleAlt />
              </div>
              <div className="font-num">
                <h4>Subscribed Users</h4>
                <p>
                  <span className="amount">
                    {metrics?.subscribed_recruiters ?? 0}
                  </span>
                </p>
              </div>
            </div>
            <div className="card-footer">
              <button
                onClick={() => navigate("/dashboard/subscribed-recruiter")}
              >
                View More
              </button>
            </div>
          </div>

          {/* Total Revenue */}
          <div className="card-2">
            <div className="card-body2">
              <div className="card-icon2">
                <TbCoinRupeeFilled />
              </div>
              <div className="font-num2">
                <h4>Total Revenue</h4>
                <p className="currency-wrap">
                  <span className="currency2">
                    <LuIndianRupee />
                  </span>
                  <span className="amount2">
                    {metrics?.total_revenue ?? "0.00"}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Seeker New Users */}
          <div className="card-2 seeker-users">
            <div className="card-body2">
              <div className="card-icon2">
                <TbCircleDashedNumber0 />
              </div>
              <div className="font-num2 ">
                <h4>Seeker New Users</h4>
                <p>
                  <span className="amount2">
                    {metrics?.new_seeker_count ?? "0"}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Seeker OLD Users */}
          <div className="card-2 seeker-users">
            <div className="card-body2">
              <div className="card-icon2">
                <TbCircleDashedNumber0 />
              </div>
              <div className="font-num2">
                <h4>Seeker Old Users</h4>
                <p>
                  <span className="amount2">
                    {metrics?.old_seeker_count ?? "0"}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Android Seeker Devices */}
          {/* <div className="card-2 seeker-users">
            <div className="card-body2">
              <div className="card-icon2">
                <FaAndroid />
              </div>
              <div className="font-num2">
                <h4>Seeker Android Users</h4>
                <p>
                  <span className="amount2">
                    {metrics?.seeker_android_device_count ?? "0"}
                  </span>
                </p>
              </div>
            </div>
          </div> */}

          {/* iOS Seeker Devices */}
          {/* <div className="card-2 seeker-users">
            <div className="card-body2">
              <div className="card-icon2">
                <FaApple />
              </div>
              <div className="font-num2">
                <h4>Seeker iOS Users</h4>
                <p>
                  <span className="amount2">
                    {metrics?.seeker_ios_device_count ?? "0"}
                  </span>
                </p>
              </div>
            </div>
          </div> */}

          {/* Recruiter New Users */}
          <div className="card-2">
            <div className="card-body2">
              <div className="card-icon2">
                <TbCircleDashedNumber0 />
              </div>
              <div className="font-num2">
                <h4>Recruiter New Users</h4>
                <p>
                  <span className="amount2">
                    {metrics?.new_recruiter_count ?? "0"}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Recruiter Old Users */}
          <div className="card-2">
            <div className="card-body2">
              <div className="card-icon2">
                <TbCircleDashedNumber0 />
              </div>
              <div className="font-num2">
                <h4>Recruiter Old Users</h4>
                <p>
                  <span className="amount2">
                    {metrics?.old_recruiter_count ?? "0"}
                  </span>
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* --- GRAPH SECTION --- */}
        <div className="graph-column">
        <div className="graph-box">
          <h3>User Active - {selectedYear}</h3>

          {!hasData ? (
            <div className="no-data-overlay">
              <p>No data available for {selectedYear}</p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={graphData}
                margin={{ top: 10, right: 10, left: 0, bottom: 5 }}
                barSize={8}
              >
                <CartesianGrid
                  stroke="#ccc"
                  strokeDasharray="3 3"
                  vertical={false}
                  opacity={0.3}
                />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 12, fill: "#6666668b" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: "#6666668b" }}
                  domain={[0, maxScale]}
                  tickCount={8}
                  axisLine={false}
                  tickLine={false}
                  allowDecimals={false}
                />
                <Tooltip contentStyle={{ fontSize: "13px" }} />
                <Legend
                  iconType="circle"
                  iconSize={6}
                  wrapperStyle={{ fontSize: "12px", color: "#666" }}
                  formatter={(value) => (
                    <span style={{ color: "#666" }}>{value}</span>
                  )}
                />
                <Bar
                  dataKey="recruiter"
                  fill="#e5671eff"
                  radius={[20, 20, 20, 20]}
                />
                <Bar
                  dataKey="seeker"
                  fill="#3dca5eff"
                  radius={[20, 20, 20, 20]}
                />
                <Bar
                  dataKey="mismatch_count"
                  name="Mismatch Count"
                  fill="#7c8c9d"
                  radius={[20, 20, 20, 20]}
                />
              </BarChart>
            </ResponsiveContainer>
          )}

          {/* --- Year Selector --- */}
          <div className="year-selector">
            {(() => {
              const currentYear = new Date().getFullYear();
              const minYear = 2024;
              return (
                <>
                  <button
                    className={`year-nav-btn prev ${selectedYear > minYear ? "enabled" : ""}`}
                    onClick={() => {
                      const newYear = selectedYear - 1;
                      if (newYear >= minYear) {
                        setSelectedYear(newYear);
                        fetchGraphData(newYear);
                      }
                    }}
                    disabled={selectedYear <= minYear}
                  >
                    ← {selectedYear - 1}
                  </button>

                  <span className="year-current">{selectedYear}</span>

                  <button
                    className={`year-nav-btn next ${selectedYear < currentYear ? "enabled" : ""}`}
                    onClick={() => {
                      const newYear = selectedYear + 1;
                      if (newYear <= currentYear) {
                        setSelectedYear(newYear);
                        fetchGraphData(newYear);
                      }
                    }}
                    disabled={selectedYear >= currentYear}
                  >
                    {selectedYear + 1} →
                  </button>
                </>
              );
            })()}
          </div>
        </div>

        {/* --- Recruiter Device Cards --- */}
        {/* <div className="graph-extra-cards">
          <div className="card-2">
            <div className="card-body2">
              <div className="card-icon2">
                <FaAndroid />
              </div>
              <div className="font-num2">
                <h4>Recruiter Android Users</h4>
                <p>
                  <span className="amount2">
                    {metrics?.recruiter_android_device_count ?? "0"}
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div className="card-2">
            <div className="card-body2">
              <div className="card-icon2">
                <FaApple />
              </div>
              <div className="font-num2">
                <h4>Recruiter iOS Users</h4>
                <p>
                  <span className="amount2">
                    {metrics?.recruiter_ios_device_count ?? "0"}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div> */}
        </div>
      </div>

      {/* --- Recruiters + Seekers Section --- */}
      <div className="rec-seek">
        {/* --- Recruiters Table --- */}
        <div className="dashboard-section">
          <div className="title-button2 flex justify-between">
            <h2>All Recruiter List</h2>
            <div className="card-footer2">
              <button onClick={() => navigate("/dashboard/recruiter-profile")}>
                View More
              </button>
            </div>
          </div>

          <div className="table-container">
            <table className="recruiter-table">
              <thead>
                <tr>
                  <th>School</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Pincode</th>
                  <th>Membership</th>
                </tr>
              </thead>
              <tbody>
                {recruiters.slice(0, 5).map((rec) => (
                  <tr
                    key={rec.id}
                    className="recruiterprofile-row"
                    onClick={() =>
                      navigate(`/dashboard/recruiter-profile/${rec.id}`)
                    }
                  >
                    <td>
                      <div className="recruiter-school-cell">
                        {rec.schoolImage ? (
                          <img
                            src={rec.schoolImage}
                            alt={rec.schoolName}
                            className="school-logo"
                          />
                        ) : (
                          <FaSchool className="school-logo" />
                        )}

                        <div className="recruiter-school-info">
                          <div className="school-name">{rec.schoolName}</div>
                          <div className="user-type">{rec.userType}</div>
                          <div className="login-date">{rec.loginDate}</div>
                          <div className="login-time">{rec.loginTime}</div>
                        </div>
                      </div>
                    </td>
                    <td>{rec.schoolEmail}</td>
                    <td>{rec.phoneNumber}</td>
                    <td>{rec.jobPosts?.[0]?.pincode?.pincode || "N/A"}</td>
                    <td>
                      {rec.current_plan?.plan_name ? (
                        <span
                          className={`membership plan-${rec.current_plan.plan_name
                            .toLowerCase()
                            .replace(/\s+/g, "-")}`}
                        >
                          {rec.current_plan.plan_name}
                        </span>
                      ) : (
                        <span className="membership plan-na">N/A</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* --- Seekers Table --- */}
        <div className="dashboard-section">
          <div className="title-button2 flex justify-between">
            <h2>All Seeker List</h2>
            <div className="card-footer2">
              <button onClick={() => navigate("/dashboard/seeker-profile")}>
                View More
              </button>
            </div>
          </div>

          <div className="table-container">
            <table className="recruiter-table">
              <thead>
                <tr>
                  <th>User Name</th>
                  <th>Specialization</th>
                  <th>Mail ID</th>
                  <th>Phone</th>
                  <th>Pincode</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {seekers.slice(0, 5).map((seeker) => (
                  <tr
                    key={seeker.id}
                    className="seekerprofile-row"
                    onClick={() =>
                      navigate(`/dashboard/seeker-profile/${seeker.id}`)
                    }
                  >
                    <td>
                      <div className="seeker-user-cell">
                        {/* Avatar */}
                        {seeker.profile_img ? (
                          <img
                            src={seeker.profile_img}
                            alt={seeker.name}
                            className="seekerprofile-avatar"
                          />
                        ) : (
                          <FaUserCircle className="seekerprofile-avatar-icon" />
                        )}

                        {/* Text Info */}
                        <div className="seeker-user-info">
                          <div className="seeker-name">{seeker.name}</div>

                          <span className="user-type">{seeker.user_type}</span>
                          <span className="login-date">
                            {seeker.login_date}
                          </span>
                          <span className="login-time">
                            {seeker.login_time}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td>{seeker.specialization || "N/A"}</td>
                    <td>{seeker.email || "N/A"}</td>
                    <td>{seeker.phone || "N/A"}</td>
                    <td>{seeker.pincode || "N/A"}</td>
                    <td>
                      {seeker.status === "open_to_work" ||
                      seeker.status === "active" ? (
                        <span className="status seeking">Open to Work</span>
                      ) : (
                        <span className="status not-seeking">
                          Not Actively Seeking
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
