import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import "./Login.css";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [fieldErrors, setFieldErrors] = useState({});

  const [apiError, setApiError] = useState(null);

  const [submitting, setSubmitting] = useState(false);

  function validate() {
    const errors = {};
    if (!email.trim()) errors.email = "Email is required";
    else if (!email.includes("@")) errors.email = "Enter a valid email";
    if (!password) errors.password = "Password is required";
    else if (password.length < 4)
      errors.password = "Password must be at least 4 characters";
    return errors;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setApiError(null);

    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setSubmitting(true);
    try {
      await login(email, password);
      navigate("/events");
    } catch (err) {
      setApiError(err.message || "Login failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="auth-container">
      <h1 className="auth-title">Log in</h1>

      {apiError && <p className="auth-error">{apiError}</p>}

      <form onSubmit={handleSubmit} noValidate>
        <div className="auth-field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setFieldErrors((prev) => ({ ...prev, email: null }));
            }}
            className={fieldErrors.email ? "input-error" : ""}
            placeholder="you@example.com"
          />
          {fieldErrors.email && (
            <span className="field-error">{fieldErrors.email}</span>
          )}
        </div>

        <div className="auth-field" style={{ marginTop: "16px" }}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setFieldErrors((prev) => ({ ...prev, password: null }));
            }}
            className={fieldErrors.password ? "input-error" : ""}
            placeholder="••••••••"
          />
          {fieldErrors.password && (
            <span className="field-error">{fieldErrors.password}</span>
          )}
        </div>

        <button
          type="submit"
          className="auth-submit"
          disabled={submitting}
          style={{ marginTop: "24px" }}
        >
          {submitting ? "Logging in..." : "Log in"}
        </button>
      </form>

      <p className="auth-footer">
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}
