import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ItemsPage from "./pages/ItemsPage";
import ItemDetailPage from "./pages/ItemDetailPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import Sidebar from "./components/Sidebar";
import { CartProvider } from "./context/CartContext";
import "./App.css";
import { FavoritesProvider } from "./context/FavoritesContext";
import FavoritesPage from "./pages/FavoritesPage";
import productsData from "../public/products.json";

function App() {
  const [featuredItem, setFeaturedItem] = useState<any>(null);

  useEffect(() => {
    const list = Array.isArray(productsData) 
      ? productsData 
      : (productsData as any).products || [];

    if (list.length > 0) {
      const randomIndex = Math.floor(Math.random() * list.length);
      setFeaturedItem(list[randomIndex]);
    }
  }, []);

  return (
    <FavoritesProvider>
    <CartProvider>
      <Router>
        <div className="app" style={{ width: "100%", minHeight: "100vh", position: "relative", overflowX: "hidden" }}>
          <nav style={{ display: "flex", justifyContent: "flex-start", padding: "20px 40px", background: "transparent" }}>
            <Link to="/" style={{ padding: "8px 16px", background: "#73c2fb", color: "white", borderRadius: "20px", textDecoration: "none", fontWeight: "bold", boxShadow: "0 2px 5px rgba(0,0,0,0.1)" }}>
              🏠 Home
            </Link>
          </nav>

          <Routes>
            <Route path="/" element={
              <div style={{ textAlign: "center", paddingTop: "40px", paddingBottom: "50px", color: "#333", boxSizing: "border-box" }}>
                <div style={{ maxWidth: "100%", width: "100%", margin: "0 auto 25px auto", padding: "0 10px", boxSizing: "border-box" }}>
                  
                  <h1 style={{ 
                    fontSize: "clamp(24px, 7.5vw, 36px)", 
                    margin: "0 0 12px 0", 
                    color: "#222", 
                    whiteSpace: "nowrap",
                    fontWeight: "bold"
                  }}>
                    Welcome to our cozy cafe
                  </h1>

                  <p style={{ fontSize: "16px", color: "#444", marginBottom: "20px", fontWeight: "600", textShadow: "0 1px 2px rgba(255,255,255,0.8)" }}>
                    Pause for a moment and relax here ☁️
                  </p>
                  <Link to="/items" style={{ display: "inline-block", padding: "12px 24px", background: "#ff7b9f", color: "white", textDecoration: "none", borderRadius: "20px", fontWeight: "bold", boxShadow: "0 4px 10px rgba(0,0,0,0.15)", fontSize: "16px" }}>
                    🍰 Go to Menu List
                  </Link>
                </div>

                {featuredItem ? (
                  <div style={{ maxWidth: "300px", margin: "0 auto", background: "rgba(255, 255, 255, 0.95)", padding: "20px", borderRadius: "25px", boxShadow: "0 8px 20px rgba(0,0,0,0.15)", textAlign: "center", boxSizing: "border-box" }}>
                    <div style={{ background: "#fff0f5", padding: "6px 12px", borderRadius: "15px", display: "inline-block", fontSize: "13px", fontWeight: "bold", color: "#ff4d79", marginBottom: "12px" }}>
                      ⭐ Today's Featured Menu
                    </div>
                    {featuredItem.photo && (
                      <div style={{ width: "100%", height: "150px", overflow: "hidden", borderRadius: "15px", marginBottom: "12px" }}>
                        <img src={featuredItem.photo} alt={featuredItem.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      </div>
                    )}
                    <h3 style={{ fontSize: "18px", margin: "8px 0 4px 0", color: "#333" }}>{featuredItem.name}</h3>
                    <p style={{ color: "#e60012", fontWeight: "bold", marginBottom: "15px" }}>${Number(featuredItem.price).toFixed(2)}</p>
                    <Link to={`/items/${featuredItem.id}`} style={{ display: "block", padding: "10px", background: "#73c2fb", color: "white", textDecoration: "none", borderRadius: "15px", fontWeight: "bold", fontSize: "14px" }}>
                      View Details & Order ☕
                    </Link>
                  </div>
                ) : (
                  <div style={{ color: "#555", fontSize: "14px" }}>Loading recommended menu...</div>
                )}
              </div>
            } />
            <Route path="/items" element={<ItemsPage />} />
            <Route path="/items/:id" element={<ItemDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="*" element={<div style={{ textAlign: "center", padding: "50px", color: "#333" }}><h1>404 Not Found</h1><Link to="/" style={{ color: "#007bff" }}>Go Home</Link></div>} />
          </Routes>

          <Sidebar />
        </div>
      </Router>
    </CartProvider>
    </FavoritesProvider>
  );
}

export default App;