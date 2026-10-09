import { Link } from "react-router-dom";
import { useState } from "react";
import {
  Search,
  MapPin,
  BedDouble,
  Bath,
  Maximize,
  ArrowUpRight,
  Menu,
  X,
  House,
  KeyRound,
} from "lucide-react";
import "./index.css";
import properties from "./data/properties";

function formatPrice(price) {
  return "₹" + price.toLocaleString("en-IN");
}

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="navbar">
      <a className="brand" href="#home">
        <span className="brand-icon">
          <House size={23} />
        </span>
        <span>
          Dream<span className="brand-light">Dwell</span>
        </span>
      </a>

      <button
        className="menu-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation"
      >
        {menuOpen ? <X /> : <Menu />}
      </button>

      <nav className={menuOpen ? "nav-links open" : "nav-links"}>
        <a href="#home" onClick={() => setMenuOpen(false)}>
          Home
        </a>
        <a href="#properties" onClick={() => setMenuOpen(false)}>
          Properties
        </a>
        <a href="#about" onClick={() => setMenuOpen(false)}>
          About
        </a>
        <Link to="/contact" onClick={() => setMenuOpen(false)}>
          Contact
        </Link>
        <Link to="/agents" onClick={() => setMenuOpen(false)}>
          Agents
        </Link>
        <Link
          className="login-link"
          to="/login"
          onClick={() => setMenuOpen(false)}
        >
          Log in
        </Link>
        <Link
          className="nav-button"
          to="/signup"
          onClick={() => setMenuOpen(false)}
        >
          Sign Up <ArrowUpRight size={16} />
        </Link>
      </nav>
    </header>
  );
}

function SearchBar({ onSearch }) {
  const [location, setLocation] = useState("");
  const [type, setType] = useState("All");
  const [maxPrice, setMaxPrice] = useState("Any");

  function submitSearch(event) {
    event.preventDefault();
    onSearch({ location, type, maxPrice });
    document.getElementById("properties")?.scrollIntoView({
      behavior: "smooth",
    });
  }

  return (
    <form className="search-panel" onSubmit={submitSearch}>
      <label className="search-field location-field">
        <span>Location</span>
        <span className="field-control">
          <MapPin size={18} />
          <input
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            placeholder="City or neighbourhood"
          />
        </span>
      </label>

      <label className="search-field">
        <span>Property type</span>
        <select value={type} onChange={(event) => setType(event.target.value)}>
          <option value="All">All properties</option>
          <option value="House">Houses</option>
          <option value="Apartment">Apartments</option>
        </select>
      </label>

      <label className="search-field">
        <span>Maximum budget</span>
        <select
          value={maxPrice}
          onChange={(event) => setMaxPrice(event.target.value)}
        >
          <option value="Any">Any price</option>
          <option value="8000000">₹80 lakh</option>
          <option value="13000000">₹1.3 crore</option>
          <option value="20000000">₹2 crore</option>
        </select>
      </label>

      <button className="search-button" type="submit">
        <Search size={18} /> Search
      </button>
    </form>
  );
}

function PropertyCard({ property }) {
  return (
    <article className="property-card">
      <div className="property-image-wrap">
        <img
          className="property-image"
          src={property.image}
          alt={property.name}
          loading="lazy"
        />
        <span className="property-tag">{property.tag}</span>
        <button
          className="favorite-button"
          aria-label={`Save ${property.name}`}
          onClick={() => alert(`${property.name} selected`)}
        >
          ♡
        </button>
      </div>

      <div className="property-info">
        <p className="property-location">
          <MapPin size={15} /> {property.location}
        </p>
        <h3>{property.name}</h3>
        <p className="property-price">{formatPrice(property.price)}</p>

        <div className="property-features">
          <span>
            <BedDouble size={17} /> {property.beds} Beds
          </span>
          <span>
            <Bath size={17} /> {property.baths} Baths
          </span>
          <span>
            <Maximize size={16} /> {property.area} sqft
          </span>
        </div>

        <Link className="details-link" to={`/properties/${property.id}`}>
          View property <ArrowUpRight size={17} />
        </Link>
      </div>
    </article>
  );
}

