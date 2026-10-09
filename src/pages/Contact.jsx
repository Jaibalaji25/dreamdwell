import { useState } from "react";
import { Link } from "react-router-dom";
import { House, ArrowRight } from "lucide-react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setStatus("");

    if (!form.name.trim()) {
      setStatus("Please enter your full name.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(form.email.trim())) {
      setStatus("Please enter a valid email address.");
      return;
    }

    if (!form.subject.trim() || !form.message.trim()) {
      setStatus("Please complete the subject and message fields.");
      return;
    }

    setStatus("Thank you! Your message has been validated.");
    setForm({ name: "", email: "", subject: "", message: "" });
  }

  return (
    <main className="contact-page">
      <header className="contact-header">
        <Link to="/" className="auth-brand">
          <House size={25} />
          <span>
            Dream<span>Dwell</span>
          </span>
        </Link>

        <Link to="/" className="contact-home-link">
          Back to Home
        </Link>
      </header>

      <section className="contact-content">
        <span className="section-kicker">WE'RE HERE TO HELP</span>
        <h1>Contact DreamDwell</h1>
        <p className="contact-intro">
          Have a question about a property? Send us a message. We'd love to help
          you find your dream home.
        </p>

        <form className="contact-form" onSubmit={handleSubmit}>
          <label htmlFor="contact-name">Full name</label>
          <input
            id="contact-name"
            name="name"
            type="text"
            placeholder="Enter your full name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <label htmlFor="contact-email">Email address</label>
          <input
            id="contact-email"
            name="email"
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="contact-subject">Subject</label>
          <input
            id="contact-subject"
            name="subject"
            type="text"
            placeholder="What would you like help with?"
            value={form.subject}
            onChange={handleChange}
            required
          />

          <label htmlFor="contact-message">Message</label>
          <textarea
            id="contact-message"
            name="message"
            placeholder="Write your message here..."
            rows={5}
            value={form.message}
            onChange={handleChange}
            required
          />

          <button type="submit" className="auth-submit-button">
            Send Message <ArrowRight size={18} />
          </button>

          {status && (
            <p className="auth-message" role="status">
              {status}
            </p>
          )}
        </form>
      </section>
    </main>
  );
}
