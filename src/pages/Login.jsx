import { useState } from "react";
import { Link } from "react-router-dom";
import { House, Eye, EyeOff, ArrowRight } from "lucide-react";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setMessage("");

    if (!email.trim() || !password.trim()) {
      setMessage("Please enter your email and password.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email.trim())) {
      setMessage("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setMessage("Password must be at least 6 characters long.");
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
          <span className="section-kicker">WELCOME HOME</span>
          <h1>Your next chapter starts with the right place.</h1>
          <p>
            Discover places you'll love and make your next move with confidence.
          </p>
        </div>

        <p className="auth-visual-footer">Find your place. Feel at home.</p>
      </section>

      <section className="auth-form-side">
        <div className="auth-form-container">
          <Link to="/" className="auth-back-link">
            ← Back to home
          </Link>

          <span className="section-kicker">WELCOME BACK</span>
          <h2>Log in to DreamDwell</h2>
          <p className="auth-description">Enter your details to continue.</p>

          <form className="auth-form" onSubmit={handleSubmit}>
            <label htmlFor="login-email">Email address</label>
            <input
              id="login-email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />

            <label htmlFor="login-password">Password</label>
            <div className="auth-password-field">
              <input
                id="login-password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
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

            <button className="auth-submit-button" type="submit">
              Log in <ArrowRight size={18} />
            </button>

            {message && <p className="auth-message">{message}</p>}
          </form>

          <p className="auth-switch">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </div>
      </section>
    </main>
  );
}
