import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";

export default function FavoritesPage() {
  const { favorites, toggleFavorite } = useFavorites();

  return (
    <div style={{ padding: "40px", color: "#333", marginRight: "320px", transition: "margin-right 0.3s ease" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px", textShadow: "1px 1px 2px white" }}>My Favorites</h1>

      {favorites.length === 0 ? (
        <div style={{ textAlign: "center", marginTop: "50px", color: "#666" }}>
          <p style={{ fontSize: "18px", marginBottom: "15px" }}>You haven't added any favorites yet!</p>
          <Link to="/items" style={{ padding: "10px 20px", background: "#ff7b9f", color: "white", textDecoration: "none", borderRadius: "15px", fontWeight: "bold" }}>
            Browse Menu ☕
          </Link>
        </div>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "25px", justifyContent: "center" }}>
          {favorites.map((item) => (
            <div 
              key={item.id} 
              style={{ 
                position: "relative", 
                background: "white", 
                padding: "15px", 
                borderRadius: "20px", 
                width: "220px", 
                boxShadow: "0 6px 12px rgba(0,0,0,0.15)", 
                textAlign: "center", 
                display: "flex", 
                flexDirection: "column", 
                justifyContent: "space-between" 
              }}
            >
              <button
                onClick={() => toggleFavorite(item)}
                style={{
                  position: "absolute",
                  top: "12px",
                  right: "12px",
                  background: "white",
                  border: "none",
                  borderRadius: "50%",
                  width: "32px",
                  height: "32px",
                  cursor: "pointer",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
                  fontSize: "15px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 10
                }}
              >
                🩷
              </button>

              {item.photo && (
                <div style={{ width: "100%", height: "140px", overflow: "hidden", borderRadius: "12px", marginBottom: "12px" }}>
                  <img src={item.photo} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
              )}
              <div>
                <h3 style={{ fontSize: "18px", margin: "10px 0 5px 0" }}>{item.name}</h3>
                <p style={{ color: "#e60012", fontWeight: "bold", marginBottom: "10px" }}>${Number(item.price).toFixed(2)}</p>
              </div>
              <Link to={`/items/${item.id}`} style={{ display: "inline-block", padding: "8px 12px", background: "#73c2fb", color: "white", textDecoration: "none", borderRadius: "10px", fontWeight: "bold" }}>
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}

      <div style={{ textAlign: "center", marginTop: "40px" }}>
        <Link to="/items" style={{ color: "#fff", background: "#333", padding: "10px 20px", borderRadius: "20px", textDecoration: "none", fontWeight: "bold" }}>&larr; Back to Menu</Link>
      </div>
    </div>
  );
}