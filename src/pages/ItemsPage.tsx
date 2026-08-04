import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface Product {
  id: number | string;
  name: string;
  price: string;
  image?: string;
  description?: string;
}

export default function ItemsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch("/products.json")
      .then((res) => res.json())
      .then((data) => {
        const productArray = Array.isArray(data) ? data : data.products || data.items || [];
        setProducts(productArray);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load products:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div style={{ color: "white", padding: "20px" }}>Loading menu...</div>;
  }

  return (
    <div style={{ padding: "40px", color: "#333" }}>
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>Cinnamoroll Cafe Menu</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>
        {Array.isArray(products) && products.map((item) => (
          <div key={item.id} style={{ background: "white", padding: "20px", borderRadius: "15px", width: "220px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
            <h3>{item.name}</h3>
            <p>Price: ${Number(item.price).toFixed(2)}</p>
            <Link to={`/items/${item.id}`} style={{ display: "inline-block", marginTop: "10px", padding: "8px 12px", background: "#73c2fb", color: "white", textDecoration: "none", borderRadius: "8px" }}>
              View Details
            </Link>
          </div>
        ))}
      </div>
      <div style={{ textAlign: "center", marginTop: "30px" }}>
        <Link to="/" style={{ color: "#333", fontWeight: "bold" }}>&larr; Back to Home</Link>
      </div>
    </div>
  );
}