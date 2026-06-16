import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AlertDialog from "./component/logout-dialog";
import "./dashboard.css";


function Dashboard() {
  const [data, setData] = useState({});
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  useEffect(() => {
  const savedUser = localStorage.getItem("user");
  if (!savedUser) {
    navigate("/auth");
    return;
  }
  const userData = JSON.parse(savedUser);
  setData(userData);
}, [navigate]);

  const handleLogout = () => setOpen(true);

  const confirmLogout = async () => {
  localStorage.removeItem("user");
  navigate("/auth");
};

  return (
    <div className="dashboard-container">
      <aside className="dashboard-sidenav">
        <h2 className="dashboard-logo">BMI SHOP</h2>

        <nav className="dashboard-nav">
          <span
            onClick={() => navigate("/customerhome")}
            className="nav-item"
          >
            <HomeIcon className="nav-icon" />
            Home
          </span>

          <span
            onClick={() => navigate("/customerprofile")}
            className="nav-item"
          >
            <PersonIcon className="nav-icon" />
            Profile
          </span>

          <span onClick={() => navigate("/cart")} className="nav-item">
            <ShoppingCartIcon className="nav-icon" />
            Cart
          </span>
        </nav>

        <button type="button" className="logout-btn" onClick={handleLogout}>
          <ExitToAppIcon className="nav-icon" />
          Logout
        </button>

        <AlertDialog open={open} setOpen={setOpen} onClick={confirmLogout} />
      </aside>

    
      <main className="dashboard-main">
        <div className="dashboard-header">
          <h1>Welcome back, {data?.username}!</h1>
          <div className="profile-circle">
            {data?.username?.charAt(0).toUpperCase()}
          </div>
        </div>
        <hr />
        <div className="dashboard-cards">
          <div className="dashboard-card">
            <h3>Orders</h3>
            <p>12</p>
          </div>
          <div className="dashboard-card">
            <h3>Cart Items</h3>
            <p>3</p>
          </div>
          <div className="dashboard-card">
            <h3>Wishlist</h3>
            <p>5</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
