import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const SubscribedContext = createContext();

const API_URL = `${
  import.meta.env.VITE_API_BASE_URL
}/api/admin-recruiter-subscribed-list`;

const SubscribedRecruiterContext = ({ children }) => {
  const [subscribed, setSubscribed] = useState([]);

  const [loading, setLoading] = useState(true);

  const fetchSubscribedList = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      setSubscribed(res.data.recruiters || []);
    } catch (err) {
      console.error("Error fetching experiences:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscribedList();
  }, []);
  return (
    <>
      <SubscribedContext.Provider
        value={{
          loading,
          subscribed,
        }}
      >
        {children}
      </SubscribedContext.Provider>
    </>
  );
};

export default SubscribedRecruiterContext;
