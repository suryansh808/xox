import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import API from "../API";

const CommunityLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("com-user");
    if (user) {
      navigate("/CommunityDashboard", { replace: true });
    }
  }, [navigate]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    }
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    try {
      console.log("Sending login request:", formData);
      const response = await axios.post(`${API}/community-login`, {
        email: formData.email,
        password: formData.password,
      });

      if (response.status === 200 && response.data.success) {
        const userData = {
          userId: response.data.userId,
          name: response.data.name,
          email: response.data.email,
        };
      
        localStorage.setItem("com-user", JSON.stringify(userData));
        setFormData({ email: "", password: "" });
        setErrors({});
        navigate("/CommunityDashboard", { replace: true });
      } else {
        console.error("Login failed, response not successful:", response.data);
        setErrors({ server: response.data.message || "Login failed. Please try again." });
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrors({
        server:
          error.response?.data?.message ||
          "Failed to connect to the server. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShow) => !prevShow);
  };

  return (
    <div id="studentlogin">
      <div className="login-container">
        <div className="login-image-side"></div>
        <div className="login-form-wrapper">
          <div className="login-form-container">
            <Link to="/" className="login-back-link">
              <i className="fa fa-arrow-left" aria-hidden="true"></i>
            </Link>
            <h2 className="login-title">Welcome</h2>
            
            <form onSubmit={handleSubmit} className="login-form">
              <div className="login-input-wrapper">
                <label htmlFor="email" className="login-label">
                  Email
                </label>
                <input
                  className={`login-input peer ${errors.email ? "input-error" : ""}`}
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  aria-invalid={errors.email ? "true" : "false"}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && (
                  <p id="email-error" className="input-error-text">
                    {errors.email}
                  </p>
                )}
              </div>
              <div className="login-input-wrapper">
                <label htmlFor="password" className="login-label">
                  Password
                </label>
                <input
                  className={`login-input peer ${errors.password ? "input-error" : ""}`}
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  required
                  aria-invalid={errors.password ? "true" : "false"}
                  aria-describedby={errors.password ? "password-error" : undefined}
                />
                <span
                  onClick={handleTogglePasswordVisibility}
                  className="toggle-icon"
                  role="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <i className="fa fa-eye" aria-hidden="true"></i>
                  ) : (
                    <i className="fa fa-eye-slash" aria-hidden="true"></i>
                  )}
                </span>
                {errors.password && (
                  <p id="password-error" className="input-error-text">
                    {errors.password}
                  </p>
                )}
              </div>
              {errors.server && (
                <p className="input-error-text">{errors.server}</p>
              )}
              <button
                type="submit"
                className="login-button"
                disabled={isLoading}
              >
                {isLoading ? "Logging In..." : "Log In"}
              </button>
            </form>
            <div className="login-footer">
              Don't have an account?{" "}
              <Link className="login-signup-link" to="/CommunitySignup">
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityLogin;