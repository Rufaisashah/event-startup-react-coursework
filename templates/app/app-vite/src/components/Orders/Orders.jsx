import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import api from "../../api.js";

export default function Orders() {
  const { user, token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
useEffect(() => {
  if (!user) {
    setOrders([]);
    setLoading(false);
    return;
  }

  setLoading(true);
  fetch(api("/orders"), {
    headers: { Authorization: `Bearer ${token}` },
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
   async function handleDeleteOrder(orderId) {
    if (!window.confirm("Remove this order?")) return;
    try {
      const res = await fetch(api(`/orders/${orderId}`), {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to delete order");
      setOrders((prev) => prev.filter((o) => o.id !== orderId));
    } catch (err) {
      alert(err.message);
    }
  }

  if (!user) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 px-6">
        <div className="text-5xl">🔒</div>
        <h1 className="text-2xl font-bold text-gray-900">My orders</h1>
        <p className="text-gray-500">You must be logged in to view your orders.</p>
        <Link
          to="/login"
          className="bg-gray-900 text-white px-6 py-3 rounded-xl 
                     font-semibold hover:bg-gray-700 transition-all"
        >
          Log in
        </Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-gray-400 text-lg animate-pulse">
          Loading orders...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 px-6">
        <div className="text-5xl">🎟</div>
        <h1 className="text-2xl font-bold text-gray-900">No orders yet</h1>
        <p className="text-gray-500">Browse events and grab your first ticket.</p>
        <Link
          to="/events"
          className="bg-gray-900 text-white px-6 py-3 rounded-xl 
                     font-semibold hover:bg-gray-700 transition-all"
        >
          Browse events
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My orders</h1>

      <div className="flex flex-col gap-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-2xl border border-gray-100 
                       shadow-sm hover:shadow-md transition-shadow duration-200 
                       overflow-hidden"
          >
            {/* Order header */}
            <div className="bg-gray-900 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-white font-bold text-sm">
                  Order #{order.id}
                </span>
                <span className="bg-green-400 text-green-900 text-xs 
                                 font-bold px-2 py-0.5 rounded-full">
                  Confirmed ✓
                </span>
              </div>
              <span className="text-gray-400 text-xs">
                {new Date(order.createdAt).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>

           
            <div className="px-6 py-4 flex flex-col gap-3">
              {order.items.map((item) => (
                <div
                  key={item.eventId}
                  className="flex items-center justify-between 
                             py-2 border-b border-gray-50 last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🎟</span>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        {item.eventName}
                      </p>
                      <p className="text-xs text-gray-400">
                        x{item.quantity} ticket{item.quantity > 1 ? "s" : ""}
                      </p>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-gray-900">
                    {item.price === 0
                      ? "Free"
                      : `€${item.price * item.quantity}`}
                  </span>
                </div>
              ))}
            </div>

            <div className="px-6 py-4 bg-gray-50 flex items-center justify-between">
              <span className="text-base font-bold text-gray-900">
                Total:{" "}
                {order.totalPrice === 0 ? "Free" : `€${order.totalPrice}`}
              </span>
              <div className="flex items-center gap-2">
    <button
      onClick={() => handleDeleteOrder(order.id)}
      className="text-red-500 border border-red-200 hover:bg-red-50 
                 px-3 py-2 rounded-xl text-sm font-semibold 
                 transition-all duration-200"
    >
      Remove
    </button>
              
              <Link
                to={`/orders/${order.id}`}
                className="bg-gray-900 text-white text-sm font-semibold
                           px-4 py-2 rounded-xl hover:bg-gray-700 
                           transition-all duration-200"
              >
                View details →
              </Link>
            </div>
          </div>
          </div>
        ))}
      </div>
    </div>
  );
}