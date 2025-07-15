import React from "react";
import { Row, Col, Container } from "react-bootstrap";

const styles = {
  megaMenuWrapper: {
    position: "absolute",
    top: "100%", // Kategori barının hemen altında başlar
    left: 0,
    right: 0, // left:0 ve right:0, en yakın 'position: relative' atasına göre genişliği %100 yapar
    zIndex: 1000,
    backgroundColor: "white",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    border: "1px solid #e0e0e0",
    borderTop: "none",
    padding: "2rem 0",
  },
  mainCategory: {
    /* Bu stil artık gereksiz, Col'un kendi boşlukları var */
  },
  mainCategoryTitle: {
    display: "flex",
    alignItems: "center",
    fontSize: "1rem",
    fontWeight: "bold",
    marginBottom: "1rem",
    color: "#333",
  },
  icon: { marginRight: "10px", color: "#f27a1a" },
  subCategoryTitle: {
    fontWeight: "bold",
    color: "#555",
    marginBottom: "0.75rem",
  },
  link: {
    display: "block",
    color: "#666",
    textDecoration: "none",
    marginBottom: "0.5rem",
    fontSize: "0.9rem",
  },
  promoImageContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  promoImage: { maxWidth: "100%", height: "auto", borderRadius: "8px" },
};

const MegaMenu = ({ categories }) => {
  const mainCategories = categories.filter((cat) => cat.type !== "image");
  const promo = categories.find((cat) => cat.type === "image");

  return (
    <div style={styles.megaMenuWrapper}>
      <Container>
        <Row>
          <Col lg={9}>
            <Row>
              {mainCategories.map((category, index) => (
                <Col key={index} md={4} className="mb-3">
                  <h5 style={styles.mainCategoryTitle}>
                    <span style={styles.icon}>{category.icon}</span>
                    {category.name}
                  </h5>
                  {category.subCategories.map((sub, subIndex) => (
                    <div key={subIndex} className="mb-3">
                      <p style={styles.subCategoryTitle}>{sub.title}</p>
                      {sub.links.map((link, linkIndex) => (
                        <a key={linkIndex} href="#" style={styles.link}>
                          {link}
                        </a>
                      ))}
                    </div>
                  ))}
                </Col>
              ))}
            </Row>
          </Col>
          {promo && (
            <Col lg={3}>
              <div style={styles.promoImageContainer}>
                <a href={promo.link}>
                  <img
                    src={promo.imageUrl}
                    alt="Promosyon"
                    style={styles.promoImage}
                  />
                </a>
              </div>
            </Col>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default MegaMenu;
