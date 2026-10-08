import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const JobRoleContext = createContext();

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/admin-job-roles`;

const JobRoleProvider = ({ children }) => {
  const [jobRoles, setJobRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch job roles (GET)
  const fetchJobRoles = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      setJobRoles(
        (res.data?.data || []).sort((a, b) => a.order_number - b.order_number)
      );
    } catch (err) {
      setError(err.message || "Failed to fetch job roles");
      toast.error("Failed to fetch job roles");
    } finally {
      setLoading(false);
    }
  };

  // Add new job role (POST)
  const addJobRole = async (newJobRole) => {
    try {
      await axios.post(API_URL, newJobRole);
      await fetchJobRoles();
      toast.success("Job role added successfully");
    } catch (err) {
      console.error("Failed to add job role:", err.response?.data || err.message);
      toast.error("Failed to add job role");
      throw err;
    }
  };

  // Update job role (PUT)
  const updateJobRole = async (id, updatedData) => {
    try {
      await axios.put(`${API_URL}/${id}`, updatedData);
      await fetchJobRoles();
      toast.success("Job role updated successfully");
    } catch (err) {
      console.error("Failed to update job role:", err.response?.data || err.message);
      toast.error("Failed to update job role");
      throw err;
    }
  };

  // Reorder job roles
  const reorderJobRoles = async (orderedJobRoles) => {
    try {
      await Promise.all(
        orderedJobRoles.map((role, index) =>
          axios.put(`${API_URL}/${role.id}`, {
            title: role.title,
            order_number: index + 1,
          })
        )
      );
      setJobRoles(orderedJobRoles);
      toast.success("Order updated");
    } catch (err) {
      console.error("Reorder failed:", err);
      toast.error("Reorder failed");
    }
  };

  // Delete job role (DELETE)
  const deleteJobRole = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      await fetchJobRoles();
      toast.success("Job role deleted successfully");
    } catch (err) {
      console.error("Failed to delete job role:", err.response?.data || err.message);
      toast.error("Failed to delete job role");
      throw err;
    }
  };

  useEffect(() => {
    fetchJobRoles();
  }, []);

  return (
    <JobRoleContext.Provider
      value={{
        jobRoles,
        loading,
        error,
        fetchJobRoles,
        addJobRole,
        updateJobRole,
        deleteJobRole,
        reorderJobRoles,
      }}
    >
      {children}
    </JobRoleContext.Provider>
  );
};

export default JobRoleProvider;
