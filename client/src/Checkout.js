import React, { useContext, useState } from "react";
import { CartContext } from "./CartContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./checkout.css";
import { BASE_URL } from "./util/util";

const Checkout = () => {
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    address: "",
  });

  const handleInputChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleCheckout = async () => {
    if (!customer.name || !customer.email || !customer.address) {
      return;
    }

    try {
      const response = await axios.post(
        `${BASE_URL}/create-checkout-session`,
        {
          cartItems: cart,
        },
        { withCredentials: true }
      );

      window.location.href = response.data.url;
    } catch (error) {
      console.error("Error creating checkout session", error);
      navigate("/signin");
    }
  };

  const totalAmount = cart.reduce(
    (total, item) => total + item.discountPrice * item.quantity,
    0
  );

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <div className="checkout-details">
        <div className="cart-summary">
          <h3>Order Summary</h3>
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <>
              <div className="cart-items">
                {cart.map((item) => (
                  <div key={item._id} className="cart-item">
                    <img
                      src={`${BASE_URL}/file/${item.image}`}
                      alt={item.productName}
                    />
                    <div className="item-info">
                      <span className="product-name">{item.productName}</span>
                      <span className="product-price">
                        ${item.discountPrice} x {item.quantity}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="cart-total">
                <h3>Total: ${totalAmount.toFixed(2)}</h3>
              </div>
            </>
          )}
        </div>

        <div className="checkout-form">
          <h3>Billing Details</h3>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={customer.name}
            onChange={handleInputChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={customer.email}
            onChange={handleInputChange}
            required
          />
          <textarea
            name="address"
            placeholder="Shipping Address"
            value={customer.address}
            onChange={handleInputChange}
            required
          />
          <button onClick={handleCheckout} disabled={cart.length === 0}>
            Pay with Stripe
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
