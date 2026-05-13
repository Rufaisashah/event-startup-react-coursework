import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import api from "../../api.js";

export default function OrderDetail() {
  const { id } = useParams();
  const { token } = useAuth();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(api(`/orders/${id}`), {
      headers: { Authorization: `Bearer ${token}` },
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

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-gray-400 text-lg animate-pulse">
          Loading order...
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

  if (!order) return null;

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">

      <Link
        to="/orders"
        className="inline-flex items-center gap-2 text-sm text-gray-500 
                   hover:text-gray-900 transition-colors mb-8"
      >
        ← Back to my orders
      </Link>

    
      <div className="bg-gray-900 rounded-2xl p-6 mb-6 text-white">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-bold">Order #{order.id}</h1>
          <span className="bg-green-400 text-green-900 text-xs font-bold 
                           px-3 py-1 rounded-full">
            Confirmed ✓
          </span>
        </div>
        <p className="text-gray-400 text-sm">
          Placed on{" "}
          {new Date(order.createdAt).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
      </div>

     
      <div className="bg-white rounded-2xl border border-gray-100 
                      shadow-sm overflow-hidden mb-6">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="font-bold text-gray-900">Your tickets</h2>
        </div>

        <div className="divide-y divide-gray-50">
          {order.items.map((item) => (
            <div
              key={item.eventId}
              className="px-6 py-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-indigo-100 rounded-xl 
                                flex items-center justify-center text-xl">
                  🎟
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">
                    {item.eventName}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {item.quantity} ticket{item.quantity > 1 ? "s" : ""} ·{" "}
                    {item.price === 0 ? "Free" : `€${item.price} each`}
                  </p>
                </div>
              </div>
              <span className="font-bold text-gray-900">
                {item.price === 0
                  ? "Free"
                  : `€${item.price * item.quantity}`}
              </span>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="px-6 py-4 bg-gray-50 flex items-center justify-between">
          <span className="font-bold text-gray-900">Total</span>
          <span className="text-xl font-bold text-gray-900">
            {order.totalPrice === 0 ? "Free" : `€${order.totalPrice}`}
          </span>
        </div>
      </div>

      <div className="flex gap-3">
        <Link
          to="/events"
          className="flex-1 text-center bg-gray-900 text-white py-3 
                     rounded-xl font-semibold hover:bg-gray-700 
                     transition-all duration-200"
        >
          Browse more events
        </Link>
        <Link
          to="/orders"
          className="flex-1 text-center border border-gray-200 text-gray-700 
                     py-3 rounded-xl font-semibold hover:bg-gray-50 
                     transition-all duration-200"
        >
          All orders
        </Link>
      </div>
    </div>
  );
}