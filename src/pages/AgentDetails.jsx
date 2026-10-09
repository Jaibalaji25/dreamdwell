import { Link } from "react-router-dom";
import {
  MapPin,
  BedDouble,
  ArrowUpRight,
  Phone,
  MessageCircle,
} from "lucide-react";
import properties from "../data/properties";
import "../index.css";

export default function AgentDetails() {
  // Show each unique agent only once
  const agents = properties.filter(
    (property, index, list) =>
      list.findIndex((item) => item.agent === property.agent) === index,
  );

  return (
    <main className="agent-details-page">
      <section className="agents-heading">
        <span className="section-kicker">MEET OUR TEAM</span>
        <h1>Meet Our Property Agents</h1>
        <p>
          Connect with our trusted property consultants to find a home that
          suits your lifestyle.
        </p>
      </section>

      <section className="agents-grid">
        {agents.map((property) => (
          <article className="agent-profile" key={property.agent}>
            <div className="agent-profile-avatar">
              {property.agent.charAt(0)}
            </div>

            <span className="section-kicker">DREAMDWELL CONSULTANT</span>

            <h2>{property.agent}</h2>
            <p className="agent-profile-role">
              Real Estate Property Consultant
            </p>

            <div className="agent-profile-details">
              <div>
                <MapPin size={17} />
                <span>{property.location}</span>
              </div>

              <div>
                <BedDouble size={17} />
                <span>{property.beds} Bedrooms</span>
              </div>

              <div>
                <strong>Property:</strong>
                <span>{property.name}</span>
              </div>

              <div>
                <strong>Price:</strong>
                <span>₹{property.price.toLocaleString("en-IN")}</span>
              </div>
            </div>

            <div className="agent-profile-actions">
              <a
                className="agent-call-button"
                href={`tel:${property.phone.replace(/\s/g, "")}`}
              >
                <Phone size={16} /> Call Agent
              </a>

              <a
                className="agent-contact-button"
                href={`https://wa.me/${property.phone.replace(/\D/g, "")}`}
                target="_blank"
                rel="noreferrer"
              >
                <MessageCircle size={16} /> WhatsApp
              </a>
            </div>

            <Link className="dark-button" to={`/properties/${property.id}`}>
              View Property <ArrowUpRight size={17} />
            </Link>
          </article>
        ))}
      </section>
    </main>
  );
}
