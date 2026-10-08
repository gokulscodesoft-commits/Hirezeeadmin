// src/UseContexts/SeekerUseContext/QualificationSpecificationContext.jsx
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const QualificationSpecificationContext = createContext();

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/admin/qualification-specification`;

const QualificationSpecificationProvider = ({ children }) => {
  const [specifications, setSpecifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSpecifications = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      setSpecifications(res.data?.data || []);
    } catch (err) {
      setError(err.message || "Failed to fetch qualification specifications");
      toast.error("Failed to fetch qualification specifications");
    } finally {
      setLoading(false);
    }
  };

  const addSpecification = async (newSpec) => {
    try {
      await axios.post(API_URL, newSpec);
      await fetchSpecifications();
      toast.success("Qualification specification added successfully");
    } catch (err) {
      console.error("Failed to add specification:", err.response?.data || err.message);
      toast.error("Failed to add qualification specification");
      throw err;
    }
  };

  const updateSpecification = async (id, updatedSpec) => {
    try {
      await axios.put(`${API_URL}/${id}`, updatedSpec);
      await fetchSpecifications();
      toast.success("Qualification specification updated successfully");
    } catch (err) {
      console.error("Failed to update specification:", err.response?.data || err.message);
      toast.error("Failed to update qualification specification");
      throw err;
    }
  };

  const deleteSpecification = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      await fetchSpecifications();
      toast.success("Qualification specification deleted successfully");
    } catch (err) {
      console.error("Failed to delete specification:", err.response?.data || err.message);
      toast.error("Failed to delete qualification specification");
      throw err;
    }
  };

  useEffect(() => {
    fetchSpecifications();
  }, []);

  return (
    <QualificationSpecificationContext.Provider
      value={{
        specifications,
        loading,
        error,
        fetchSpecifications,
        addSpecification,
        updateSpecification,
        deleteSpecification,
      }}
    >
      {children}
    </QualificationSpecificationContext.Provider>
  );
};

export default QualificationSpecificationProvider;
