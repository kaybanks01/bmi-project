import React, { useContext, useState } from "react";
import { CartContext } from "./CartContext"; 
import { useNavigate } from "react-router-dom";
import "./cart.css";
import { BASE_URL } from "./util/util";

function Cart() {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity } = useContext(CartContext);
  const [coupon, setCoupon] = useState("");
  const navigate = useNavigate();

  const handleQuantityChange = (item, type) => {
    if (type === "increase" && item.quantity < item.stock) {
      increaseQuantity(item._id);
    } else if (type === "decrease" && item.quantity > 1) {
      decreaseQuantity(item._id);
    }
  };

  const subtotal = cart.reduce((total, item) => total + item.discountPrice * item.quantity, 0);

  return (
    <div className="cart-container">
      <h1 className="cart-title">🛒 Your Shopping Cart</h1>

      {cart.length === 0 ? (
        <p className="empty-cart">Your cart is currently empty.</p>
      ) : (
        <>
          <table className="cart-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Product</th>
                <th>Price</th>
                <th>Discount</th>
                <th>Quantity</th>
                <th>Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item._id}>
                  <td>
                    <img
                      src={`${BASE_URL}/file/${item.image}`}
                      alt={item.productName}
                      className="cart-item-image"
                    />
                  </td>
                  <td>{item.productName}</td>
                  <td>${item.price.toFixed(2)}</td>
                  <td className="discount-price">${item.discountPrice.toFixed(2)}</td>
                  <td>
                    <div className="quantity-controls">
                      <button onClick={() => handleQuantityChange(item, "decrease")}>−</button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item, "increase")}
                        disabled={item.quantity >= item.stock}
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td>${(item.discountPrice * item.quantity).toFixed(2)}</td>
                  <td>
                    <button className="remove-btn" onClick={() => removeFromCart(item._id)}>
                      ✕
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="cart-summary">
            <div className="coupon-section">
              <input
                type="text"
                placeholder="Enter coupon code"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
              />
              <button disabled>Apply</button> 
            </div>

            <div className="totals">
              <p>Subtotal: <strong>${subtotal.toFixed(2)}</strong></p>
            </div>
          </div>

          <div className="cart-actions">
            <button className="continue-shopping-btn" onClick={() => navigate("/")}>
              ⬅ Continue Shopping
            </button>
            <button className="checkout-btn" onClick={() => navigate("/checkout")}>
              Checkout →
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
