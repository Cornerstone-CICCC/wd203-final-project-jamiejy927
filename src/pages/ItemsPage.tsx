import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";

interface Product {
  id: number | string;
  name: string;
  price: number;
  photo?: string;
  description?: string;
  category?: string;
}

export default function ItemsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 8;

  const { toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    fetch("/products.json")
      .then((res) => res.json())
      .then((data) => {
        const productArray = Array.isArray(data) ? data : data.products || data.items || [];
        
        const formattedProducts = productArray.map((item: any) => ({
          ...item,
          description: item.description || item.desc,
          price: Number(item.price),
        }));

        setProducts(formattedProducts);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load products:", err);
        setLoading(false);
      });
  }, []);

  const filteredProducts = products.filter((item) => {
    if (selectedCategory === "All") return true;
    
    const target = (item.name || "").toLowerCase();

    const isDrink = 
      target.includes("coffee") || target.includes("latte") || target.includes("americano") ||
      target.includes("cappucino") || target.includes("flat white") || target.includes("roast") ||
      target.includes("macchiato") || target.includes("tea") || target.includes("matcha") ||
      target.includes("espresso") || target.includes("chocolate") || target.includes("brew") ||
      target.includes("bubble tea") || target.includes("mocha");

    const isDessert = 
      (target.includes("cupcake") || target.includes("cake") || target.includes("mandazi") ||
       target.includes("leche") || target.includes("sweet") || target.includes("pastry") ||
       target.includes("croissant") || target.includes("roll") || target.includes("pancakes") ||
       target.includes("waffles") || target.includes("tiramisu") || target.includes("cheesecake") ||
       target.includes("macarons") || target.includes("churros") || target.includes("gelato")) &&
      !target.includes("sushi");

    if (selectedCategory === "Drinks") return isDrink;
    if (selectedCategory === "Dessert") return isDessert;
    if (selectedCategory === "Food") return !isDrink && !isDessert;
    
    return true;
  });

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  if (loading) {
    return <div style={{ color: "white", padding: "20px", textAlign: "center" }}>Loading menu...</div>;
  }

  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .items-container {
            padding: 15px !important;
            margin-right: 0 !important;
          }
        }
      `}</style>
      <div className="items-container" style={{ padding: "40px", color: "#333", marginRight: "320px", transition: "margin-right 0.3s ease", boxSizing: "border-box" }}>
        <h1 style={{ textAlign: "center", marginBottom: "20px", textShadow: "1px 1px 2px white" }}>Cafe Menu</h1>
        
        <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginBottom: "20px", flexWrap: "wrap" }}>
          {["All", "Drinks", "Dessert", "Food"].map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              style={{
                padding: "8px 18px",
                borderRadius: "15px",
                border: "none",
                fontWeight: "bold",
                cursor: "pointer",
                background: selectedCategory === category ? "#ff7b9f" : "white",
                color: selectedCategory === category ? "white" : "#333",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                transition: "all 0.2s"
              }}
            >
              {category}
            </button>
          ))}

          <Link
            to="/favorites"
            style={{
              padding: "8px 18px",
              borderRadius: "15px",
              background: "#ff4d6d",
              color: "white",
              textDecoration: "none",
              fontWeight: "bold",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              display: "flex",
              alignItems: "center",
              gap: "5px"
            }}
          >
            🩷 Favorites
          </Link>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "25px", justifyContent: "center" }}>
          {currentItems.map((item) => (
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
                justifyContent: "space-between",
                boxSizing: "border-box"
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
                {isFavorite(item.id) ? "🩷" : "🤍"}
              </button>

              {item.photo && (
                <div style={{ width: "100%", height: "140px", overflow: "hidden", borderRadius: "12px", marginBottom: "12px" }}>
                  <img src={item.photo} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
              )}
              <div>
                <h3 style={{ fontSize: "18px", margin: "10px 0 5px 0" }}>{item.name}</h3>
                <p style={{ color: "#e60012", fontWeight: "bold", marginBottom: "10px" }}>${item.price.toFixed(2)}</p>
              </div>
              <Link to={`/items/${item.id}`} style={{ display: "inline-block", padding: "8px 12px", background: "#73c2fb", color: "white", textDecoration: "none", borderRadius: "10px", fontWeight: "bold" }}>
                View Details
              </Link>
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "8px", marginTop: "30px" }}>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => setCurrentPage(pageNumber)}
                style={{
                  padding: "8px 14px",
                  borderRadius: "10px",
                  border: "none",
                  fontWeight: "bold",
                  cursor: "pointer",
                  background: currentPage === pageNumber ? "#ff7b9f" : "white",
                  color: currentPage === pageNumber ? "white" : "#333",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
                }}
              >
                {pageNumber}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
}