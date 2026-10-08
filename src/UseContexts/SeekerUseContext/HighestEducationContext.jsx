import axios from "axios";
import react, { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export const HighestEducationContext = createContext();

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/admin/course/highest-qualification`

export const HighestEducationProvider = ({children}) => {
    const [highestEdu, setHighestEdu] = useState([]);
    const [loading, setLoading] = useState(true);


// GET
const fetchHighestEdu = async () => {
    try {
        setLoading(true);
        const res = await axios.get(API_URL);
        setHighestEdu(res.data?.results || []);
    } catch (err) {
        console.error("Error fetching highest education:", err);
        toast.error("Failed to fetch highest education");
        setHighestEdu([]);
    } finally {
        setLoading(false);
    }
};

// POST
const addHighestEdu = async (newItem) => {
  try {
    await axios.post(API_URL, newItem);
    await fetchHighestEdu(); // re-fetch list from API
    toast.success("Highest education added successfully!");
  } catch (err) {
    console.error(
      "Failed to add highest education:",
      err.response?.data || err.message
    );
    toast.error("Failed to add highest education");
    throw err;
  }
};


// PUT
const updateHighestEdu = async (id, updatedItem) => {
    try {
      await axios.put(`${API_URL}/${id}`, updatedItem);
      setHighestEdu((prev) =>
        prev.map((item) => (item.id === id ? { ...item, ...updatedItem } : item))
      );
      toast.success("Highest Education updated successfully!");
    } catch (err) {
        console.error("Error Updating Highest Education:", err);
        toast.error("Failed to update highest education");
    }
};

// Delete
const deleteHighestEdu = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    
    // Update state immediately
    setHighestEdu((prev) => prev.filter((item) => item.id !== id));
    
    toast.success("Highest education deleted successfully!");
  } catch (err) {
    console.error("Error deleting Highest Education:", err);
    toast.error("Failed to delete highest education");
  }
};


useEffect(() => {
    fetchHighestEdu();
}, []);

return (
    <HighestEducationContext.Provider
       value={{
            highestEdu,
            loading,
            fetchHighestEdu,
            addHighestEdu,
            updateHighestEdu,
            deleteHighestEdu
        }}
        >
            {children}
    </HighestEducationContext.Provider>
)
};

export default HighestEducationProvider;