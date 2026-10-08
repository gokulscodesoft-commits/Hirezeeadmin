import React from "react";
import { useLocation } from "react-router-dom";
import "./Header.css";

const titleOverrides = {
  subject: "Specialization",
};

function Header() {
  const location = useLocation();

  // Get pathname and split into parts
  const pathParts = location.pathname.split("/").filter(Boolean);

  // Default title
  let currentTitle = "Talent Force Admin";

  if (pathParts.length > 0) {
    const lastSegment = pathParts[pathParts.length - 1];
    if (titleOverrides[lastSegment]) {
      currentTitle = titleOverrides[lastSegment];
    } else {
      currentTitle = lastSegment
        .replace(/-/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());
    }
  }

  return (
    <header className="header">
      <h1>{currentTitle}</h1>
    </header>
  );
}

export default Header;
