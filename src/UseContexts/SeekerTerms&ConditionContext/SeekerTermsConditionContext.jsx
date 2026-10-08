import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

import { toast } from "react-toastify";

export const SeekerTermsContext = createContext();

const API_URL = `${
  import.meta.env.VITE_API_BASE_URL
}/api/admin/terms-conditions`;

const SeekerTermsConditionContext = ({ children }) => {
  const [terms, setTerms] = useState([]);

  const [loading, setLoading] = useState(true);

  //fetch data
  const fetchExperiences = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      setTerms(res.data.data || []);
    } catch (err) {
      console.error("Error fetching experiences:", err);
    } finally {
      setLoading(false);
    }
  };

  //post data

  const addTerms = async (payload) => {
    try {
      await axios.post(API_URL, payload);
      await fetchExperiences(); // 🔥 refresh list
      toast.success("Terms & Condition added successfully");
      return true;
    } catch (error) {
      console.error("Error adding terms:", error);
      toast.error("Failed to add");
      return false;
    }
  };

  const deleteTerms = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      await fetchExperiences();
      toast.success("Terms & Condition deleted successfully");
      return true;
    } catch (error) {
      console.error("Error deleting terms:", error);
      toast.error("Failed to delete");
      return false;
    }
  };

  const updateTerms = async (id, payload) => {
    try {
      await axios.put(`${API_URL}/${id}`, payload);
      await fetchExperiences();
      toast.success("Terms & Condition updated successfully");
      return true;
    } catch (error) {
      console.error("Error updating terms:", error);
      toast.error("Failed to update");
      return false;
    }
  };

  // ✅ Fetch data
  useEffect(() => {
    fetchExperiences();
  }, []);

  return (
    <SeekerTermsContext.Provider
      value={{
        terms,
        loading,
        addTerms,
        deleteTerms,
        updateTerms,
      }}
    >
      {children}
    </SeekerTermsContext.Provider>
  );
};

export default SeekerTermsConditionContext;
