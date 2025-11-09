import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// ✅ You can modify these credentials here only
const LOGIN_CONFIG = {
  email: "intern@demo.com",
  password: "pass123",
};

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const navigate = useNavigate();

  // ✅ Realtime validation
  const validate = () => {
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return false;
    }
    if (password.trim().length < 6) {
      setError("Password must be at least 6 characters long.");
      return false;
    }
    setError("");
    return true;
  };

  // ✅ Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    setTimeout(() => {
      if (email === LOGIN_CONFIG.email && password === LOGIN_CONFIG.password) {
        localStorage.setItem("ir_user", JSON.stringify({ email }));
        if (remember) localStorage.setItem("remember_user", email);
        navigate("/resume");
      } else {
        setError("Incorrect email or password.");
        setLoading(false);
      }
    }, 1200);
  };

  // ✅ Autofill demo credentials
  const fillDemo = () => {
    setEmail(LOGIN_CONFIG.email);
    setPassword(LOGIN_CONFIG.password);
  };

  return (
    <main className="login-page">
      {/* Animated gradient background */}
      <div className="bg-animation"></div>

      <motion.form
        className="login-card glass-card"
        onSubmit={handleSubmit}
        aria-labelledby="loginHeading"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 id="loginHeading">Welcome 👋</h1>
        <p className="muted small">Please sign in to continue</p>

        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoFocus
        />

        <label htmlFor="password">Password</label>
        <div className="password-wrapper">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
          <button
            type="button"
            className="show-btn"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>

        <div className="login-options">
          <label className="remember">
            <input
              type="checkbox"
              checked={remember}
              onChange={() => setRemember(!remember)}
            />{" "}
            Remember Me
          </label>
          <button
            type="button"
            onClick={fillDemo}
            className="btn ghost small"
          >
            Fill Demo
          </button>
        </div>

        {error && (
          <motion.div
            className="error"
            role="alert"
            aria-live="assertive"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            ⚠️ {error}
          </motion.div>
        )}

        <motion.button
          type="submit"
          className="btn primary login-btn"
          whileTap={{ scale: 0.96 }}
          disabled={loading}
        >
          {loading ? "Signing in..." : "Sign in"}
        </motion.button>
      </motion.form>
    </main>
  );
}
