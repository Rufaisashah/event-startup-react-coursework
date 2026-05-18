import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext(null);


const CART_STORAGE_KEY = "cart";

export function CartProvider({ children }) {
  
  const [cartItems, setCartItems] = useState(() => {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  function addToCart(event, quantity) {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.eventId === event.id);
      if (existing) {
        
        return prev.map((item) =>
          item.eventId === event.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }
      
      return [
        ...prev,
        {
          eventId: event.id,
          eventName: event.name,
          price: event.price,
          quantity,
          ticketsAvailable: event.ticketsAvailable,
        },
      ];
    });
  }

  function removeFromCart(eventId) {
    setCartItems((prev) =>
      prev.filter((item) => item.eventId !== eventId)
    );
  }

  function updateQuantity(eventId, quantity) {
    if (quantity < 1) return;
    setCartItems((prev) =>
      prev.map((item) =>
        item.eventId === eventId ? { ...item, quantity } : item,
      ),
    );
  }

  function clearCart() {
    setCartItems([]);
  }

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const totalItems = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalPrice,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}