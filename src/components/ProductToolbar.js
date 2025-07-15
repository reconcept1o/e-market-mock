import React from "react";
import { Form, Button } from "react-bootstrap";
// İkona artık ihtiyacımız yok, bu yüzden import'u kaldırabiliriz veya yorum satırı yapabiliriz.
// import { FaThLarge } from 'react-icons/fa';

const styles = {
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0.75rem 1rem",
    backgroundColor: "#fff",
    border: "1px solid #e9ecef",
    borderRadius: "8px",
    marginBottom: "1.5rem",
  },
  filterButton: {
    // İkon yerine metin geldiği için padding'i biraz ayarlayabiliriz
    padding: "0.5rem 1rem",
    fontWeight: "600",
    fontSize: "0.9rem",
    // Butonun arka plan ve kenarlık rengini daha belirgin yapalım
    backgroundColor: "#f8f9fa",
    borderColor: "#e9ecef",
    color: "#343a40",
  },
  sortingContainer: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  sortingLabel: {
    fontSize: "0.9rem",
    color: "#6c757d",
  },
  selectControl: {
    width: "180px",
    border: "none",
    boxShadow: "none",
    fontWeight: "500",
    backgroundColor: "transparent",
  },
};

const ProductToolbar = ({ onToggleSidebar, productCount }) => {
  return (
    <div style={styles.toolbar}>
      {/* SOL TARAF: FİLTRELE BUTONU */}
      {/* FaThLarge ikonu yerine doğrudan "Filtrele" metnini yazıyoruz */}
      <Button
        variant="light"
        onClick={onToggleSidebar}
        style={styles.filterButton}
        title="Filtreleri Göster/Gizle"
      >
        Filtrele
      </Button>

      {/* ORTA: ÜRÜN SAYISI (Opsiyonel, aynı kalıyor) */}
      <span style={styles.sortingLabel}>{productCount} ürün listeleniyor</span>

      {/* SAĞ TARAF: SIRALAMA (Aynı kalıyor) */}
      <div style={styles.sortingContainer}>
        <span style={styles.sortingLabel}>Sıralama</span>
        <Form.Select size="sm" style={styles.selectControl}>
          <option>Akıllı Sıralama</option>
          <option>En Düşük Fiyat</option>
          <option>En Yüksek Fiyat</option>
          <option>En Yeniler (A>Z)</option>
        </Form.Select>
      </div>
    </div>
  );
};

export default ProductToolbar;
