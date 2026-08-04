import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

interface Product {
  id: number | string;
  name: string;
  price: number;
  photo?: string;
  desc?: string;
  description?: string;
}

export default function ItemDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch("/products.json")
      .then((res) => res.json())
      .then((data) => {
        const productArray = Array.isArray(data) ? data : data.products || data.items || [];
        const found = productArray.find((p: any) => String(p.id) === id);

        if (found) {
          setProduct({
            ...found,
            price: Number(found.price), // 숫자로 변환
          });
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load product detail:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div style={{ color: "white", padding: "20px", textAlign: "center" }}>Loading details...</div>;
  }

  if (!product) {
    return <div style={{ color: "white", padding: "20px", textAlign: "center" }}>Product not found!</div>;
  }

  return (
    <div style={{ padding: "40px", color: "#333", display: "flex", justifyContent: "center" }}>
      <div style={{ background: "white", padding: "40px", borderRadius: "20px", maxWidth: "600px", width: "100%", boxShadow: "0 10px 20px rgba(0,0,0,0.2)", textAlign: "center" }}>
        {product.photo && (
          <img src={product.photo} alt={product.name} style={{ width: "100%", height: "300px", objectFit: "cover", borderRadius: "15px", marginBottom: "20px" }} />
        )}
        <h1 style={{ fontSize: "36px", margin: "10px 0" }}>{product.name}</h1>
        <p style={{ fontSize: "24px", color: "#e60012", fontWeight: "bold", margin: "20px 0" }}>
          Price: ${product.price.toFixed(2)}
        </p>
        <p style={{ fontSize: "16px", lineHeight: "1.6", color: "#666", marginBottom: "30px" }}>
          {product.desc || product.description || "Delicious menu item at Cinnamoroll Cafe!"}
        </p>
        
        <div style={{ display: "flex", gap: "15px", justifyContent: "center" }}>
          <button style={{ padding: "12px 24px", background: "#73c2fb", color: "white", border: "none", borderRadius: "10px", fontWeight: "bold", cursor: "pointer", fontSize: "16px" }}>
            Add to Cart 🛒
          </button>
          <Link to="/items" style={{ padding: "12px 24px", background: "#f0f0f0", color: "#333", textDecoration: "none", borderRadius: "10px", fontWeight: "bold", fontSize: "16px" }}>
            &larr; Back to Menu
          </Link>
        </div>
      </div>
    </div>
  );
}