import { useState } from "react";
import { MapPin, BedDouble, Bath, Maximize, Search } from "lucide-react";
import properties from "../data/properties";

export default function Properties() {
  const [location, setLocation] = useState("");
  const [type, setType] = useState("All");
  const [maxPrice, setMaxPrice] = useState("Any");

  const filtered = properties.filter((property) => {
    const matchesLocation = property.location
      .toLowerCase()
      .includes(location.trim().toLowerCase());

    const matchesType = type === "All" || property.type === type;

    const matchesPrice =
      maxPrice === "Any" || property.price <= Number(maxPrice);

    return matchesLocation && matchesType && matchesPrice;
  });

  return (
    <main className="listing-page">
      <div className="listing-heading">
        <span className="section-kicker">DISCOVER YOUR NEXT HOME</span>
        <h1>Explore Properties</h1>
        <p>Find a home that fits your lifestyle and budget.</p>
      </div>

      <div className="listing-filters">
        <label>
          Location
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Search Chennai, Adyar..."
          />
        </label>

        <label>
          Property Type
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="All">All properties</option>
            <option value="House">House</option>
            <option value="Apartment">Apartment</option>
          </select>
        </label>

        <label>
          Maximum Budget
          <select
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          >
            <option value="Any">Any price</option>
            <option value="8000000">₹80 lakh</option>
            <option value="13000000">₹1.3 crore</option>
            <option value="20000000">₹2 crore</option>
          </select>
        </label>
      </div>

      <p className="results-count">{filtered.length} properties found</p>

      <div className="property-grid">
        {filtered.map((property) => (
          <article className="property-card" key={property.id}>
            <div className="property-image-wrap">
              <img
                className="property-image"
                src={property.image}
                alt={property.name}
              />
              <span className="property-tag">{property.tag}</span>
            </div>

            <div className="property-info">
              <p className="property-location">
                <MapPin size={15} /> {property.location}
              </p>
              <h3>{property.name}</h3>
              <p className="property-price">
                ₹{property.price.toLocaleString("en-IN")}
              </p>

              <div className="property-features">
                <span>
                  <BedDouble size={16} /> {property.beds} Beds
                </span>
                <span>
                  <Bath size={16} /> {property.baths} Baths
                </span>
                <span>
                  <Maximize size={16} /> {property.area} sqft
                </span>
              </div>

              <a className="details-link" href={`/properties/${property.id}`}>
                View details →
              </a>
            </div>
          </article>
        ))}

        {filtered.length === 0 && (
          <div className="empty-results">
            <Search size={28} />
            <h3>No properties found</h3>
            <p>Try changing your search filters.</p>
          </div>
        )}
      </div>
    </main>
  );
}
