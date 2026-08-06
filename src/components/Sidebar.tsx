import { useState } from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();
  const [isOpen, setIsOpen] = useState(true);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: "fixed",
          top: "20px",
          right: isOpen ? "310px" : "20px",
          zIndex: 1100,
          background: "#ff7b9f",
          color: "white",
          border: "none",
          padding: "10px 15px",
          borderRadius: "20px",
          cursor: "pointer",
          fontWeight: "bold",
          boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
          transition: "right 0.3s ease"
        }}
      >
        {isOpen ? "Close Cart ✕" : `Cart 🛒 (${cartItems.reduce((sum, i) => sum + i.quantity, 0)})`}
      </button>

      <div style={{
        position: "fixed",
        top: 0,
        right: isOpen ? 0 : "-320px",
        width: "300px",
        height: "100vh",
        background: "#ffffff",
        boxShadow: "-4px 0 15px rgba(0,0,0,0.1)",
        padding: "20px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        zIndex: 1000,
        color: "#333",
        transition: "right 0.3s ease"
      }}>
        <h2 style={{ fontSize: "20px", marginBottom: "15px", textAlign: "center", borderBottom: "2px solid #ff7b9f", paddingBottom: "10px", marginTop: "10px" }}>
          🛒 Cart Sidebar
        </h2>

        <div style={{ flex: 1, overflowY: "auto", marginBottom: "15px" }}>
          {cartItems.length === 0 ? (
            <p style={{ textAlign: "center", color: "#888", marginTop: "40px" }}>Your cart is empty.</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px", borderBottom: "1px solid #eee", paddingBottom: "10px", gap: "8px" }}>
                {item.photo && (
                  <img src={item.photo} alt={item.name} style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "6px", border: "1px solid #ddd" }} />
                )}

                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ margin: "0 0 3px 0", fontSize: "14px", fontWeight: "bold", wordBreak: "normal", overflowWrap: "break-word" }}>{item.name}</p>
                  <p style={{ margin: 0, fontSize: "13px", color: "#e60012", fontWeight: "bold" }}>${item.price.toFixed(2)}</p>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  <button onClick={() => updateQuantity(item.id, -1)} style={{ padding: "3px 7px", background: "#eee", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "13px", fontWeight: "bold" }}>-</button>
                  <span style={{ fontSize: "14px", fontWeight: "bold", width: "16px", textAlign: "center" }}>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)} style={{ padding: "3px 7px", background: "#eee", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "13px", fontWeight: "bold" }}>+</button>
                  <button onClick={() => removeFromCart(item.id)} style={{ background: "#ff6961", color: "white", border: "none", padding: "3px 6px", borderRadius: "4px", cursor: "pointer", fontSize: "11px", fontWeight: "bold" }}>X</button>
                </div>
              </div>
            ))
          )}
        </div>

        <div style={{ borderTop: "1px solid #ddd", paddingTop: "15px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px", fontWeight: "bold", fontSize: "16px" }}>
            <span>Total:</span>
            <span style={{ color: "#e60012" }}>${totalPrice.toFixed(2)}</span>
          </div>

          <div style={{ display: "flex", gap: "6px", marginBottom: "8px" }}>
            <button
              onClick={() => clearCart()}
              style={{
                flex: 1,
                padding: "10px 8px",
                background: "#ff6961",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontSize: "13px",
                fontWeight: "bold",
                cursor: "pointer"
              }}
            >
              Clear Cart 🗑️
            </button>
            
            <Link
              to="/checkout"
              style={{
                flex: 1,
                display: "block",
                textAlign: "center",
                padding: "10px 8px",
                background: "#73c2fb",
                color: "white",
                textDecoration: "none",
                borderRadius: "8px",
                fontWeight: "bold",
                fontSize: "13px",
                lineHeight: "1.4"
              }}
            >
              Checkout 💳
            </Link>
          </div>

          <Link
            to="/cart"
            onClick={() => setIsOpen(false)}
            style={{
              display: "block",
              textAlign: "center",
              padding: "10px 8px",
              background: "#ff7b9f",
              color: "white",
              textDecoration: "none",
              borderRadius: "8px",
              fontSize: "13px",
              fontWeight: "bold"
            }}
          >
            View Full Cart Page &rarr;
          </Link>
        </div>
      </div>
    </>
  );
}