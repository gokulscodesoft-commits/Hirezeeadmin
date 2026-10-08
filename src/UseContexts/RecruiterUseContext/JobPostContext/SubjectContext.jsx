// src/UseContexts/JobPostUseContext/SubjectContext.jsx
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const SubjectContext = createContext();

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/job-categories`;
const API_URL_2 = `${import.meta.env.VITE_API_BASE_URL}/api`;

const SubjectProvider = ({ children }) => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Fetch subjects (GET)
  const fetchSubjects = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);

      // Since API returns an array directly, just set it
      // setSubjects(res.data?.result || []);
      setSubjects(
        (res.data?.result || []).sort((a, b) => a.order_index - b.order_index)
      );
    } catch (err) {
      setError(err.message || "Failed to fetch subjects");
      toast.error("Failed to fetch subjects");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Add new subject (POST) — unscoped, used by Job Post Subject filter
  const addSubject = async (newSubject) => {
    try {
      await axios.post(API_URL, newSubject);
      await fetchSubjects();
      toast.success("Subject added successfully");
    } catch (err) {
      console.error(
        "Failed to add subject:",
        err.response?.data || err.message
      );
      toast.error("Failed to add subject");
      throw err;
    }
  };

  // ✅ Add new subject scoped to a Job Role Category (POST /job-categories/:id) — used by Specialization
  const addSubjectForJobRoleCategory = async (jobRoleCategoryId, newSubject) => {
    try {
      await axios.post(`${API_URL}/${jobRoleCategoryId}`, newSubject);
      await fetchSubjects();
      toast.success("Specialization added successfully");
    } catch (err) {
      console.error(
        "Failed to add specialization:",
        err.response?.data || err.message
      );
      toast.error(
        err.response?.data?.message || "Failed to add specialization"
      );
      throw err;
    }
  };

  // ✅ Delete subject (DELETE)
  const deleteSubject = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      await fetchSubjects();
      toast.success("Subject deleted successfully");
    } catch (err) {
      console.error(
        "Failed to delete subject:",
        err.response?.data || err.message
      );
      toast.error("Failed to delete subject");
      throw err;
    }
  };

  const reorderSubjects = async (orderedSubjects) => {
    try {
      await axios.post(`${API_URL_2}/subjects-reorder`, {
        orders: orderedSubjects.map((s, index) => ({
          id: s.id,
          order_index: index + 1,
        })),
      });

      setSubjects(orderedSubjects);
      toast.success("Order updated");
    } catch (err) {
      console.error("Reorder failed:", err);
      toast.error("Reorder failed");
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  return (
    <SubjectContext.Provider
      value={{
        subjects,
        loading,
        error,
        fetchSubjects,
        addSubject,
        addSubjectForJobRoleCategory,
        deleteSubject,

        reorderSubjects,
      }}
    >
      {children}
    </SubjectContext.Provider>
  );
};

export default SubjectProvider;
