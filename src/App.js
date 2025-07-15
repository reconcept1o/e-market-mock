import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Header from "./components/Header";
import CategoryNav from "./components/CategoryNav";
import Footer from "./components/Footer";
import ProductCard from "./components/ProductCard";
import FilterSidebar from "./components/FilterSidebar";
import ProductToolbar from "./components/ProductToolbar";

import allProducts from "./data/mockProducts";
import { filters as filtersData } from "./data/mockFilters";

const styles = {
  collapsibleColumn: {
    transition: "width 0.3s ease-in-out",
    overflow: "hidden",
  },
  sidebarHidden: {
    opacity: 0,
    width: 0,
    padding: 0, // Gizlendiğinde padding'i de sıfırla
    margin: 0, // Gizlendiğinde margin'i de sıfırla
  },
};

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeFilters, setActiveFilters] = useState({});

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const filteredProducts = allProducts;
  const filterProps = { filtersData, activeFilters, onFilterChange: () => {} };

  const sidebarStyle = isSidebarOpen
    ? styles.collapsibleColumn
    : { ...styles.collapsibleColumn, ...styles.sidebarHidden };

  return (
    <>
      <Header />
      <CategoryNav />
      <main className="py-5" style={{ backgroundColor: "#f8f9fa" }}>
        <Container fluid="lg">
          <Row>
            {/* Kenar Çubuğu - Animasyon için DOM'da kalıyor */}
            <Col
              lg={isSidebarOpen ? 3 : 0}
              xl={isSidebarOpen ? 2 : 0}
              className="d-none d-lg-block"
              style={sidebarStyle}
            >
              {isSidebarOpen && <FilterSidebar {...filterProps} />}
            </Col>

            {/* Ürün Bölümü - Animasyonlu ve dinamik genişlikli */}
            <Col
              lg={isSidebarOpen ? 9 : 12}
              xl={isSidebarOpen ? 10 : 12}
              style={styles.collapsibleColumn}
            >
              <ProductToolbar
                onToggleSidebar={toggleSidebar}
                productCount={filteredProducts.length}
              />

              <Row className="g-4">
                {filteredProducts.map((product) => (
                  // --- ANAHTAR DÜZELTME BURADA ---
                  // Grid mantığını daha basit ve daha doğru hale getiriyoruz.
                  // Bootstrap'in 12'lik grid sistemini temel alıyoruz:
                  // 3 ürün göstermek için -> 12/3 = 4 kolon genişliği
                  // 4 ürün göstermek için -> 12/4 = 3 kolon genişliği
                  <Col
                    key={product._id}
                    xs={12} // Mobil cihazlarda her zaman tek ürün, tam genişlik
                    sm={6} // Küçük tabletlerde 2 ürün
                    lg={isSidebarOpen ? 4 : 3} // Kenar çubuğu AÇIKKEN 3 ürün, KAPALIYKEN 4 ürün göster
                  >
                    <ProductCard product={product} />
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default App;
