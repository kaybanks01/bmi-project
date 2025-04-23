import React, { useEffect, useState, useContext } from "react";
import ProductCard from "./ProductCard";
import { CartContext } from "./CartContext";
import "./home.css";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "./util/util";

const CustomerHome = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState(null);
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${BASE_URL}/products`);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

   
    const fetchUser = async () => {
      try {
        const response = await fetch(`${BASE_URL}/dashboard`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          navigate("/auth");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        navigate("/auth");
      }
    };

    fetchProducts();
    fetchUser();
  }, [navigate]);

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
        </div>
      </nav>

      <section className="hero">
        <div className="hero-content">
          <h1>Welcome back{user ? `, ${user.username}` : ""}!</h1>
          <p>Check out the latest arrivals just for you.</p>
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
        <h2>Recommended Products</h2>
        <div className="product-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          ) : (
            <p>No products found.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default CustomerHome;
