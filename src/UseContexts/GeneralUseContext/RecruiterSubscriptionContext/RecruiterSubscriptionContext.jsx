import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const RecruiterSubscriptionContext = createContext();

const RECRUITERS_API = `${import.meta.env.VITE_API_BASE_URL}/api/admin-recruiter-full-details`;
const EXTEND_API = `${import.meta.env.VITE_API_BASE_URL}/api/admin/recruiter-extend-subscription`;

const RecruiterSubscriptionProvider = ({ children }) => {
  const [recruiters, setRecruiters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all recruiters with subscription details (GET)
  const fetchRecruiters = async () => {
    try {
      setLoading(true);
      const res = await axios.get(RECRUITERS_API);
      setRecruiters(res.data?.data || []);
      setError(null);
    } catch (err) {
      setError(err.message || "Failed to fetch recruiters");
      toast.error("Failed to fetch recruiters");
    } finally {
      setLoading(false);
    }
  };

  // Extend recruiter subscription (PUT)
  const extendSubscription = async (recruiterId, days) => {
    try {
      const res = await axios.put(`${EXTEND_API}/${recruiterId}`, {
        days: parseInt(days),
      });

      if (res.data?.status === "Success") {
        await fetchRecruiters();
        toast.success(res.data?.message || "Subscription extended successfully");
        return res.data?.data;
      }
    } catch (err) {
      console.error("Failed to extend subscription:", err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Failed to extend subscription");
      throw err;
    }
  };

  useEffect(() => {
    fetchRecruiters();
  }, []);

  return (
    <RecruiterSubscriptionContext.Provider
      value={{
        recruiters,
        loading,
        error,
        fetchRecruiters,
        extendSubscription,
      }}
    >
      {children}
    </RecruiterSubscriptionContext.Provider>
  );
};

export default RecruiterSubscriptionProvider;
