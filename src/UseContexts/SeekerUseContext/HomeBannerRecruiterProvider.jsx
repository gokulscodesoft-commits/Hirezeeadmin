import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const HomeBannerRecruiterContext = createContext();

const HomeBannerRecruiterProvider = ({ children }) => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/recruiter-banners`;

  // 🔹 Fetch banners (with cache-busting)
  const fetchBanners = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);

      // Always add timestamp to bust cache
      const bannerData = (res.data?.data || []).map((b) => ({
        ...b,
        banner_image: b.banner_image
          ? `${b.banner_image}?t=${Date.now()}`
          : null,
      }));

      setBanners(bannerData);
    } catch (err) {
      setError(err.message || "Failed to fetch banners");
      toast.error("Failed to fetch banners");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  // ✅ POST add banner
  const addBanner = async (formData) => {
    try {
      await axios.post(API_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      await fetchBanners();
      toast.success("Banner added successfully!");
    } catch (err) {
      console.error("Failed to add banner:", err.response?.data || err.message);
      toast.error("Failed to add banner");
      throw err;
    }
  };

  // ✅ PUT update banner
  const updateBanner = async (id, formData) => {
    try {
      await axios.put(`${API_URL}/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      await fetchBanners();
      toast.success("Banner updated successfully!");
    } catch (err) {
      console.error(
        "Failed to update banner:",
        err.response?.data || err.message
      );
      toast.error("Failed to update banner");
      throw err;
    }
  };

  // ✅ DELETE banner
  const deleteBanner = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setBanners((prev) => prev.filter((b) => b.id !== id));
      toast.success("Banner deleted successfully!");
    } catch (err) {
      console.error(
        "Failed to delete banner:",
        err.response?.data || err.message
      );
      toast.error("Failed to delete banner");
      throw err;
    }
  };

  return (
    <>
      <HomeBannerRecruiterContext.Provider
        value={{
          banners,
          loading,
          error,
          fetchBanners,
          addBanner,
          updateBanner,
          deleteBanner,
        }}
      >
        {children}
      </HomeBannerRecruiterContext.Provider>
    </>
  );
};

export default HomeBannerRecruiterProvider;
