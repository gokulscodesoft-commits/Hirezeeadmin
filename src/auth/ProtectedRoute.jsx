import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SESSION_DURATION_MS = 60 * 60 * 1000; // 1 hour

const clearSession = () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("authTokenIssuedAt");
};

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");
  const issuedAt = Number(localStorage.getItem("authTokenIssuedAt"));
  const isExpired = !issuedAt || Date.now() - issuedAt >= SESSION_DURATION_MS;

  // Auto-logout the moment 1 hour is reached, even if the admin never navigates
  useEffect(() => {
    if (!token || isExpired) return;

    const remainingMs = SESSION_DURATION_MS - (Date.now() - issuedAt);
    const timer = setTimeout(() => {
      clearSession();
      toast.info("Session expired. Please sign in again.");
      navigate("/", { replace: true });
    }, remainingMs);

    return () => clearTimeout(timer);
  }, [token, issuedAt, isExpired, navigate]);

  if (!token || isExpired) {
    clearSession();
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
