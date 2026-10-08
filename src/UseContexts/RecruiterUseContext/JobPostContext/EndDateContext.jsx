// src/UseContexts/RecruiterUseContext/JobPostContext/EndDateContext.jsx
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const EndDateContext = createContext();

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/admin/expired-job`;

export const EndDateProvider = ({ children }) => {
  const [endDates, setEndDates] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ GET
  const fetchEndDates = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      setEndDates(res.data?.data || []);
    } catch (err) {
      console.error("Error fetching end dates:", err);
      toast.error("Failed to fetch end dates");
      setEndDates([]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ POST
//   const addEndDate = async (newItem) => {
//     try {
//       const res = await axios.post(API_URL, newItem);
//       setEndDates((prev) => [...prev, res.data]);
//       toast.success("End date added successfully!");
//     } catch (err) {
//       console.error("Error adding end date:", err);
//       toast.error("Failed to add end date");
//     }
//   };

  // ✅ PUT (Edit)
  const updateEndDate = async (id, updatedItem) => {
    try {
      await axios.put(`${API_URL}/${id}`, updatedItem);
      setEndDates((prev) =>
        prev.map((item) => (item.id === id ? { ...item, ...updatedItem } : item))
      );
      toast.success("End date updated successfully!");
    } catch (err) {
      console.error("Error updating end date:", err);
      toast.error("Failed to update end date");
    }
  };

  // ✅ DELETE
//   const deleteEndDate = async (id) => {
//     try {
//       await axios.delete(`${API_URL}/${id}`);
//       setEndDates((prev) => prev.filter((item) => item.id !== id));
//       toast.success("End date deleted successfully!");
//     } catch (err) {
//       console.error("Error deleting end date:", err);
//       toast.error("Failed to delete end date");
//     }
//   };

  useEffect(() => {
    fetchEndDates();
  }, []);

  return (
    <EndDateContext.Provider
      value={{
        endDates,
        loading,
        fetchEndDates,
        // addEndDate,
        updateEndDate,
        // deleteEndDate,
      }}
    >
      {children}
    </EndDateContext.Provider>
  );
};

export default EndDateProvider;
