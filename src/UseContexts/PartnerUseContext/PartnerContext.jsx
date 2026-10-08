import React, { createContext, useState, useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const PartnerContext = createContext();

export const PartnerProvider = ({ children }) => {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    total: 0,
    limit: 10,
    offset: 0,
    pages: 0,
    current_page: 1,
  });
  const [filters, setFilters] = useState({
    search: "",
    state: "",
    sort: "created_at",
    order: "DESC",
  });

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // Fetch all partners with filters
  const fetchPartners = useCallback(
    async (page = 1, filterParams = {}) => {
      try {
        setLoading(true);
        const limit = 10;
        const offset = (page - 1) * limit;

        // Build params, only include non-empty filter values
        const paramObj = {
          limit,
          offset,
        };

        if (filterParams.search) paramObj.search = filterParams.search;
        if (filterParams.state) paramObj.state = filterParams.state;
        if (filterParams.sort) paramObj.sort = filterParams.sort;
        if (filterParams.order) paramObj.order = filterParams.order;

        const params = new URLSearchParams(paramObj);

        const response = await axios.get(
          `${API_BASE_URL}/api/admin-partners?${params.toString()}`
        );

        if (response.data.status === "Success") {
          setPartners(response.data.result.partners || []);
          setPagination({
            total: response.data.result.pagination.total,
            limit: response.data.result.pagination.limit,
            offset: response.data.result.pagination.offset,
            pages: response.data.result.pagination.total_pages,
            current_page: page,
          });
        } else {
          toast.error(response.data.message || "Failed to fetch partners");
        }
      } catch (error) {
        console.error("Error fetching partners:", error);
        toast.error("Failed to load partners");
      } finally {
        setLoading(false);
      }
    },
    [API_BASE_URL]
  );

  // Add new partner
  const addPartner = useCallback(
    async (partnerData) => {
      try {
        setLoading(true);
        const response = await axios.post(
          `${API_BASE_URL}/api/admin-partners`,
          partnerData
        );

        if (response.data.status === "Success") {
          toast.success("Partner added successfully");
          // Refresh the list
          await fetchPartners(1, filters);
          return response.data.result;
        } else {
          toast.error(response.data.message || "Failed to add partner");
          return null;
        }
      } catch (error) {
        console.error("Error adding partner:", error);
        if (error.response?.status === 409) {
          const errorMessage = error.response.data.message || "";
          return { error: errorMessage };
        } else if (error.response?.status === 400) {
          toast.error(error.response.data.message || "Invalid data");
          return null;
        } else {
          toast.error("Failed to add partner");
          return null;
        }
      } finally {
        setLoading(false);
      }
    },
    [API_BASE_URL, filters, fetchPartners]
  );

  // Update partner
  const updatePartner = useCallback(
    async (partnerId, partnerData) => {
      try {
        setLoading(true);
        const response = await axios.put(
          `${API_BASE_URL}/api/admin-partners/${partnerId}`,
          partnerData
        );

        if (response.data.status === "Success") {
          toast.success("Partner updated successfully");
          // Refresh the list
          await fetchPartners(pagination.current_page, filters);
          return response.data.result;
        } else {
          toast.error(response.data.message || "Failed to update partner");
          return null;
        }
      } catch (error) {
        console.error("Error updating partner:", error);
        if (error.response?.status === 409) {
          const errorMessage = error.response.data.message || "";
          return { error: errorMessage };
        } else if (error.response?.status === 400) {
          toast.error(error.response.data.message || "Invalid data");
          return null;
        } else if (error.response?.status === 404) {
          toast.error("Partner not found");
          return null;
        } else {
          toast.error("Failed to update partner");
          return null;
        }
      } finally {
        setLoading(false);
      }
    },
    [API_BASE_URL, pagination.current_page, filters, fetchPartners]
  );

  // Delete partner (soft delete)
  const deletePartner = useCallback(
    async (partnerId) => {
      try {
        setLoading(true);
        const response = await axios.delete(
          `${API_BASE_URL}/api/admin-partners/${partnerId}`
        );

        if (response.data.status === "Success") {
          toast.success("Partner deleted successfully");
          // Refresh the list
          await fetchPartners(pagination.current_page, filters);
          return true;
        } else {
          toast.error(response.data.message || "Failed to delete partner");
          return false;
        }
      } catch (error) {
        console.error("Error deleting partner:", error);
        if (error.response?.status === 404) {
          toast.error("Partner not found");
        } else {
          toast.error("Failed to delete partner");
        }
        return false;
      } finally {
        setLoading(false);
      }
    },
    [API_BASE_URL, pagination.current_page, filters, fetchPartners]
  );

  // Update filters and fetch
  const updateFiltersAndFetch = useCallback(
    async (newFilters) => {
      setFilters((prev) => ({
        ...prev,
        ...newFilters,
      }));
      // Fetch with new filters, reset to page 1
      await fetchPartners(1, {
        ...filters,
        ...newFilters,
      });
    },
    [filters, fetchPartners]
  );

  // Change page
  const changePage = useCallback(
    async (page) => {
      await fetchPartners(page, filters);
    },
    [filters, fetchPartners]
  );

  const value = {
    partners,
    loading,
    pagination,
    filters,
    fetchPartners,
    addPartner,
    updatePartner,
    deletePartner,
    updateFiltersAndFetch,
    changePage,
    setFilters,
  };

  return (
    <PartnerContext.Provider value={value}>{children}</PartnerContext.Provider>
  );
};
