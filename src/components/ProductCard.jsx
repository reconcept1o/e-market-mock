import React from "react";
import { Card, Button, Badge } from "react-bootstrap";
import { FaStar, FaRegHeart, FaShippingFast } from "react-icons/fa";

const BRAND_COLOR = "#e81e7d";

const styles = {
  card: {
    border: "1px solid #e0e0e0",
    borderRadius: "8px",
    boxShadow: "none",
    transition: "box-shadow 0.2s ease-in-out",
    position: "relative", // Favori ikonu için
  },
  favoriteIcon: {
    position: "absolute",
    top: "10px",
    right: "10px",
    backgroundColor: "white",
    borderRadius: "50%",
    padding: "6px",
    cursor: "pointer",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  cardImage: {
    borderTopLeftRadius: "8px",
    borderTopRightRadius: "8px",
    objectFit: "cover",
    height: "200px",
    padding: "1rem",
  },
  cardBody: { padding: "0 1rem 1rem 1rem" },
  productBrand: {
    fontWeight: "700",
    fontSize: "0.9rem",
    marginBottom: "0.25rem",
  },
  productName: {
    fontSize: "0.9rem",
    color: "#333",
    minHeight: "40px",
  },
  ratingContainer: {
    display: "flex",
    alignItems: "center",
    fontSize: "0.8rem",
    color: "#888",
    margin: "0.5rem 0",
  },
  starIcon: { color: "#ffc107", marginRight: "4px" },
  productPrice: {
    fontWeight: "700",
    fontSize: "1.2rem",
    color: BRAND_COLOR,
    marginBottom: "0.5rem",
  },
  shippingInfo: {
    display: "flex",
    alignItems: "center",
    fontSize: "0.8rem",
    color: "#28a745",
    fontWeight: "600",
    marginBottom: "1rem",
  },
  addToCartButton: {
    backgroundColor: "transparent",
    borderColor: "#ddd",
    color: "#333",
    fontWeight: "600",
    width: "100%",
    // Hepsiburada'da bu buton hover'da ortaya çıkar, biz şimdilik böyle bırakıyoruz
  },
};

// Tekrar kullanılabilir yıldız render fonksiyonu
const renderStars = (rating) => {
  let stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(<FaStar key={i} color={i <= rating ? "#ffc107" : "#e0e0e0"} />);
  }
  return stars;
};

const ProductCard = ({ product }) => {
  return (
    <Card style={styles.card} className="h-100">
      <FaRegHeart style={styles.favoriteIcon} />
      <Card.Img variant="top" src={product.image} style={styles.cardImage} />
      <Card.Body style={styles.cardBody}>
        <div>
          <span style={styles.productBrand}>{product.brand}</span>
          <span style={styles.productName}> {product.name}</span>
        </div>
        <div style={styles.ratingContainer}>
          {renderStars(product.rating)}
          <span className="ms-1">({product.numReviews})</span>
        </div>
        <div style={styles.productPrice}>₺{product.price}</div>
        <div style={styles.shippingInfo}>
          <FaShippingFast className="me-2" />
          Kargo Bedava
        </div>
        <Button style={styles.addToCartButton}>Sepete Ekle</Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
