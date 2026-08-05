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

function App() {
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
              <div style={{ textAlign: "center", paddingTop: "100px", color: "#333" }}>
                <h1>Cafe Home</h1>
                <Link to="/items" style={{ fontSize: "18px", color: "#007bff", textDecoration: "underline" }}>
                  Go to Menu List
                </Link>
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