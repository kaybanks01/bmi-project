import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import PeopleIcon from "@mui/icons-material/People"; // Add the People icon for users
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import "./sidenav.css";

function SideNav() {
  const location = useLocation();

  return (
    <aside className="admin-dashboard">
      <h2 className="adminlogo">BMI SHOP</h2>

      <nav className="admin-menu">
        <NavLink
          to="/admin/dashboard"
          className={`adminmenu-item ${location.pathname === "/admin/dashboard" ? "active" : ""}`}
        >
          <HomeIcon /> Home
        </NavLink>
        <NavLink
          to="/admin/upload"
          className={`adminmenu-item ${location.pathname === "/admin/upload" ? "active" : ""}`}
        >
          <CloudUploadIcon /> Upload
        </NavLink>
        <NavLink
          to="/admin/products"
          className={`adminmenu-item ${location.pathname === "/admin/products" ? "active" : ""}`}
        >
          <CloudUploadIcon /> Products
        </NavLink>
        <NavLink
          to="/admin/users"
          className={`adminmenu-item ${location.pathname === "/admin/users" ? "active" : ""}`}
        >
          <PeopleIcon /> Users 
        </NavLink>
      </nav>

      <button className="adminlogout-button">
        <ExitToAppIcon /> LogOut
      </button>
    </aside>
  );
}

export default SideNav;
