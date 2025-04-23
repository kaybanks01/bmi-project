import React, { useEffect, useState, useContext } from "react";
import ProductCard from "./ProductCard";
import { CartContext } from "./CartContext";
import "./home.css";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "./util/util";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/products`);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.productName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="home-container">
      <nav className="navbar">
        <h1 className="logo">BMI SHOP</h1>
        <div className="nav-links">
          <span className="cart-count" onClick={() => navigate("/cart")}>
            🛒 {cart.length}
          </span>
          <button className="btn login-btn" onClick={() => navigate("/auth")}>
            Login
          </button>
          <button className="btn signup-btn" onClick={() => navigate("/auth")}>
            Signup
          </button>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-content">
          <h1>Discover the Best Deals!</h1>
          <p>Shop the latest trends at unbeatable prices.</p>
          <span>Shop Now </span>
        </div>
      </section>

      <section className="search-bar-section">
        <input
          type="text"
          className="search-bar"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </section>

      <section className="products">
        <h2>Featured Products</h2>
        <div className="product-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          ) : (
            <p>No products available</p>
          )}
        </div>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <p>
            &copy; {new Date().getFullYear()} BMI SHOP. All rights reserved.
          </p>
          <div className="footer-links">
            <a href="/#">Terms</a>
            <a href="/#">Privacy</a>
            <a href="/#">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
