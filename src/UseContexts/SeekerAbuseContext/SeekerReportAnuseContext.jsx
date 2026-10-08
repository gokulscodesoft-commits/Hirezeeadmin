import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const SeekerAbuseContext = createContext();

const SeekerReportAnuseContext = ({ children }) => {
  const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/admin-view-details`;

  const [abuseReports, setAbuseReports] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAbuseReports = async () => {
    try {
      setLoading(true);

      const res = await axios.get(API_URL);
      setAbuseReports(res.data.formattedData || []);
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
      <SeekerAbuseContext.Provider
        value={{
          abuseReports,
          loading,
          fetchAbuseReports,
          deleteAbuseReport,
        }}
      >
        {children}
      </SeekerAbuseContext.Provider>
    </>
  );
};

export default SeekerReportAnuseContext;
