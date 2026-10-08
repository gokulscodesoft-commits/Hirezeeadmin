import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const DashboardMetricContext = createContext();

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/admin-dashboard-metrics-data`;

export const DashboardMetricProvider = ({ children }) => {
  const [metrics, setMetrics] = useState(null);
  const [loadingMetrics, setLoadingMetrics] = useState(true);
  const [errorMetrics, setErrorMetrics] = useState(null);

  const fetchDashboardMetrics = async () => {
    try {
      setLoadingMetrics(true);

      const res = await fetch(API_URL);
      const data = await res.json();

      if (data.status === "Success" && data.data) {
        setMetrics(data.data);
      } else {
        throw new Error("Invalid dashboard response");
      }
    } catch (err) {
      setErrorMetrics(err.message);
      toast.error("Failed to load dashboard metrics");
    } finally {
      setLoadingMetrics(false);
    }
  };

  useEffect(() => {
    fetchDashboardMetrics();
  }, []);

  return (
    <DashboardMetricContext.Provider
      value={{ metrics, loadingMetrics, errorMetrics, fetchDashboardMetrics }}
    >
      {children}
    </DashboardMetricContext.Provider>
  );
};

export const useDashboardMetrics = () => {
  return useContext(DashboardMetricContext);
};

// 🔥 default export is REQUIRED for main.jsx
export default DashboardMetricProvider;
