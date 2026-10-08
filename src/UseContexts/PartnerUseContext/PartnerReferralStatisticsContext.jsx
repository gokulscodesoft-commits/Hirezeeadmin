import React, { createContext, useState, useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const PartnerReferralStatisticsContext = createContext();

export const PartnerReferralStatisticsProvider = ({ children }) => {
  const [statistics, setStatistics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    total: 0,
    limit: 10,
    offset: 0,
    current_page: 1,
    total_pages: 0,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [filterState, setFilterState] = useState("");

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // Fetch partner referral statistics
  const fetchStatistics = useCallback(
    async (page = 1, search = "", state = "") => {
      try {
        setLoading(true);
        const limit = 10;
        const offset = (page - 1) * limit;

        const paramObj = {
          limit,
          offset,
        };

        if (search) paramObj.search = search;
        if (state) paramObj.state = state;

        const params = new URLSearchParams(paramObj);

        const response = await axios.get(
          `${API_BASE_URL}/api/admin-partners-referral-statistics?${params.toString()}`
        );

        if (response.data.status === "Success") {
          setStatistics(response.data.result.statistics || []);
          setPagination({
            total: response.data.result.pagination.total,
            limit: response.data.result.pagination.limit,
            offset: response.data.result.pagination.offset,
            current_page: page,
            total_pages: response.data.result.pagination.total_pages,
          });
        } else {
          toast.error(response.data.message || "Failed to fetch statistics");
        }
      } catch (error) {
        console.error("Error fetching statistics:", error);
        toast.error("Failed to load partner statistics");
      } finally {
        setLoading(false);
      }
    },
    [API_BASE_URL]
  );

  // Update search and fetch
  const updateSearchAndFetch = useCallback(
    async (search, state = filterState) => {
      setSearchTerm(search);
      await fetchStatistics(1, search, state);
    },
    [filterState, fetchStatistics]
  );

  // Update state filter and fetch
  const updateStateFilter = useCallback(
    async (state) => {
      setFilterState(state);
      await fetchStatistics(1, searchTerm, state);
    },
    [searchTerm, fetchStatistics]
  );

  // Change page
  const changePage = useCallback(
    async (page) => {
      await fetchStatistics(page, searchTerm, filterState);
    },
    [fetchStatistics, searchTerm, filterState]
  );

  const value = {
    statistics,
    loading,
    pagination,
    searchTerm,
    filterState,
    fetchStatistics,
    updateSearchAndFetch,
    updateStateFilter,
    changePage,
  };

  return (
    <PartnerReferralStatisticsContext.Provider value={value}>
      {children}
    </PartnerReferralStatisticsContext.Provider>
  );
};
