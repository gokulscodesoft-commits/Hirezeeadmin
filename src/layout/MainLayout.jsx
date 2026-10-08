import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import "./MainLayout.css";

function MainLayout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`main-layout${collapsed ? " sidebar-collapsed" : ""}`}>
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((c) => !c)} />
      <div className="content">
        <Header />
        <div className="hero-section">
          <Outlet />
        </div>
        {/* <Footer /> */}
      </div>
    </div>
  );
}

export default MainLayout;
