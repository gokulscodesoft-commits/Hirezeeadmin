import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

// Create the context
const RecruiterJobPostsContext = createContext();

// Create provider
export const RecruiterJobPostsProvider = ({ children }) => {
  const [recruiters, setRecruiters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecruiterDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/admin-recruiter-full-details`
        );

        if (response.data.status === "Success") {
          setRecruiters(response.data.recruiters);
        } else {
          setError("Failed to fetch recruiter data");
        }
      } catch (err) {
        console.error("❌ Error fetching recruiter details:", err);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchRecruiterDetails();
  }, []);

  return (
    <RecruiterJobPostsContext.Provider
      value={{ recruiters, loading, error }}
    >
      {children}
    </RecruiterJobPostsContext.Provider>
  );
};

// Custom hook for easy use
export const useRecruiterJobPosts = () => useContext(RecruiterJobPostsContext);
export default RecruiterJobPostsProvider;