import React from "react";
import ReactDOM from "react-dom/client";

import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useParams,
} from "react-router-dom";

import App from "./App";
import Navbar from "./components/Navbar";
import Properties from "./pages/Properties";
import properties from "./data/properties";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Contact from "./pages/Contact";
import AgentDetails from "./pages/AgentDetails";
import "./index.css";

function PropertyDetails() {
  const { id } = useParams();

  const property = properties.find((item) => item.id === Number(id));

  if (!property) {
    return (
      <main className="details-page">
        <h1>Property not found</h1>
        <Link to="/properties">← Back to properties</Link>
      </main>
    );
  }

  return (
    <main className="details-page">
      <Link to="/properties" className="back-link">
        ← Back to properties
      </Link>

      <div className="details-heading">
        <div>
          <p className="property-location">📍 {property.location}</p>
          <h1>{property.name}</h1>
          <p className="details-subtitle">
            Find your place. Begin your next chapter.
          </p>
        </div>

        <div className="details-price">
          ₹{property.price.toLocaleString("en-IN")}
        </div>
      </div>

      <img
        className="details-main-image"
        src={property.image}
        alt={property.name}
        onError={(event) => {
          event.currentTarget.style.display = "none";
        }}
      />

      <div className="details-layout">
        <section className="details-content">
          <div className="details-features">
            <div>
              <strong>{property.beds}</strong>
              <span>Bedrooms</span>
            </div>
            <div>
              <strong>{property.baths}</strong>
              <span>Bathrooms</span>
            </div>
            <div>
              <strong>{property.area.toLocaleString("en-IN")}</strong>
              <span>Sq. ft.</span>
            </div>
            <div>
              <strong>{property.type}</strong>
              <span>Property type</span>
            </div>
          </div>

          <h2>About this property</h2>
          <p className="details-description">{property.description}</p>

          <h2>Property highlights</h2>
          <ul className="details-highlights">
            <li>Comfortable and spacious living areas</li>
            <li>Located in {property.location}</li>
            <li>Suitable for modern living</li>
          </ul>
        </section>

        <aside className="agent-card">
          <span className="agent-label">PROPERTY CONTACT</span>
          <div className="agent-avatar">{property.agent.charAt(0)}</div>
          <h2>{property.agent}</h2>
          <p>DreamDwell Property Consultant</p>

          <a
            className="agent-call-button"
            href={`tel:${property.phone.replace(/\s/g, "")}`}
          >
            📞 Call Agent
          </a>

          <a
            className="agent-contact-button"
            href={`https://wa.me/${property.phone.replace(/\D/g, "")}`}
            target="_blank"
            rel="noreferrer"
          >
            Message on WhatsApp
          </a>

          <Link to={`/agents/${property.id}`} className="details-link">
            View Agent Details →
          </Link>
        </aside>
      </div>
    </main>
  );
}

function SimplePage({ title, description }) {
  return (
    <main className="listing-page">
      <span className="section-kicker">DREAMDWELL</span>
      <h1>{title}</h1>
      <p>{description}</p>
      <Link className="dark-button" to="/properties">
        Explore properties
      </Link>
    </main>
  );
}

function PropertiesLayout() {
  return (
    <>
      <Navbar />
      <Properties />
    </>
  );
}

function DetailsLayout() {
  return (
    <>
      <Navbar />
      <PropertyDetails />
    </>
  );
}

function SimpleLayout({ title, description }) {
  return (
    <>
      <Navbar />
      <SimplePage title={title} description={description} />
    </>
  );
}

function Root() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/properties" element={<PropertiesLayout />} />
        <Route path="/properties/:id" element={<DetailsLayout />} />

        <Route
          path="/agents"
          element={
            <>
              <Navbar />
              <AgentDetails />
            </>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/contact" element={<Contact />} />

        <Route
          path="*"
          element={
            <SimpleLayout
              title="Page Not Found"
              description="The page you're looking for doesn't exist."
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
);
