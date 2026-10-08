import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { FaFileInvoiceDollar, FaFilter, FaChartLine } from "react-icons/fa";
import { IoPeopleSharp } from "react-icons/io5";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { RiEqualizer2Fill } from "react-icons/ri";
import { HiMiniBriefcase } from "react-icons/hi2";
import { FaUserGraduate } from "react-icons/fa6";
import { SlLogout } from "react-icons/sl";
import { SiRazorpay } from "react-icons/si";

import "./Sidebar.css";

import adminLogo from "../assets/adminlogo.png";

import LogoutModal from "../editpages/LogoutModal";

import { LuFileSliders } from "react-icons/lu";
import { MdPrivacyTip } from "react-icons/md";

import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { TbLockHeart } from "react-icons/tb";
import { RxLink1 } from "react-icons/rx";
import { IoClose, IoMenu } from "react-icons/io5";

function Sidebar({ collapsed, onToggle }) {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);

    try {
      const response = await fetch(
        "https://api.hireezee.co.in/api/admin-logout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // If your backend expects auth headers, include:
            // "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
          },
          body: JSON.stringify({
            email: "talentforceapp@gmail.com",
            password: "Talentapp@2025",
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || "Logged out successfully!");
        localStorage.removeItem("authToken");
        localStorage.removeItem("authTokenIssuedAt");

        setTimeout(() => {
          setShowLogoutModal(false);
          navigate("/");
        }, 1200);
      } else {
        toast.error(data.message || "Logout failed!");
      }
    } catch (error) {
      console.error("Logout Error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <aside className={`sidebar${collapsed ? " collapsed" : ""}`}>
      <nav>
        <button
          type="button"
          className="sidebar-toggle-btn"
          onClick={onToggle}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <IoMenu /> : <IoClose />}
        </button>

        <img src={adminLogo} alt="template Logo" className="sidebar-logo" />

        {/* GENERAL */}
        <div className="sidebar-section">
          <p className="section-title">GENERAL</p>
          <ul>
            <li>
              <NavLink to="/dashboard" end className="nav-link">
                <TbLayoutDashboardFilled className="icon-b" /> Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/subscription-plan" className="nav-link">
                <FaFileInvoiceDollar className="icon" /> Subscription Plans
              </NavLink>
            </li>
            {/*------------- Subscribed Recruiters --------------*/}
            <li>
              <NavLink
                to="/dashboard/subscribed-recruiter"
                className="nav-link"
              >
                <RiMoneyRupeeCircleFill className="icon" /> Subscribed
                Recruiters
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/survey-question" className="nav-link">
                <FaFilter className="icon" /> Survey Questions
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/survey-analytics" className="nav-link">
                <FaChartLine className="icon" /> Survey Analytics
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/referral-statistics" className="nav-link">
                <RxLink1 className="icon" /> Referral Statistics
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/provide-partner" className="nav-link">
                <HiMiniBriefcase className="icon" /> Partner Program
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/partner-referral-statistics" className="nav-link">
                <FaChartLine className="icon" /> Partner Referral Statistics
              </NavLink>
            </li>

            {/* Razorpay Invoice Details  */}
            {/* <li>
              <NavLink
                to="/dashboard/razorpay-invoice-details"
                className="nav-link"
              >
                <SiRazorpay className="icon" /> Invoice Details
              </NavLink>
            </li> */}
          </ul>
        </div>

        {/* SEEKER APP */}
        <div className="sidebar-section">
          <p className="section-title">SEEKER APP</p>
          <ul>
            <li>
              <NavLink to="/dashboard/home-banner" className="nav-link">
                <SiHomeassistantcommunitystore className="icon" /> Home Banner
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/education-filter" className="nav-link">
                <FaUserGraduate className="icon" /> Education
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/seeker-search-filter"
                className="nav-link"
              >
                <FaFilter className="icon" /> Seeker Search Filter
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/seeker-profile" className="nav-link">
                <IoPeopleSharp className="icon" /> Seeker Profile
              </NavLink>
            </li>

            {/*--------------Terms & Condition----------------*/}
            <li>
              <NavLink
                to="/dashboard/seeker-terms-condition"
                className="nav-link"
              >
                <LuFileSliders className="icon" />
                Terms & Condition
              </NavLink>
            </li>

            {/*------------- Privacy & Policy --------------*/}
            <li>
              <NavLink
                to="/dashboard/seeker-privacy-policy"
                className="nav-link"
              >
                <MdPrivacyTip className="icon" />
                Privacy & Policy
              </NavLink>
            </li>

            {/* Seeker Privacy Policy  */}

            <li>
              <NavLink to="/dashboard/seeker-block-list" className="nav-link">
                <TbLockHeart className="icon" />
                Blocked Users
              </NavLink>
            </li>

            {/* Seeker Report Abuse  */}
            <li>
              <NavLink to="/dashboard/seeker-report-abuse" className="nav-link">
                <TbLockHeart className="icon" />
                Report Abuse
              </NavLink>
            </li>
          </ul>
        </div>

        {/* RECRUITER APP */}
        <div className="sidebar-section">
          <p className="section-title">RECRUITER APP</p>
          <ul>
            <li>
              <NavLink to="/dashboard/job-post-filter" className="nav-link">
                <RiEqualizer2Fill className="icon-b" /> Job Post Filter
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/recruiter-profile" className="nav-link">
                <HiMiniBriefcase className="icon" /> Recruiter Profile
              </NavLink>
            </li>

            {/*--------------Terms & Condition----------------*/}
            <li>
              <NavLink
                to="/dashboard/recruiter-terms-condition"
                className="nav-link"
              >
                <LuFileSliders className="icon" /> Terms & Condition
              </NavLink>
            </li>
            {/*------------- Privacy & Policy --------------*/}
            <li>
              <NavLink
                to="/dashboard/recruiter-privacy-policy"
                className="nav-link"
              >
                <MdPrivacyTip className="icon" /> Privacy & Policy
              </NavLink>
            </li>

            {/* Blocked Recruiter List  */}
            <li>
              <NavLink to="/dashboard/blocked-recruiters" className="nav-link">
                <TbLockHeart className="icon" /> Blocked Recruiters
              </NavLink>
            </li>

            {/* Recruiter Report Abuse  */}
            <li>
              <NavLink
                to="/dashboard/recruiter-report-abuse"
                className="nav-link"
              >
                <TbLockHeart className="icon" />
                Report Abuse
              </NavLink>
            </li>
          </ul>
        </div>

        {/* OTHER */}
        <div className="sidebar-section">
          <p className="section-title">OTHER</p>
          <ul>
            <li>
              <button
                onClick={() => setShowLogoutModal(true)}
                className="logout-btn"
                disabled={loading}
              >
                <SlLogout className="icon" />{" "}
                {loading ? "Logging out..." : "Logout"}
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Logout Modal */}
      <LogoutModal
        isOpen={showLogoutModal}
        onConfirm={handleLogout}
        onCancel={() => setShowLogoutModal(false)}
      />
    </aside>
  );
}

export default Sidebar;
