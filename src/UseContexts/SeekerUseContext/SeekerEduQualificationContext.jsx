import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const SeekerEduQualification = createContext();

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/admin/education-qualification-list`;

export const SeekerEduQualificationProvider = ({ children }) => {
  const [qualifications, setQualifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);

// Fetch all qualifications
const fetchQualifications = async () => {
  try {
    setLoading(true);
    const res = await axios.get(API_URL);
    const formatted = (res.data.data || []).map((item) => ({
      id: item.id,
      qualification: item.education_qualification_list, // field used in table
      postedOn: new Date(item.created_at).toLocaleDateString(),
      createdBy: "Admin", // or use item.created_by if API provides
    }));
    setQualifications(formatted);
  } catch (err) {
    console.error("Failed to fetch qualifications:", err);
    toast.error("Failed to load qualifications");
  } finally {
    setLoading(false);
  }
};

  // Add qualification
const addQualification = async (newItem) => {
  if (adding) return; // prevent double submission
  try {
    setAdding(true);
    await axios.post(API_URL, newItem);
    await fetchQualifications();
    toast.success("Qualification added successfully");
  } catch (err) {
    console.error("Failed to add qualification:", err.response?.data || err.message);
    toast.error("Failed to add qualification");
  } finally {
    setAdding(false);
  }
};

  // Delete qualification
const deleteQualification = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    setQualifications((prev) => prev.filter((item) => item.id !== id)); // remove locally
    toast.success("Qualification deleted successfully");
  } catch (err) {
    console.error("Failed to delete qualification:", err.response?.data || err.message);
    toast.error("Failed to delete qualification");
    throw err; // ensures caller knows deletion failed
  }
};


  // Update qualification
  const updateQualification = async (id, updatedItem) => {
    try {
      await axios.put(`${API_URL}/${id}`, updatedItem);
      await fetchQualifications();
      toast.success("Qualification updated successfully");
    } catch (err) {
      console.error("Failed to update qualification:", err);
      toast.error("Failed to update qualification");
    }
  };

  useEffect(() => {
    fetchQualifications();
  }, []);

  return (
    <SeekerEduQualification.Provider
      value={{
        qualifications,
        loading,
        addQualification,
        deleteQualification,
        updateQualification,
        fetchQualifications,
      }}
    >
      {children}
    </SeekerEduQualification.Provider>
  );
};

export default  SeekerEduQualificationProvider;
