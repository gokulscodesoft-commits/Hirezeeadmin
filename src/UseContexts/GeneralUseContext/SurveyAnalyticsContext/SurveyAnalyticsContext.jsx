import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const SurveyAnalyticsContext = createContext();

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/admin/survey/analytics/detailed`;

const SurveyAnalyticsProvider = ({ children }) => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch detailed survey analytics (GET)
  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      setAnalytics(res.data?.result || null);
      setError(null);
    } catch (err) {
      setError(err.message || "Failed to fetch survey analytics");
      toast.error("Failed to fetch survey analytics");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  return (
    <SurveyAnalyticsContext.Provider
      value={{
        analytics,
        loading,
        error,
        fetchAnalytics,
      }}
    >
      {children}
    </SurveyAnalyticsContext.Provider>
  );
};

export default SurveyAnalyticsProvider;
