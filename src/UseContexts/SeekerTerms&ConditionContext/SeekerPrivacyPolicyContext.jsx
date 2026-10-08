import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

import { toast } from "react-toastify";

export const SeekerPrivacyContext = createContext();

const API_URL = `${
  import.meta.env.VITE_API_BASE_URL
}/api/admin/seeker-privacy-policy`;

const SeekerPrivacyPolicyContext = ({ children }) => {
  const [privacy, setPrivacy] = useState([]);

  const [loading, setLoading] = useState(true);

  const fetchPrivacyPolicy = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      setPrivacy(res.data.data || []);
    } catch (err) {
      console.error("Error fetching experiences:", err);
    } finally {
      setLoading(false);
    }
  };

  //post data

  const addPrivacy = async (payload) => {
    try {
      await axios.post(API_URL, payload);
      await fetchPrivacyPolicy(); // 🔥 refresh list
      toast.success("Privacy & Policy added successfully");
      return true;
    } catch (error) {
      console.error("Error adding terms:", error);
      toast.error("Failed to add");
      return false;
    }
  };

  const deletePrivacy = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      await fetchPrivacyPolicy();
      toast.success("Privacy & Policy deleted successfully");
      return true;
    } catch (error) {
      console.error("Error deleting terms:", error);
      toast.error("Failed to delete");
      return false;
    }
  };

  const updatePrivacy = async (id, payload) => {
    try {
      await axios.put(`${API_URL}/${id}`, payload);
      await fetchPrivacyPolicy();
      toast.success("Privacy & Policy updated successfully");
      return true;
    } catch (error) {
      console.error("Error updating terms:", error);
      toast.error("Failed to update");
      return false;
    }
  };

  useEffect(() => {
    fetchPrivacyPolicy();
  }, []);

  return (
    <>
      <SeekerPrivacyContext.Provider
        value={{
          privacy,
          loading,
          addPrivacy,
          updatePrivacy,
          deletePrivacy,
        }}
      >
        {children}
      </SeekerPrivacyContext.Provider>
    </>
  );
};

export default SeekerPrivacyPolicyContext;
