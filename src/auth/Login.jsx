import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { CiAt } from "react-icons/ci";
import { GoLock } from "react-icons/go";
import { PiEyeBold, PiEyeSlashBold } from "react-icons/pi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../assets/talfrc.svg";
import adminLogo from "../assets/adminlogo.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin-login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success("Login successful", {
          position: "top-right",
          autoClose: 500,
        });

        // Store session marker (backend does not issue a real token)
        localStorage.setItem("authToken", data.token || data.data?.id || "admin-session");
        // Track when the session started, so it can be auto-expired after 1 hour
        localStorage.setItem("authTokenIssuedAt", String(Date.now()));

        // Delay a bit before navigating
        setTimeout(() => navigate("/dashboard"), 1800);
      } else {
        toast.error(data.message || "Invalid email or password", {
          position: "top-right",
          autoClose: 1500,
        });
      }
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Something went wrong. Please try again.", {
        position: "top-right",
        autoClose: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="login-container">
        <div className="greet-card">
          <img src={adminLogo} alt="TalentForce Logo" className="login-logo" />

          <div className="login-title-wrap">
            <h2 className="login1">Welcome Back</h2>
            <h2 className="login2">Please Sign In To Continue</h2>
          </div>

          <div className="login-card">
            <form className="login-form" onSubmit={handleSubmit}>
              {/* Email Field */}
              <div className="form-group input-with-icon">
                <label>Email</label>
                <div className="input-wrapper">
                  <CiAt className="input-icon" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="form-group input-with-icon">
                <label>Password</label>
                <div className="input-wrapper">
                  <GoLock className="input-icon" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                  />
                  <span
                    className="eye-icon"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <PiEyeSlashBold /> : <PiEyeBold />}
                  </span>
                </div>
              </div>

              <button type="submit" className="login-btn" disabled={loading}>
                {loading ? "Signing In..." : "Sign In"}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Toastify container */}
      <ToastContainer />
    </>
  );
};

export default Login;
