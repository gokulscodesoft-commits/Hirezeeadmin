import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const RecruiterInvoiceContext = createContext();

const RazorpayInvoiceDetailsContext = ({ children }) => {
  const API_URL = `${
    import.meta.env.VITE_API_BASE_URL
  }/api/recruiter-invoice-details`;

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Get Abuse Reports
  const fetchRazorPayInvoiceDetails = async () => {
    try {
      setLoading(true);

      const res = await axios.get(API_URL);
      setData(res.data.data || []);
    } catch (error) {
      console.error("Fetch Abuse Reports Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRazorPayInvoiceDetails();
  }, []);

  return (
    <>
      <RecruiterInvoiceContext.Provider
        value={{
          data,
          loading,
        }}
      >
        {children}
      </RecruiterInvoiceContext.Provider>
    </>
  );
};

export default RazorpayInvoiceDetailsContext;
