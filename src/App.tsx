import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ItemsPage from "./pages/ItemsPage";
import ItemDetailPage from "./pages/ItemDetailPage";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app">
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
          <Route path="/cart" element={<div>Cart Page</div>} />
          <Route path="/checkout" element={<div>Checkout Page</div>} />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;