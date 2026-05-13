import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import api from "../../api.js";
import "./Orders.css";

export default function Orders() {
  const { user, token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) return;

    fetch(api("/orders"), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load orders");
        return res.json();
      })
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [user, token]);

  if (!user) {
    return (
      <div className="orders-auth">
        <h1>My orders</h1>
        <p>You must be logged in to view your orders.</p>
        <Link to="/login" className="btn-login-redirect">
          Log in
        </Link>
      </div>
    );
  }

  if (loading) return <p className="status-message">Loading orders...</p>;
  if (error) return <p className="status-message error">{error}</p>;

  if (orders.length === 0) {
    return (
      <div className="orders-empty">
        <h1>My orders</h1>
        <p>You haven't placed any orders yet.</p>
        <Link to="/events" className="btn-browse">
          Browse events
        </Link>
      </div>
    );
  }

  return (
    <div className="orders-container">
      <h1 className="orders-title">My orders</h1>

      <div className="orders-list">
        {orders.map((order) => (
          <div key={order.id} className="order-card">
            <div className="order-card-header">
              <span className="order-id">Order #{order.id}</span>
              <span className="order-date">
                {new Date(order.createdAt).toLocaleDateString()}
              </span>
            </div>

            <div className="order-items">
              {order.items.map((item) => (
                <div key={item.eventId} className="order-item">
                  <span className="order-item-name">{item.eventName}</span>
                  <span className="order-item-qty">x{item.quantity}</span>
                  <span className="order-item-price">
                    {item.price === 0 ? "Free" : `€${item.price * item.quantity}`}
                  </span>
                </div>
              ))}
            </div>

            <div className="order-card-footer">
              <span className="order-total">
                Total: {order.totalPrice === 0 ? "Free" : `€${order.totalPrice}`}
              </span>
              <Link to={`/orders/${order.id}`} className="btn-view-order">
                View details →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}