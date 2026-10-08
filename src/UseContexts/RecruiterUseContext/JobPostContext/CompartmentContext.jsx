// src/UseContexts/JobPostUseContext/CompartmentLevelContext.jsx
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const CompartmentLevelContext = createContext();

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/admin/compartment-levels`;

export const CompartmentLevelProvider = ({ children }) => {
  const [levels, setLevels] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch all levels
  const fetchLevels = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      setLevels(res.data.data || []);
    } catch (err) {
      console.error("Failed to fetch compartment levels:", err);
      toast.error("Failed to fetch compartment levels");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Add new level
  const addLevel = async (newItem) => {
    try {
      await axios.post(API_URL, newItem);
      await fetchLevels();
      toast.success("Compartment / Level added successfully");
    } catch (err) {
      console.error("Failed to add level:", err.response?.data || err.message);
      toast.error("Failed to add level");
      throw err;
    }
  };

  // ✅ Update level
  const updateLevel = async (id, updatedItem) => {
    try {
      await axios.put(`${API_URL}/${id}`, updatedItem);
      await fetchLevels();
      toast.success("Compartment / Level updated successfully");
    } catch (err) {
      console.error("Failed to update level:", err.response?.data || err.message);
      toast.error("Failed to update level");
      throw err;
    }
  };

  // ✅ Delete level
  const deleteLevel = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setLevels((prev) => prev.filter((item) => item.id !== id));
      toast.success("Compartment / Level deleted successfully");
    } catch (err) {
      console.error("Failed to delete level:", err.response?.data || err.message);
      toast.error("Failed to delete level");
      throw err;
    }
  };

  useEffect(() => {
    fetchLevels();
  }, []);

  return (
    <CompartmentLevelContext.Provider
      value={{
        levels,
        loading,
        fetchLevels,
        addLevel,
        updateLevel,
        deleteLevel,
      }}
    >
      {children}
    </CompartmentLevelContext.Provider>
  );
};

export default CompartmentLevelProvider;