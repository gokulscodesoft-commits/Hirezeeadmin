// src/UseContexts/JobPostUseContext/ProficiencyContext.jsx
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const ProficiencyContext = createContext();

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/admin-all-proficiency`;

const ProficiencyProvider = ({ children }) => {
  const [proficiencies, setProficiencies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Fetch proficiency list
  const fetchProficiencies = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      setProficiencies(res.data?.result || []);
    } catch (err) {
      setError(err.message || "Failed to fetch proficiencies");
      toast.error("Failed to fetch proficiencies");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Add new proficiency
  const addProficiency = async (newProficiency) => {
    try {
      await axios.post(API_URL, newProficiency);
      await fetchProficiencies();
      toast.success("Proficiency added successfully");
    } catch (err) {
      console.error("Failed to add proficiency:", err.response?.data || err.message);
      toast.error("Failed to add proficiency");
      throw err;
    }
  };

  // ✅ Delete proficiency
  const deleteProficiency = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      await fetchProficiencies();
      toast.success("Proficiency deleted successfully");
    } catch (err) {
      console.error("Failed to delete proficiency:", err.response?.data || err.message);
      toast.error("Failed to delete proficiency");
      throw err;
    }
  };

  useEffect(() => {
    fetchProficiencies();
  }, []);

  return (
    <ProficiencyContext.Provider
      value={{
        proficiencies,
        loading,
        error,
        fetchProficiencies,
        addProficiency,
        deleteProficiency,
      }}
    >
      {children}
    </ProficiencyContext.Provider>
  );
};

export default ProficiencyProvider;
