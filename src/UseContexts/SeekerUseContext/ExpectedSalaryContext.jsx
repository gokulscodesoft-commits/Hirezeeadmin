// src/UseContexts/SeekerUseContext/ExpectedSalaryContent.jsx
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const ExpectedSalaryContext = createContext();

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/admin/salary`;

export const ExpectedSalaryProvider = ({ children }) => {
  const [salaries, setSalaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);

  // Fetch all
  const fetchSalaries = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      const formatted = (res.data.data || []).map((item) => ({
        id: item.id,
        salary: item.salary,
        min_value: item.min_value,
        max_value: item.max_value,
        created_at: item.created_at,
        createdBy: "Admin",
      }));
      setSalaries(formatted);
    } catch (err) {
      console.error("Failed to fetch salaries:", err);
      toast.error("Failed to load expected salaries");
    } finally {
      setLoading(false);
    }
  };

  // Add
  const addSalary = async (newItem) => {
    if (adding) return;
    try {
      setAdding(true);
      await axios.post(API_URL, newItem);
      await fetchSalaries();
      toast.success("Expected salary added successfully");
    } catch (err) {
      console.error("Failed to add salary:", err.response?.data || err.message);
      toast.error("Failed to add expected salary");
    } finally {
      setAdding(false);
    }
  };

  // Delete
  const deleteSalary = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setSalaries((prev) => prev.filter((item) => item.id !== id));
      toast.success("Expected salary deleted successfully");
    } catch (err) {
      console.error("Failed to delete salary:", err.response?.data || err.message);
      toast.error("Failed to delete expected salary");
      throw err;
    }
  };

  // Update
  const updateSalary = async (id, updatedItem) => {
    try {
      await axios.put(`${API_URL}/${id}`, updatedItem);
      await fetchSalaries();
      toast.success("Expected salary updated successfully");
    } catch (err) {
      console.error("Failed to update salary:", err);
      toast.error("Failed to update expected salary");
    }
  };

  useEffect(() => {
    fetchSalaries();
  }, []);

  return (
    <ExpectedSalaryContext.Provider
      value={{
        salaries,
        loading,
        addSalary,
        deleteSalary,
        updateSalary,
        fetchSalaries,
      }}
    >
      {children}
    </ExpectedSalaryContext.Provider>
  );
};

export default ExpectedSalaryProvider;
