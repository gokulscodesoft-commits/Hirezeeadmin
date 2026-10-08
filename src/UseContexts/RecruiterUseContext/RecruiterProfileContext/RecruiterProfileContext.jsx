import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const RecruiterProfileContext = createContext();

const API_URL = `${
  import.meta.env.VITE_API_BASE_URL
}/api/admin-recruiter-full-details`;

export const RecruiterProfileProvider = ({ children }) => {
  const [recruiters, setRecruiters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [blockedRecruiters, setBlockedRecruiters] = useState([]);

  // ==========================
  // Fetch Recruiter Profiles
  // ==========================
  const fetchRecruiters = async () => {
    try {
      setLoading(true);

      const res = await axios.get(API_URL);
      const data = res.data?.recruiters || [];

      // Only show recruiters who have completed their school profile —
      // phone+OTP-only signups (no school_profile yet) are excluded from this list.
      const completedData = data.filter((item) => item.school_profile);

      const formatted = completedData.map((item) => {
        const plan = item.current_plan?.plan_name || "Trial";

        return {
          id: item.recruiter_id,

          // --- School Details ---
          schoolImage: item.school_profile?.school_image || "",
          schoolName: item.school_profile?.school_name || "N/A",
          schoolEmail: item.school_profile?.school_email || "N/A",
          schoolPhone: item.school_profile?.school_phone_number || "N/A",
          schoolAddress: item.school_profile?.school_address || "N/A",
          schoolPincode: item.school_profile?.school_pincode || null,
          recruiterAddress: item.school_profile?.recruiter_address || null,

          // --- Recruiter Info ---
          phoneNumber: item.phone_number || "N/A",
          isLogin: item.is_login ? "Yes" : "No",
          isDetailsCompleted: item.is_school_details_completed ? "Yes" : "No",
          isAdminVerified: !!item.is_admin_verified,
          signupDate: new Date(item.signup_date).toLocaleDateString(),

          // 🔥 NEW FIELDS
          userType: item.user_type || "",
          loginDate: item.login_date || "",
          loginTime: item.login_time || "",

          // FIXED → backend field name matches UI
          current_plan: item.current_plan || null,
          membership: plan,

          // --- Job Posts ---
          jobPosts: item.job_posts || [],

          // Pincode: school_pincode → recruiter_address → job post pincode
          pincode:
            item.school_profile?.school_pincode ||
            item.school_profile?.recruiter_address?.pincode ||
            item.job_posts?.[0]?.pincode?.pincode ||
            "N/A",

          // --- Stats ---
          totalJobs: item.stats?.total_job_posts || 0,
          openJobs: item.stats?.open_job_posts || 0,
          totalApplications: item.stats?.total_applications || 0,
          selectedCandidates: item.stats?.selected_candidates || 0,
        };
      });

      setRecruiters(formatted);
    } catch (err) {
      console.error("❌ Failed to fetch recruiters:", err);
      toast.error("Failed to load recruiter profiles");
      setRecruiters([]);
    } finally {
      setLoading(false);
    }
  };

  //soft delete

  // soft delete recruiter
  const softdelete = async (id) => {
    try {
      // ✅ Optimistic UI remove (instant delete)
      setRecruiters((prev) => prev.filter((r) => r.id !== id));

      await axios.put(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/api/admin/recruiter-soft-delete/${id}`
      );
    } catch (error) {
      console.error("Delete failed:", error);

      // rollback if API fails
      fetchRecruiters();
    }
  };

  const blockRecruitersList = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin-recruiter-deactivate`
      );

      const data = res.data?.data || [];

      const formatted = data.map((item) => ({
        id: item.recruiter_id,
        status: item.is_deactivated ? "blocked" : "active",
        schoolImage: item.school_image || "",
        schoolName: item.school_name || "N/A",
        schoolEmail: item.school_email || "N/A",
        schoolPhone: item.school_phone_number || "N/A",
      }));

      const unique = [
        ...new Map(formatted.map((item) => [item.id, item])).values(),
      ];

      // 🔥 IMPORTANT
      setBlockedRecruiters(unique.filter((r) => r.status === "blocked"));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const toggleBlockRecruiter = async (id, currentStatus) => {
    try {
      const action = currentStatus === "blocked" ? "unblock" : "block";

      setRecruiters((prev) =>
        prev.map((r) =>
          r.id === id
            ? { ...r, status: action === "block" ? "blocked" : "active" }
            : r
        )
      );

      if (action === "unblock") {
        setBlockedRecruiters((prev) => prev.filter((r) => r.id !== id));
      }

      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin-recruiter-deactivate`,
        {
          recruiter_id: Number(id),
          action,
        }
      );

      toast.success(`Recruiter ${action}ed successfully`);
    } catch (error) {
      console.error(error);
      fetchRecruiters();
      blockRecruitersList();
    }
  };

  // ✅ Verify / unverify recruiter (gates job posting on the backend)
  const toggleVerifyRecruiter = async (id, currentlyVerified) => {
    const nextVerified = !currentlyVerified;

    try {
      setRecruiters((prev) =>
        prev.map((r) =>
          r.id === id ? { ...r, isAdminVerified: nextVerified } : r
        )
      );

      await axios.put(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/api/admin/recruiter-verify/${id}`,
        { is_admin_verified: nextVerified }
      );

      toast.success(
        nextVerified
          ? "Recruiter verified successfully"
          : "Recruiter marked as unverified"
      );
    } catch (error) {
      console.error("Verify toggle failed:", error);
      toast.error("Failed to update verification status");
      fetchRecruiters();
    }
  };

  useEffect(() => {
    fetchRecruiters();
    // blockRecruitersList();
  }, []);

  return (
    <RecruiterProfileContext.Provider
      value={{
        recruiters,
        loading,
        fetchRecruiters,
        softdelete,

        toggleBlockRecruiter,
        blockRecruitersList,
        blockedRecruiters,
        toggleVerifyRecruiter,
      }}
    >
      {children}
    </RecruiterProfileContext.Provider>
  );
};

export default RecruiterProfileProvider;
