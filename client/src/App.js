import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./home";
import Users from "./USERS/users";
import Dashboard from "./dashboard";
import Admin from "./admin/admin";
import AdminHome from "./adminpages/Adminhome";
import Upload from "./adminpages/upload";
import Product from "./adminpages/products";
import Cart from "./Cart";
import Checkout from "./Checkout";
import { CartProvider } from "./CartContext";
import Auth from "./auth"; 
import CustomerHome from "./customerhome";
import CustomerProfile from "./customerprofile";

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/users" element={<Users />} />
          <Route path="/customerhome" element={<CustomerHome />} />
          <Route path="/customerprofile" element={<CustomerProfile />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />

          <Route path="/admin" element={<Admin />}>
            <Route path="dashboard" element={<AdminHome />} />
            <Route path="upload" element={<Upload />} />
            <Route path="products" element={<Product />} />
            <Route path="users" element={<Users />} /> 
          </Route>
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
