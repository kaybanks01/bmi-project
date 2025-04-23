import React from "react";
import { Outlet } from "react-router-dom";
import SideNav from "../component/sidenav";  // Adjust the import path if needed
import "./admin.css";

function Admin() {
  return (
    <div className="adminbodydash">
      <div className="admin-container">
        <SideNav />
        <main className="adminmain-content">
          <Outlet /> 
        </main>
      </div>
    </div>
  );
}

export default Admin;
