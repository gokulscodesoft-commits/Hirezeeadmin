// src/contexts/SeekerProfileContext.jsx
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const SeekerProfileContext = createContext();

export const SeekerProfileProvider = ({ children }) => {
  const [seekers, setSeekers] = useState([]);
  const [blockedUsers, setBlockedUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSeekers = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin-user-details`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // 🔹 if token required
          },
        }
      );

      const data = await res.json();
      if (data.status === "success") {
        const seekerItems = data.users.map((user) => ({
          id: user.user_id,
          name: user.profile?.name || "",
          phone: user.profile?.phone || "",
          email: user.profile?.email || "",
          aadhaarNumber: user.profile?.aadhaar_number || "",
          aadhaarVerified: Boolean(user.profile?.aadhaar_verified),
          pincode: user.address?.pincode || "",
          state: user.address?.state || "",
          area: user.address?.area || "",
          //taluk
          city: user.address?.city || "",
          specialization: user.course?.specialization || "",
          status: user.status?.[0] || "",
          profile_img: user.profile?.profile_img || "",

          highestQualification: user.course?.highest_qualification_level || "",

          teachingQualification: user.course?.teaching_qualification || "",

          resume: user.profile?.resume_path || "",
          // 🔥 ADD THESE
          user_type: user.user_type || "",
          login_date: user.login_date || "",
          login_time: user.login_time || "",

          fullProfile: user, // keep full profile for later use
        }));

        setSeekers(seekerItems);
      }
    } catch (err) {
      console.error("Error fetching seekers:", err);
    } finally {
      setLoading(false);
    }
  };

  // Add Seeker (example)
  const addSeeker = (newSeeker) => {
    setSeekers((prev) => [...prev, newSeeker]);
  };

  // Edit Seeker (example)
  const editSeeker = (id, updatedData) => {
    setSeekers((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...updatedData } : s))
    );
  };

  // Get seeker by id (for GeneralInformation)
  const getSeekerById = (id) => {
    return seekers.find((s) => s.id === parseInt(id));
  };

  const softdelete = async (id) => {
    try {
      // Immediate UI update
      setSeekers((prev) => prev.filter((s) => s.id !== id));

      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin/delete-user/${id}`
      );
    } catch (error) {
      console.error("Delete failed:", error);
      fetchSeekers(); // rollback
    }
  };

  const toggleAadhaarVerified = async (id, currentStatus) => {
    const aadhaar_verified = !currentStatus;

    try {
      setSeekers((prev) =>
        prev.map((s) =>
          s.id === id ? { ...s, aadhaarVerified: aadhaar_verified } : s
        )
      );

      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin/seeker-aadhaar-verify/${id}`,
        { aadhaar_verified }
      );

      toast.success(
        aadhaar_verified
          ? "Aadhaar verified successfully"
          : "Aadhaar marked as unverified"
      );
    } catch (error) {
      console.error("Aadhaar verify update failed:", error);
      toast.error("Failed to update Aadhaar verification status");
      fetchSeekers();
    }
  };

  // const toggleBlockSeeker = async (id, currentStatus) => {
  //   try {
  //     const action = currentStatus === "blocked" ? "unblock" : "block";

  //     // 🔥 Instant UI update
  //     setSeekers((prev) =>
  //       prev.map((s) =>
  //         s.id === id
  //           ? { ...s, status: action === "block" ? "blocked" : "active" }
  //           : s
  //       )
  //     );

  //     await axios.post(
  //       `${import.meta.env.VITE_API_BASE_URL}/api/admin-seeker-deactivate`,
  //       {
  //         user_id: id,
  //         action,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //       }
  //     );
  //   } catch (error) {
  //     console.error("Block/unblock failed:", error);
  //     fetchSeekers(); // rollback if failed
  //   }
  // };

  // Block users list

  const toggleBlockSeeker = async (id, currentStatus) => {
    try {
      const action = currentStatus === "blocked" ? "unblock" : "block";

      // ✔ Update seekers list
      setSeekers((prev) =>
        prev.map((s) =>
          s.id === id
            ? { ...s, status: action === "block" ? "blocked" : "active" }
            : s
        )
      );

      // ⭐ Remove from blocked list instantly if unblocking
      if (action === "unblock") {
        setBlockedUsers((prev) => prev.filter((user) => user.id !== id));
      }

      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin-seeker-deactivate`,
        {
          user_id: id,
          action,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    } catch (error) {
      console.error("Block/unblock failed:", error);
      fetchSeekers();
      blockusersList();
    }
  };

  const blockusersList = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin-seeker-deactivate`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (res.data.status === "Success") {
        const blockedList = res.data.data.map((user) => ({
          id: user.user_id,
          name: user.name,
          phone: user.phone,
          email: user.email,
          profile_img: user.profile_img,
          status: user.is_deactivated === 1 ? "blocked" : "active",
          blocked_at: user.deactivate_at,
        }));

        setBlockedUsers(blockedList);
      }
    } catch (error) {
      console.error("Blocked users fetch error:", error);
    }
  };

  useEffect(() => {
    fetchSeekers();
    blockusersList();
  }, []);

  return (
    <SeekerProfileContext.Provider
      value={{
        seekers,
        loading,
        fetchSeekers,
        addSeeker,
        editSeeker,
        getSeekerById,
        softdelete,
        toggleAadhaarVerified,

        toggleBlockSeeker,
        blockedUsers,
        blockusersList,
      }}
    >
      {children}
    </SeekerProfileContext.Provider>
  );
};

export default SeekerProfileProvider;
