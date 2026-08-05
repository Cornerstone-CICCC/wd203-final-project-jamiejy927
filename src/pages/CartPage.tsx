import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div style={{ padding: "40px", color: "#333", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center", marginBottom: "25px" }}>Your Shopping Cart 🛒</h1>

      {cartItems.length === 0 ? (
        <div style={{ background: "white", padding: "40px", borderRadius: "20px", textAlign: "center", boxShadow: "0 6px 12px rgba(0,0,0,0.1)" }}>
          <p style={{ fontSize: "18px", marginBottom: "20px", color: "#666" }}>Your cart is empty!</p>
          <Link to="/items" style={{ padding: "10px 20px", background: "#ff7b9f", color: "white", textDecoration: "none", borderRadius: "15px", fontWeight: "bold" }}>
            Go to Menu &larr;
          </Link>
        </div>
      ) : (
        <div style={{ background: "white", padding: "25px", borderRadius: "20px", boxShadow: "0 8px 16px rgba(0,0,0,0.1)" }}>
          {cartItems.map((item) => (
            <div key={item.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #eee", padding: "15px 0" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "15px", minWidth: 0, flex: 1 }}>
                {item.photo && (
                  <img src={item.photo} alt={item.name} style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "10px", flexShrink: 0 }} />
                )}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", minWidth: 0, flex: 1 }}>
                  <h3 style={{ margin: "0 0 5px 0", fontSize: "16px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", width: "100%", textAlign: "left" }}>{item.name}</h3>
                  <p style={{ margin: 0, color: "#e60012", fontWeight: "bold", textAlign: "left" }}>${item.price.toFixed(2)}</p>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0, marginLeft: "20px" }}>
                <button onClick={() => updateQuantity(item.id, -1)} style={{ padding: "4px 10px", background: "#eee", border: "none", borderRadius: "6px", cursor: "pointer" }}>-</button>
                <span style={{ fontWeight: "bold", width: "20px", textAlign: "center" }}>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, 1)} style={{ padding: "4px 10px", background: "#eee", border: "none", borderRadius: "6px", cursor: "pointer" }}>+</button>
                <button onClick={() => removeFromCart(item.id)} style={{ marginLeft: "15px", background: "#ff6961", color: "white", border: "none", padding: "6px 12px", borderRadius: "8px", cursor: "pointer" }}>Remove</button>
              </div>
            </div>
          ))}

          <div style={{ marginTop: "25px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h2 style={{ margin: 0, fontSize: "20px" }}>Total: <span style={{ color: "#e60012" }}>${totalPrice.toFixed(2)}</span></h2>
            <Link
              to="/checkout"
              style={{ padding: "12px 25px", background: "#73c2fb", color: "white", textDecoration: "none", borderRadius: "15px", fontWeight: "bold", fontSize: "16px", display: "inline-block" }}
            >
              Checkout 💳
            </Link>
          </div>
        </div>
      )}

      <div style={{ textAlign: "center", marginTop: "30px" }}>
        <Link to="/items" style={{ color: "#fff", background: "#333", padding: "10px 20px", borderRadius: "20px", textDecoration: "none", fontWeight: "bold" }}>&larr; Back to Menu</Link>
      </div>
    </div>
  );
}