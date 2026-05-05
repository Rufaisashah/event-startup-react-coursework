import { useCart } from "../../context/CartContext.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { Link } from "react-router-dom";
import "./Cart.css";

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, totalPrice, clearCart } =
    useCart();
  const { user } = useAuth();

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty">
        <h1>Your cart is empty</h1>
        <p>Browse events and add tickets to get started.</p>
        <Link to="/events" className="btn-browse">
          Browse events
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h1 className="cart-title">Your cart</h1>

      <div className="cart-items">
        {cartItems.map((item) => (
          <div key={item.eventId} className="cart-item">
            <div className="cart-item-info">
              <h2 className="cart-item-name">{item.eventName}</h2>
              <p className="cart-item-price">
                {item.price === 0 ? "Free" : `€${item.price} per ticket`}
              </p>
            </div>

            <div className="cart-item-controls">
              <button
                aria-label="Decrease quantity"
                onClick={() => updateQuantity(item.eventId, item.quantity - 1)}
                disabled={item.quantity <= 1}
              >
                −
              </button>
              <span>{item.quantity}</span>
              <button
                aria-label="Increase quantity"
                onClick={() => updateQuantity(item.eventId, item.quantity + 1)}
                disabled={item.quantity >= item.ticketsAvailable}
              >
                +
              </button>
            </div>

            <p className="cart-item-subtotal">
              {item.price === 0
                ? "Free"
                : `€${item.price * item.quantity}`}
            </p>

            <button
              className="cart-item-remove"
              onClick={() => removeFromCart(item.eventId)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <p className="cart-total">
          Total: {totalPrice === 0 ? "Free" : `€${totalPrice}`}
        </p>

        {user ? (
          <button className="btn-checkout">
            Proceed to checkout
          </button>
        ) : (
          <div className="cart-auth-message">
            <p>You must be logged in to checkout.</p>
            <Link to="/login" className="btn-login-redirect">
              Log in to continue
            </Link>
          </div>
        )}

        <button className="btn-clear-cart" onClick={clearCart}>
          Clear cart
        </button>
      </div>
    </div>
  );
}