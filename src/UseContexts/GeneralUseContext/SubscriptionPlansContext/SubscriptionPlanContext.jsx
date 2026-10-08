import axios from "axios";
import React, { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

export const SubscriptionPlanContext = createContext();

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/admin-subscription-information`;

export const SubscriptionPlanProvider = ({ children }) => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  // ============================
  // GET (Fetch All)
  // ============================
  const fetchSubscriptions = async () => {
    try {
      setLoading(true);

      const res = await axios.get(API_URL);

      if (res.data?.status === "Success") {
        setSubscriptions(res.data.data || []);
      } else {
        throw new Error("Invalid API Response");
      }
    } catch (err) {
      console.error("Error fetching subscriptions:", err);
      toast.error("Failed to fetch subscriptions");
      setSubscriptions([]);
    } finally {
      setLoading(false);
    }
  };

  // ============================
  // POST (Add New Subscription)
  // ============================
  const addSubscription = async (newItem) => {
    try {
      await axios.post(API_URL, newItem);
      await fetchSubscriptions(); // refresh
      toast.success("Subscription added successfully!");
    } catch (err) {
      console.error("Failed to add subscription:", err.response?.data || err.message);
      toast.error("Failed to add subscription");
      throw err;
    }
  };

  // ============================
  // PUT (Update Subscription)
  // ============================
  const updateSubscription = async (id, updatedItem) => {
    try {
      await axios.put(`${API_URL}/${id}`, updatedItem);

      setSubscriptions((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, ...updatedItem } : item
        )
      );

      toast.success("Subscription updated successfully!");
    } catch (err) {
      console.error("Failed to update subscription:", err);
      toast.error("Failed to update subscription");
    }
  };

  // ============================
  // DELETE (Remove Subscription)
  // ============================
  const deleteSubscription = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);

      setSubscriptions((prev) => prev.filter((item) => item.id !== id));

      toast.success("Subscription deleted successfully!");
    } catch (err) {
      console.error("Error deleting subscription:", err);
      toast.error("Failed to delete subscription");
    }
  };

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  return (
    <SubscriptionPlanContext.Provider
      value={{
        subscriptions,
        loading,
        fetchSubscriptions,
        addSubscription,
        updateSubscription,
        deleteSubscription,
      }}
    >
      {children}
    </SubscriptionPlanContext.Provider>
  );
};

// ✅ FIX: Custom hook export (required)
export const useSubscriptionPlans = () => React.useContext(SubscriptionPlanContext);

// Default export
export default SubscriptionPlanProvider;
