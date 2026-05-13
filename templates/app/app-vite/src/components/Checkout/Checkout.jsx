import { Link } from "react-router-dom";
import "./Checkout.css";

export default function CheckoutSuccess() {
  return (
    <div className="checkout-success">
      <div className="success-icon">✓</div>
      <h1>Order confirmed!</h1>
      <p>Your tickets have been booked successfully.</p>
      <div className="checkout-actions">
        <Link to="/orders" className="btn-view-orders">
          View my orders
        </Link>
        <Link to="/events" className="btn-browse">
          Browse more events
        </Link>
      </div>
    </div>
  );
}