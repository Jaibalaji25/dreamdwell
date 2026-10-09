import { useState } from "react";
import { Link } from "react-router-dom";
import { House, Eye, EyeOff, ArrowRight } from "lucide-react";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setMessage("");

    if (!name.trim()) {
      setMessage("Please enter your full name.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email.trim())) {
      setMessage("Please enter a valid email address.");
      return;
    }

    if (password.length < 8) {
      setMessage("Password must contain at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match. Please try again.");
      return;
    }

    setMessage(
      "Form validation successful! Authentication is not connected yet.",
    );
  }

  return (
    <main className="auth-page">
      <section className="auth-visual">
        <Link to="/" className="auth-brand">
          <House size={25} />
          <span>
            Dream<span>Dwell</span>
          </span>
        </Link>

        <div className="auth-visual-content">
          <span className="section-kicker">YOUR JOURNEY STARTS HERE</span>
          <h1>A place to call yours is closer than you think.</h1>
          <p>
            Create your account to explore homes and take the next step toward
            your dream home.
          </p>
        </div>

        <p className="auth-visual-footer">Find your place. Feel at home.</p>
      </section>

      <section className="auth-form-side">
        <div className="auth-form-container">
          <Link to="/" className="auth-back-link">
            ← Back to home
          </Link>

          <span className="section-kicker">JOIN DREAMDWELL</span>
          <h2>Create your account</h2>
          <p className="auth-description">
            Fill in your details to get started.
          </p>

          <form className="auth-form" onSubmit={handleSubmit}>
            <label htmlFor="signup-name">Full name</label>
            <input
              id="signup-name"
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />

            <label htmlFor="signup-email">Email address</label>
            <input
              id="signup-email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />

            <label htmlFor="signup-password">Password</label>
            <div className="auth-password-field">
              <input
                id="signup-password"
                type={showPassword ? "text" : "password"}
                placeholder="At least 8 characters"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                minLength={8}
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
              </button>
            </div>

            <label htmlFor="signup-confirm-password">Confirm password</label>
            <div className="auth-password-field">
              <input
                id="signup-confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Enter your password again"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                aria-label={
                  showConfirmPassword ? "Hide password" : "Show password"
                }
              >
                {showConfirmPassword ? <EyeOff size={19} /> : <Eye size={19} />}
              </button>
            </div>

            <button className="auth-submit-button" type="submit">
              Create account <ArrowRight size={18} />
            </button>

            {message && <p className="auth-message">{message}</p>}
          </form>

          <p className="auth-switch">
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </div>
      </section>
    </main>
  );
}
