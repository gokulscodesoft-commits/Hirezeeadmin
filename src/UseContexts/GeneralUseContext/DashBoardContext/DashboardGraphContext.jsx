import React, { createContext, useContext, useEffect, useState } from "react";

const DashboardGraphContext = createContext();

export const DashboardGraphProvider = ({ children }) => {
  const [graphData, setGraphData] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [maxScale, setMaxScale] = useState(200);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasData, setHasData] = useState(true);

  // ✅ Fetch dashboard analytics
  const fetchGraphData = async (year = selectedYear) => {
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/admin-dashboard-analytics`);
      const data = await response.json();

      if (data.status === "Success" && Array.isArray(data.data)) {
        // Check if API year matches requested year
        if (data.year !== year) {
          // Backend does not have data for this year → show no data
          setGraphData([]);
          setHasData(false);
          setSelectedYear(year);
          setLoading(false);
          return;
        }

        const formatted = data.data.map((item) => ({
          ...item,
          seeker: Number(item.seeker) || 0,
          recruiter: Number(item.recruiter) || 0,
          mismatch_count: Number(item.mismatch_count) || 0,
        }));

        setGraphData(formatted);
        setMaxScale(data.maxScale || 200);
        setHasData(true);
        setSelectedYear(year);
      } else {
        throw new Error("Invalid data format");
      }
    } catch (err) {
      console.error("Error fetching graph data:", err);
      setError(err.message);
      setHasData(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGraphData();
  }, []);

  return (
    <DashboardGraphContext.Provider
      value={{
        graphData,
        selectedYear,
        maxScale,
        loading,
        error,
        hasData,
        fetchGraphData,
        setSelectedYear,
      }}
    >
      {children}
    </DashboardGraphContext.Provider>
  );
};

export const useDashboardGraph = () => useContext(DashboardGraphContext);
export default DashboardGraphProvider;
