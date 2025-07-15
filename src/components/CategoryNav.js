import React, { useState, useRef } from "react";
import { Nav, Container, Badge, Accordion } from "react-bootstrap";
import MegaMenu from "./MegaMenu";
import MobileMenu from "./MobileMenu";
import { megaMenuCategories } from "../data/mockCategories";
import useWindowSize from "../hooks/useWindowSize";
import useOnClickOutside from "../hooks/useOnClickOutside";

const styles = {
  // ANAHTAR DÜZELTME: position: 'relative' buraya, yani tüm barı kapsayan
  // ana elemente taşındı. MegaMenu artık kendini buna göre hizalayacak.
  categoryNav: {
    backgroundColor: "white",
    borderBottom: "1px solid #e0e0e0",
    position: "relative",
  },
  // Bu div artık sadece bir gruplama elemanı, özel pozisyonlama stiline ihtiyacı yok.
  menuContainer: {
    // position: 'relative' buradan kaldırıldı.
  },
  navLink: {
    color: "#333",
    fontWeight: "500",
    padding: "10px 15px",
    fontSize: "14px",
    textDecoration: "none",
    cursor: "pointer",
  },
  activeNavLink: {
    color: "#f27a1a",
  },
};

const CategoryNav = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const { width } = useWindowSize();
  const isMobile = width < 992;

  const menuRef = useRef(null);

  // Bu hook, menuRef ile işaretlenmiş alanın (hem link hem de açılan menü)
  // dışına tıklandığında menüyü kapatır. Bu mantık doğru ve kalmalı.
  useOnClickOutside(menuRef, () => setMenuOpen(false));

  const desktopLinks = [
    "Kadın",
    "Erkek",
    "Anne & Çocuk",
    "Ev & Yaşam",
    "Süpermarket",
    "Kozmetik",
    "Ayakkabı & Çanta",
    "Elektronik",
  ];

  return (
    // Bu div artık relative olduğu için MegaMenu doğru bir şekilde yayılacak
    <div style={styles.categoryNav}>
      <Container>
        {isMobile ? (
          // --- MOBİL GÖRÜNÜM (Değişiklik yok) ---
          <Accordion>
            <Accordion.Item eventKey="0" style={{ border: "none" }}>
              <Accordion.Header>TÜM KATEGORİLER</Accordion.Header>
              <Accordion.Body style={{ padding: 0 }}>
                <MobileMenu categories={megaMenuCategories} />
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        ) : (
          // --- MASAÜSTÜ GÖRÜNÜM ---
          <Nav className="d-flex justify-content-between">
            {/* Bu div, hem linki hem de menüyü sararak 'dışına tıklamayı' algılamamızı sağlar */}
            <div ref={menuRef} style={styles.menuContainer}>
              <div
                onClick={() => setMenuOpen(!isMenuOpen)}
                style={{
                  ...styles.navLink,
                  ...(isMenuOpen ? styles.activeNavLink : {}),
                }}
              >
                TÜM KATEGORİLER
              </div>

              {/* MegaMenu artık doğru bir şekilde genişleyecek */}
              {isMenuOpen && <MegaMenu categories={megaMenuCategories} />}
            </div>

            {desktopLinks.map((category) => (
              <Nav.Link key={category} href="#" style={styles.navLink}>
                {category}
              </Nav.Link>
            ))}

            <Nav.Link href="#" style={styles.navLink}>
              Çok Satanlar <Badge bg="danger">Yeni</Badge>
            </Nav.Link>
            <Nav.Link href="#" style={styles.navLink}>
              Flaş Ürünler <Badge bg="danger">Yeni</Badge>
            </Nav.Link>
          </Nav>
        )}
      </Container>
    </div>
  );
};

export default CategoryNav;
