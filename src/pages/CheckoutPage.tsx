import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [notes, setNotes] = useState<string>("");

  if (cartItems.length === 0 && !submitted) {
    return (
      <div style={{ padding: "60px 15px", textAlign: "center", color: "#333", boxSizing: "border-box" }}>
        <div style={{ background: "white", padding: "40px", borderRadius: "20px", maxWidth: "500px", margin: "0 auto", boxShadow: "0 8px 16px rgba(0,0,0,0.1)", boxSizing: "border-box" }}>
          <h2 style={{ color: "#e60012", marginBottom: "15px" }}>🛒 Your cart is empty!</h2>
          <p style={{ color: "#666", marginBottom: "20px" }}>
            Please add items to your cart before checking out.
          </p>
          <Link to="/items" style={{ padding: "10px 20px", background: "#ff7b9f", color: "white", textDecoration: "none", borderRadius: "15px", fontWeight: "bold", display: "inline-block" }}>
            Go to Menu ☕
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    clearCart();
    setSubmitted(true);
    setTimeout(() => {
      navigate("/");
    }, 3000);
  };

  if (submitted) {
    return (
      <div style={{ padding: "60px 15px", textAlign: "center", color: "#333", boxSizing: "border-box" }}>
        <div style={{ background: "white", padding: "40px", borderRadius: "20px", maxWidth: "500px", margin: "0 auto", boxShadow: "0 8px 16px rgba(0,0,0,0.1)", boxSizing: "border-box" }}>
          <h2 style={{ color: "#77dd77", marginBottom: "15px" }}>🎉 Order Submitted Successfully!</h2>
          <p style={{ color: "#666" }}>Thank you for your order. Redirecting to home...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .checkout-container {
            padding: 15px !important;
          }
          .checkout-card {
            padding: 20px !important;
          }
        }
      `}</style>
      <div className="checkout-container" style={{ padding: "40px", color: "#333", maxWidth: "600px", margin: "0 auto", boxSizing: "border-box" }}>
        <div className="checkout-card" style={{ background: "white", padding: "30px", borderRadius: "20px", boxShadow: "0 8px 16px rgba(0,0,0,0.1)", boxSizing: "border-box" }}>
          <h1 style={{ textAlign: "center", marginBottom: "25px" }}>Checkout 💳</h1>
          
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div>
              <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>Name</label>
              <input type="text" required style={{ width: "100%", padding: "10px", borderRadius: "10px", border: "1px solid #ccc", boxSizing: "border-box" }} />
            </div>

            <div>
              <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>Email</label>
              <input type="email" required style={{ width: "100%", padding: "10px", borderRadius: "10px", border: "1px solid #ccc", boxSizing: "border-box" }} />
            </div>

            <div>
              <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>Address</label>
              <input type="text" required style={{ width: "100%", padding: "10px", borderRadius: "10px", border: "1px solid #ccc", boxSizing: "border-box" }} />
            </div>

            <div>
              <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>Order Notes (Optional)</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Less sweet, extra ice..."
                style={{ width: "100%", padding: "10px", borderRadius: "10px", border: "1px solid #ccc", boxSizing: "border-box", height: "80px", resize: "vertical" }}
              />
            </div>

            <button
              type="submit"
              style={{ padding: "12px", background: "#73c2fb", color: "white", border: "none", borderRadius: "15px", fontWeight: "bold", cursor: "pointer", fontSize: "16px", marginTop: "10px" }}
            >
              Complete Order
            </button>
          </form>

          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <Link to="/items" style={{ color: "#666", textDecoration: "none", fontWeight: "bold" }}>&larr; Back to Menu</Link>
          </div>
        </div>
      </div>
    </>
  );
}