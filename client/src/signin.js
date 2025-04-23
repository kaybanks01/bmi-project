import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "./App.css";
import { BASE_URL } from "./util/util";
// import image1 from "./images/download (1).png";
// import image2 from "./images/download.png";
// import image3 from "./images/logo.png";

function Signin() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); 
  };

  const validateForm = () => {
    const newErrors = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email.";
    }
    if (!formData.password || formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors in the form.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/signi`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const data = await response.json();
      setLoading(false);

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      } else {
        toast.success("Signin successful!");
        setTimeout(() => navigate("/dashboard"), 1000);
      }
    } catch (err) {
      setLoading(false);
      toast.error(err.message);
    }
  };

  return (
    <div className="auth-body">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="auth-container">
        <div className="right-section">
          <h2>Sign In</h2>
          <form onSubmit={handleSubmit}>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? "error-input" : ""}
                required
              />
              {errors.email && <small className="error-text">{errors.email}</small>}

              <input
                type="password"
                name="password"
                placeholder="********"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? "error-input" : ""}
                required
              />
              {errors.password && <small className="error-text">{errors.password}</small>}

            <button type="submit" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* <div className="social-icons">
            <img src={image1} alt="Facebook" />
            <img src={image2} alt="Google" />
            <img src={image3} alt="LinkedIn" />
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Signin;
