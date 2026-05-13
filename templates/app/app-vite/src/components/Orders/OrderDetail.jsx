import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import api from "../../api.js";
import "./Orders.css";

export default function OrderDetail() {
  const { id } = useParams();
  const { token } = useAuth();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(api(`/orders/${id}`), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Order not found");
        return res.json();
      })
      .then((data) => {
        setOrder(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id, token]);

  if (loading) return <p className="status-message">Loading order...</p>;
  if (error) return <p className="status-message error">{error}</p>;
  if (!order) return null;

  return (
    <div className="orders-container">
      <Link to="/orders" className="back-link">
        ← Back to my orders
      </Link>

      <h1 className="orders-title">Order #{order.id}</h1>

      <p className="order-date">
        Placed on {new Date(order.createdAt).toLocaleDateString()}
      </p>

      <div className="order-card">
        <div className="order-items">
          {order.items.map((item) => (
            <div key={item.eventId} className="order-item">
              <span className="order-item-name">{item.eventName}</span>
              <span className="order-item-qty">x{item.quantity}</span>
              <span className="order-item-price">
                {item.price === 0
                  ? "Free"
                  : `€${item.price * item.quantity}`}
              </span>
            </div>
          ))}
        </div>

        <div className="order-card-footer">
          <span className="order-total">
            Total:{" "}
            {order.totalPrice === 0 ? "Free" : `€${order.totalPrice}`}
          </span>
        </div>
      </div>
    </div>
  );
}