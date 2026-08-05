import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [notes, setNotes] = useState<string>("");

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
      <div style={{ padding: "60px", textAlign: "center", color: "#333" }}>
        <div style={{ background: "white", padding: "40px", borderRadius: "20px", maxWidth: "500px", margin: "0 auto", boxShadow: "0 8px 16px rgba(0,0,0,0.1)" }}>
          <h2 style={{ color: "#77dd77", marginBottom: "15px" }}>🎉 Order Submitted Successfully!</h2>
          <p style={{ color: "#666" }}>Thank you for your order. Redirecting to home...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "40px", color: "#333", maxWidth: "600px", margin: "0 auto" }}>
      <div style={{ background: "white", padding: "30px", borderRadius: "20px", boxShadow: "0 8px 16px rgba(0,0,0,0.1)" }}>
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
          <Link to="/cart" style={{ color: "#666", textDecoration: "none", fontWeight: "bold" }}>&larr; Back to Cart</Link>
        </div>
      </div>
    </div>
  );
}