import { useState } from "react";
import { House, Menu, X, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="navbar">
      <Link className="brand" to="/" onClick={closeMenu}>
        <span className="brand-icon">
          <House size={23} />
        </span>
        <span>
          Dream<span className="brand-light">Dwell</span>
        </span>
      </Link>

      <button
        className="menu-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation"
      >
        {menuOpen ? <X /> : <Menu />}
      </button>

      <nav className={menuOpen ? "nav-links open" : "nav-links"}>
        <Link to="/" onClick={closeMenu}>
          Home
        </Link>
        <Link to="/properties" onClick={closeMenu}>
          Properties
        </Link>
        <Link to="/#about" onClick={closeMenu}>
          About
        </Link>
        <Link to="/contact" onClick={closeMenu}>
          Contact
        </Link>
        <Link className="login-link" to="/login" onClick={closeMenu}>
          Log in
        </Link>
        <Link className="nav-button" to="/signup" onClick={closeMenu}>
          Sign Up <ArrowUpRight size={16} />
        </Link>
      </nav>
    </header>
  );
}
