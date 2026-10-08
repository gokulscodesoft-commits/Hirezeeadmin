// src/UseContexts/JobPostUseContext/LanguageContext.jsx
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const LanguageContext = createContext();

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/admin-all-languages`;

const LanguageProvider = ({ children }) => {
  const [languages, setLanguages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Fetch languages
  const fetchLanguages = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      setLanguages(res.data?.result || []);
    } catch (err) {
      setError(err.message || "Failed to fetch languages");
      toast.error("Failed to fetch languages");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Add language
  const addLanguage = async (newLanguage) => {
    try {
      await axios.post(API_URL, newLanguage);
      await fetchLanguages();
      toast.success("Language added successfully");
    } catch (err) {
      console.error("Failed to add language:", err.response?.data || err.message);
      toast.error("Failed to add language");
      throw err;
    }
  };

  // ✅ Delete language
  const deleteLanguage = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      await fetchLanguages();
      toast.success("Language deleted successfully");
    } catch (err) {
      console.error("Failed to delete language:", err.response?.data || err.message);
      toast.error("Failed to delete language");
      throw err;
    }
  };

  useEffect(() => {
    fetchLanguages();
  }, []);

  return (
    <LanguageContext.Provider
      value={{
        languages,
        loading,
        error,
        fetchLanguages,
        addLanguage,
        deleteLanguage,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;
