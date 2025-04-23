import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { BASE_URL } from "./util/util";
// import image1 from "./images/download (1).png";
// import image2 from "./images/download.png";
// import image3 from "./images/logo.png";

function Signup() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!/^[a-zA-Z0-9]{3,}$/.test(formData.username)) {
      newErrors.username =
        "Must be at least 3 characters long.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (
      formData.password.length < 6 ||
      !/[A-Z]/.test(formData.password) ||
      !/[0-9]/.test(formData.password)
    ) {
      newErrors.password =
        "Password must be at least 6 characters, with 1 uppercase letter and 1 number.";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
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

    try {
      setSubmitting(true);
      const response = await fetch(`${BASE_URL}/signup`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.message || "Registration failed. Try again.");
        return;
      }

      toast.success("Registration successful! Switching to login...");
      setTimeout(() => {
        navigate("/auth/");
      }, 2000);

      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      setErrors({});
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-body">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="auth-container">
        <div className="right-section">
          <h2>Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className={errors.username ? "error-input" : ""}
              required
            />
            {errors.username && <small className="error-text">{errors.username}</small>}

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
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? "error-input" : ""}
              required
            />
            {errors.password && <small className="error-text">{errors.password}</small>}

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={errors.confirmPassword ? "error-input" : ""}
              required
            />
            {errors.confirmPassword && (
              <small className="error-text">{errors.confirmPassword}</small>
            )}

            <button type="submit" disabled={submitting}>
              {submitting ? "Signing up..." : "Sign Up"}
            </button>
          </form>
{/* 
          <div className="social-icons">
            <img src={image1} alt="Facebook" />
            <img src={image2} alt="Google" />
            <img src={image3} alt="LinkedIn" />
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Signup;
