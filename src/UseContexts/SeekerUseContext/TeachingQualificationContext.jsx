// src/UseContexts/SeekerUseContext/TeachingQualificationContext.jsx
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const TeachingQualificationContext = createContext();

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/admin/course/teaching-qualification`;

export const TeachingQualificationProvider = ({ children }) => {
  const [teachingQual, setTeachingQual] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  // fetch (all, or scoped to a Job Role Category when selected)
  const fetchTeachingQual = async (categoryId = selectedCategoryId) => {
    try {
      setLoading(true);
      const url = categoryId ? `${API_URL}/${categoryId}` : API_URL;
      const res = await axios.get(url);
      setTeachingQual(res.data.results || []);
    } catch (err) {
      console.error("Failed to fetch teaching qualifications:", err);
      toast.error("Failed to load teaching qualifications");
    } finally {
      setLoading(false);
    }
  };

  // add (job_role_category_id goes in the URL, e.g. /teaching-qualification/4)
  const addTeachingQual = async ({ job_role_category_id, ...rest }) => {
    try {
      await axios.post(`${API_URL}/${job_role_category_id}`, rest);
      await fetchTeachingQual();
      toast.success("Qualification added successfully");
    } catch (err) {
      console.error("Failed to add qualification:", err);
      toast.error(err.response?.data?.message || "Failed to add qualification");
    }
  };

  // update
  const updateTeachingQual = async (id, updatedItem) => {
    try {
      await axios.put(`${API_URL}/${id}`, updatedItem);
      await fetchTeachingQual();
      toast.success("Qualification updated successfully");
    } catch (err) {
      console.error("Failed to update qualification:", err);
      toast.error(err.response?.data?.message || "Failed to update qualification");
    }
  };

  // delete
  const deleteTeachingQual = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTeachingQual((prev) => prev.filter((q) => q.id !== id));
      toast.success("Qualification deleted successfully");
    } catch (err) {
      console.error("Failed to delete qualification:", err);
      toast.error("Failed to delete qualification");
    }
  };

  useEffect(() => {
    fetchTeachingQual(selectedCategoryId);
  }, [selectedCategoryId]);

  return (
    <TeachingQualificationContext.Provider
      value={{
        teachingQual,
        loading,
        selectedCategoryId,
        setSelectedCategoryId,
        addTeachingQual,
        updateTeachingQual,
        deleteTeachingQual,
      }}
    >
      {children}
    </TeachingQualificationContext.Provider>
  );
};

export default TeachingQualificationProvider;
