import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

interface Product {
  id: number | string;
  name: string;
  price: number;
  photo?: string;
  description?: string;
}

export default function ItemDetailPage() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    fetch("/products.json")
      .then((res) => res.json())
      .then((data) => {
        const productArray = Array.isArray(data) ? data : data.products || data.items || [];
        const found = productArray.find((item: any) => String(item.id) === String(id));
        
        if (found) {
          setProduct({
            ...found,
            description: found.description || found.desc,
            price: Number(found.price),
          });
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load product:", err);
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;

    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        photo: product.photo,
      });
    }

    setSuccessMessage(`Added ${quantity} item(s) to cart! 🛒`);
    setTimeout(() => setSuccessMessage(""), 2500);
  };

  if (loading) {
    return <div style={{ color: "white", padding: "20px", textAlign: "center" }}>Loading...</div>;
  }

  if (!product) {
    return <div style={{ color: "white", padding: "20px", textAlign: "center" }}>Product not found!</div>;
  }

  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .detail-wrapper {
            padding: 10px !important;
          }
          /* 흰색 카드만 세로 길이를 줄이기 위해 내부 요소들의 여백과 높이만 조절 */
          .detail-card {
            width: 100% !important;
            padding: 20px !important;
          }
          .detail-img-box {
            height: 180px !important;
            margin-bottom: 15px !important;
          }
          .detail-desc {
            margin-bottom: 18px !important;
          }
          .detail-qty {
            margin-bottom: 15px !important;
          }
        }
      `}</style>
      <div className="detail-wrapper" style={{ padding: "40px", color: "#333", display: "flex", justifyContent: "center", boxSizing: "border-box" }}>
        <div className="detail-card" style={{ background: "white", padding: "30px", borderRadius: "25px", width: "500px", boxShadow: "0 10px 25px rgba(0,0,0,0.15)", textAlign: "center", boxSizing: "border-box" }}>
          
          {/* 분홍색 알림창 코드는 원본 그대로 유지 */}
          <div style={{ height: "30px", marginBottom: "10px" }}>
            {successMessage && (
              <div style={{ background: "#ff7b9f", color: "white", padding: "5px", borderRadius: "10px", fontWeight: "bold" }}>
                {successMessage}
              </div>
            )}
          </div>

          {product.photo && (
            <div className="detail-img-box" style={{ width: "100%", height: "260px", overflow: "hidden", borderRadius: "15px", marginBottom: "20px" }}>
              <img src={product.photo} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          )}

          <h1 style={{ fontSize: "26px", margin: "10px 0" }}>{product.name}</h1>
          <p style={{ color: "#e60012", fontSize: "20px", fontWeight: "bold", marginBottom: "15px" }}>
            Price: ${product.price.toFixed(2)}
          </p>
          <p className="detail-desc" style={{ color: "#666", lineHeight: "1.5", marginBottom: "25px" }}>
            {product.description || "A delicious choice from our cafe menu."}
          </p>

          <div className="detail-qty" style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
            <button
              onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}
              style={{ padding: "6px 12px", background: "#eee", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" }}
            >
              -
            </button>
            <span style={{ fontSize: "18px", fontWeight: "bold", width: "30px", textAlign: "center" }}>{quantity}</span>
            <button
              onClick={() => setQuantity((prev) => prev + 1)}
              style={{ padding: "6px 12px", background: "#eee", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" }}
            >
              +
            </button>
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: "15px", flexWrap: "wrap" }}>
            <button
              onClick={handleAddToCart}
              style={{
                padding: "10px 20px",
                background: "#73c2fb",
                color: "white",
                border: "none",
                borderRadius: "15px",
                fontWeight: "bold",
                cursor: "pointer",
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
              }}
            >
              Add to Cart 🛒
            </button>
            
            <Link
              to="/items"
              style={{
                padding: "10px 20px",
                background: "#eee",
                color: "#333",
                textDecoration: "none",
                borderRadius: "15px",
                fontWeight: "bold",
                display: "inline-flex",
                alignItems: "center"
              }}
            >
              &larr; Back to Menu
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}