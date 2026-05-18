import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../api.js";
import "./EventDetail.css";

export default function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setLoading(true);
    fetch(api(`/events/${id}`))
      .then((res) => {
        if (!res.ok) throw new Error("Event not found");
        return res.json();
      })
      .then((data) => {
        setEvent(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="status-message">Loading event...</p>;
  if (error) return <p className="status-message error">{error}</p>;
  if (!event) return null;

  const isFree = event.price === 0;

  return (
    <div className="event-detail">
      <Link to="/events" className="back-link">
        ← Back to all events
      </Link>

      <span className="event-category">{event.category}</span>

      <h1 className="event-detail-title">{event.name}</h1>

      <div className="event-detail-meta">
        <div className="meta-item">
          <span className="meta-label">Date</span>
          <span className="meta-value">{event.date}</span>
        </div>
        <div className="meta-item">
          <span className="meta-label">Time</span>
          <span className="meta-value">{event.time}</span>
        </div>
        <div className="meta-item">
          <span className="meta-label">Venue</span>
          <span className="meta-value">{event.venue}</span>
        </div>
        <div className="meta-item">
          <span className="meta-label">City</span>
          <span className="meta-value">{event.city}</span>
        </div>
        <div className="meta-item">
          <span className="meta-label">Price</span>
          <span className="meta-value">
            {isFree ? "Free" : `€${event.price}`}
          </span>
        </div>
        <div className="meta-item">
          <span className="meta-label">Availability</span>
          <span
            className={`meta-value ${
              event.ticketsAvailable === 0 ? "sold-out" : "available"
            }`}
          >
            {event.ticketsAvailable === 0
              ? "Sold out"
              : `${event.ticketsAvailable} ticket${
                  event.ticketsAvailable === 1 ? "" : "s"
                } left`}
          </span>
        </div>
      </div>

      <div className="event-description">
        <h2>About this event</h2>
        <p>{event.description}</p>
      </div>

      {event.ticketsAvailable > 0 && (
        <div className="ticket-selector">
          <h2>Get tickets</h2>
          <div className="quantity-control">
            <button
              aria-label="Decrease quantity"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              disabled={quantity <= 1}
            >
              −
            </button>
            <span className="quantity-value">{quantity}</span>
            <button
              aria-label="Increase quantity"
              onClick={() =>
                setQuantity((q) => Math.min(event.ticketsAvailable, q + 1))
              }
              disabled={quantity >= event.ticketsAvailable}
            >
              +
            </button>
          </div>
          <p className="quantity-total">
            Total: {isFree ? "Free" : `€${event.price * quantity}`}
          </p>
          <button className="btn-add-to-cart">
            Add {quantity} ticket{quantity === 1 ? "" : "s"} to cart
          </button>
        </div>
      )}
    </div>
  );
}