function App() {
  const [filters, setFilters] = useState({
    location: "",
    type: "All",
    maxPrice: "Any",
  });

  const filteredProperties = properties.filter((property) => {
    const matchesLocation = property.location
      .toLowerCase()
      .includes(filters.location.trim().toLowerCase());

    const matchesType =
      filters.type === "All" || property.type === filters.type;

    const matchesPrice =
      filters.maxPrice === "Any" || property.price <= Number(filters.maxPrice);

    return matchesLocation && matchesType && matchesPrice;
  });

  return (
    <>
      <Navbar />

      <main>
        <section className="hero" id="home">
          <div className="hero-overlay"></div>
          <div className="hero-content">
            <span className="eyebrow">
              <KeyRound size={15} /> YOUR NEXT CHAPTER STARTS HERE
            </span>
            <h1>
              Find a place
              <br />
              you'll <em>love</em> to call home.
            </h1>
            <p>
              Discover thoughtfully selected homes and spaces that bring you
              closer to the life you've imagined.
            </p>
            <Link to="/properties" className="hero-button">
              Explore properties <ArrowUpRight size={18} />
            </Link>
          </div>

          <div className="hero-note">
            <span className="hero-note-dot"></span>
            Find your place. Feel at home.
          </div>
        </section>

        <section className="search-section">
          <div className="section-intro">
            <span className="section-kicker">LET'S FIND YOUR PLACE</span>
            <h2>Your search starts here.</h2>
          </div>
          <SearchBar onSearch={setFilters} />
        </section>

        <section className="properties-section" id="properties">
          <div className="section-heading">
            <div>
              <span className="section-kicker">HANDPICKED FOR YOU</span>
              <h2>Homes worth coming home to.</h2>
              <p className="section-description">
                Explore spaces selected for comfort, character, and everyday
                living.
              </p>
            </div>

            <Link to="/properties" className="view-all">
              Explore all <ArrowUpRight size={17} />
            </Link>
          </div>

          <div className="property-grid">
            {filteredProperties.length > 0 ? (
              filteredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))
            ) : (
              <div className="empty-results">
                <Search size={30} />
                <h3>No matching properties found</h3>
                <p>Try another location, property type, or budget.</p>
                <button
                  className="reset-button"
                  onClick={() =>
                    setFilters({ location: "", type: "All", maxPrice: "Any" })
                  }
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </section>

        <section className="about-section" id="about">
          <div className="about-image">
            <img
              src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=85"
              alt="A warm and inviting modern home interior"
              loading="lazy"
            />
          </div>
          <div className="about-content">
            <span className="section-kicker">MORE THAN JUST A PROPERTY</span>
            <h2>Every home has a story. Let's find yours.</h2>
            <p>
              At DreamDwell, we believe finding a home should feel exciting,
              personal, and simple. We're here to help you discover a space
              where your next chapter can unfold.
            </p>
            <a href="#contact" className="dark-button">
              Get to know us <ArrowUpRight size={18} />
            </a>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <span className="section-kicker">LET'S MAKE IT HAPPEN</span>
          <h2>Your dream home could be one conversation away.</h2>
          <p>
            Have a question or want to arrange a viewing? We'd love to hear from
            you.
          </p>
          <a href="mailto:hello@dreamdwell.example" className="hero-button">
            Contact DreamDwell <ArrowUpRight size={18} />
          </a>
        </section>
      </main>

      <footer className="footer">
        <a className="brand footer-brand" href="#home">
          <span className="brand-icon">
            <House size={21} />
          </span>
          <span>
            Dream<span className="brand-light">Dwell</span>
          </span>
        </a>
        <p>Find your place. Feel at home.</p>
        <span className="footer-copy">
          © {new Date().getFullYear()} DreamDwell
        </span>
      </footer>
    </>
  );
}

export default App;
