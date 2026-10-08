// src/UseContexts/RecruiterUseContext/JobPostContext/ExperienceContext.jsx
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ExperienceContext = createContext();

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/admin/experience`;

export const ExperienceProvider = ({ children }) => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch data
  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      setExperiences(res.data.data || []);
    } catch (err) {
      console.error("Error fetching experiences:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Create
  // const addExperience = async (newExp) => {
  //   try {
  //     const res = await axios.post(API_URL, newExp);
  //     setExperiences((prev) => [...prev, res.data.data]);

  //     await fetchExperiences();
  //   } catch (err) {
  //     console.error("Error adding experience:", err);
  //   }
  // };

  const addExperience = async (newExp) => {
    try {
      await axios.post(API_URL, newExp);
      await fetchExperiences(); // 🔥 IMPORTANT
    } catch (err) {
      console.error("Error adding experience:", err);
    }
  };

  // ✅ Update
  // const updateExperience = async (id, updatedExp) => {
  //   try {
  //     const res = await axios.put(`${API_URL}/${id}`, updatedExp);
  //     setExperiences((prev) =>
  //       prev.map((exp) => (exp.id === id ? res.data.data : exp))
  //     );
  //     await fetchExperiences();
  //   } catch (err) {
  //     console.error("Error updating experience:", err);
  //   }
  // };

  const updateExperience = async (id, updatedExp) => {
    try {
      await axios.put(`${API_URL}/${id}`, updatedExp);
      await fetchExperiences(); // 🔥 IMPORTANT
    } catch (err) {
      console.error("Error updating experience:", err);
    }
  };

  // ✅ Delete
  const deleteExperience = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setExperiences((prev) => prev.filter((exp) => exp.id !== id));
    } catch (err) {
      console.error("Error deleting experience:", err);
    }
  };

  return (
    <ExperienceContext.Provider
      value={{
        experiences,
        loading,
        addExperience,
        updateExperience,
        deleteExperience,
        fetchExperiences,
      }}
    >
      {children}
    </ExperienceContext.Provider>
  );
};

export default ExperienceProvider;
