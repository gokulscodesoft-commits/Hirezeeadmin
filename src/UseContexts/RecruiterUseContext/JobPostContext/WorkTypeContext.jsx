import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const WorkTypeContext = createContext();

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/admin/work-type`;

export const WorkTypeProvider = ({ children }) => {
    const [workTypes, setWorkTypes] = useState([]);
    const [loading, setLoading] = useState(true);

    // ✅ GET all work types
    const fetchWorkTypes = async () => {
        try {
            setLoading(true);
            const response = await axios.get(API_URL);

            setWorkTypes(response.data?.data || []);
        } catch (error) {
            console.error("Error fetching work types:", error);
            toast.error("Failed to fetch work types");
            setWorkTypes([]); // fallback to empty array
        } finally {
            setLoading(false);
        }
    };

    // ✅ POST (Add new)
    const addWorkType = async (newItem) => {
        try {
            await axios.post(API_URL, newItem);
            await fetchWorkTypes(); // re-fetch to stay in sync
            toast.success("Work type added successfully!");
        } catch (error) {
            console.error("Error adding work type:", error.response?.data || error.message);
            toast.error("Failed to add work type");
            throw error;
        }
    };

    // ✅ DELETE
    const deleteWorkType = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            setWorkTypes((prev) => prev.filter((item) => item.id !== id));
            toast.success("Work type deleted successfully!");
        } catch (error) {
            console.error("Error deleting work type:", error);
            toast.error("Failed to delete work type");
        }
    };

    useEffect(() => {
        fetchWorkTypes();
    }, []);

    return (
        <WorkTypeContext.Provider
            value={{
                workTypes,
                loading,
                fetchWorkTypes,
                addWorkType,
                deleteWorkType,
            }}
        >
            {children}
        </WorkTypeContext.Provider>
    );
};

export default WorkTypeProvider