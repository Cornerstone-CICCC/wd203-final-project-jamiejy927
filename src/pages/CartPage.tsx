import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();

  useEffect(() => {
    document.body.classList.add("cart-page-body");
    return () => {
      document.body.classList.remove("cart-page-body");
    };
  }, []);

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .cart-container {
            padding: 10px !important;
          }
          .cart-card {
            padding: 15px !important;
            border-radius: 15px !important;
          }
          .cart-item-row {
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 10px !important;
            padding: 12px 0 !important;
          }
          .cart-item-info {
            width: 100% !important;
          }
          .cart-btn-group {
            width: 100% !important;
            justify-content: space-between !important;
            margin-left: 0 !important;
            margin-top: 5px !important;
          }
          .cart-actions-row {
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 12px !important;
            margin-top: 15px !important;
          }
          .cart-action-buttons {
            display: flex !important;
            flex-direction: column !important;
            gap: 8px !important;
            width: 100% !important;
          }
          .cart-action-buttons a,
          .cart-action-buttons button {
            width: 100% !important;
            text-align: center !important;
            box-sizing: border-box !important;
          }
        }
      `}</style>
      <div className="cart-container" style={{ padding: "40px", color: "#333", maxWidth: "800px", margin: "0 auto", boxSizing: "border-box" }}>
        <h1 style={{ textAlign: "center", marginBottom: "25px" }}>Your Shopping Cart 🛒</h1>

        {cartItems.length === 0 ? (
          <div style={{ background: "white", padding: "40px", borderRadius: "20px", textAlign: "center", boxShadow: "0 6px 12px rgba(0,0,0,0.1)" }}>
            <p style={{ fontSize: "18px", marginBottom: "20px", color: "#666" }}>Your cart is empty!</p>
            <Link to="/items" style={{ padding: "10px 20px", background: "#ff7b9f", color: "white", textDecoration: "none", borderRadius: "15px", fontWeight: "bold" }}>
              Go to Menu &larr;
            </Link>
          </div>
        ) : (
          <div className="cart-card" style={{ background: "white", padding: "25px", borderRadius: "20px", boxShadow: "0 8px 16px rgba(0,0,0,0.1)", boxSizing: "border-box" }}>
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item-row" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #eee", padding: "15px 0" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "15px", minWidth: 0, flex: 1, width: "100%" }}>
                  {item.photo && (
                    <img src={item.photo} alt={item.name} style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "10px", flexShrink: 0 }} />
                  )}
                  <div className="cart-item-info" style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", minWidth: 0, flex: 1 }}>
                    <h3 style={{ margin: "0 0 5px 0", fontSize: "16px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", width: "100%", textAlign: "left" }}>{item.name}</h3>
                    <p style={{ margin: 0, color: "#e60012", fontWeight: "bold", textAlign: "left" }}>${item.price.toFixed(2)}</p>
                  </div>
                </div>

                <div className="cart-btn-group" style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0, marginLeft: "20px" }}>
                  <button onClick={() => updateQuantity(item.id, -1)} style={{ padding: "6px 12px", background: "#eee", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" }}>-</button>
                  <span style={{ fontWeight: "bold", width: "20px", textAlign: "center" }}>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)} style={{ padding: "6px 12px", background: "#eee", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" }}>+</button>
                  <button onClick={() => removeFromCart(item.id)} style={{ marginLeft: "15px", background: "#ff6961", color: "white", border: "none", padding: "6px 12px", borderRadius: "8px", cursor: "pointer" }}>Remove</button>
                </div>
              </div>
            ))}

            <div className="cart-actions-row" style={{ marginTop: "25px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h2 style={{ margin: 0, fontSize: "20px" }}>Total: <span style={{ color: "#e60012" }}>${totalPrice.toFixed(2)}</span></h2>
              
              <div className="cart-action-buttons" style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <button
                  onClick={() => clearCart()}
                  style={{ padding: "12px 20px", background: "#ff6961", color: "white", border: "none", borderRadius: "15px", fontWeight: "bold", fontSize: "15px", cursor: "pointer" }}
                >
                  Clear Cart 🗑️
                </button>
                <Link
                  to="/checkout"
                  style={{ padding: "12px 25px", background: "#73c2fb", color: "white", textDecoration: "none", borderRadius: "15px", fontWeight: "bold", fontSize: "16px", display: "inline-block", textAlign: "center" }}
                >
                  Checkout 💳
                </Link>
              </div>
            </div>
          </div>
        )}

        <div style={{ textAlign: "center", marginTop: "30px" }}>
          <Link to="/items" style={{ color: "#fff", background: "#333", padding: "10px 20px", borderRadius: "20px", textDecoration: "none", fontWeight: "bold" }}>&larr; Back to Menu</Link>
        </div>
      </div>
    </>
  );
}