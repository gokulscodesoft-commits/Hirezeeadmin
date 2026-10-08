import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const RecruiterAbuseContext = createContext();
const RecruiterReportAbuseContext = ({ children }) => {
  const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/admin-view-abuse`;

  const [abuseReports, setAbuseReports] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Get Abuse Reports
  const fetchAbuseReports = async () => {
    try {
      setLoading(true);

      const res = await axios.get(API_URL);
      setAbuseReports(res.data.data || []);
    } catch (error) {
      console.error("Fetch Abuse Reports Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete Abuse Report
  const deleteAbuseReport = async (report_id) => {
    try {
      await axios.delete(`${API_URL}/${report_id}`);

      // Remove deleted report from UI
      setAbuseReports((prev) =>
        prev.filter((item) => item.report_id !== report_id)
      );
    } catch (error) {
      console.error("Delete Abuse Report Error:", error);
    }
  };

  // Auto load when context mounts
  useEffect(() => {
    fetchAbuseReports();
  }, []);

  return (
    <>
      <RecruiterAbuseContext.Provider
        value={{
          abuseReports,
          loading,
          fetchAbuseReports,
          deleteAbuseReport,
        }}
      >
        {children}
      </RecruiterAbuseContext.Provider>
    </>
  );
};

export default RecruiterReportAbuseContext;
