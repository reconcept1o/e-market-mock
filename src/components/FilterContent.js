import React, { useState } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
import { FaChevronDown, FaChevronUp, FaStar } from "react-icons/fa";

const BRAND_COLOR = "#e81e7d";

const styles = {
  section: { marginBottom: "1.5rem" },
  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    cursor: "pointer",
    padding: "0.5rem 0",
  },
  sectionTitle: { fontWeight: "600", fontSize: "0.9rem" },
  formCheck: { marginBottom: "0.75rem" },
  colorSwatchContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    marginTop: "0.5rem",
  },
  colorSwatch: (code, border, isSelected) => ({
    width: "24px",
    height: "24px",
    backgroundColor: code,
    borderRadius: "50%",
    cursor: "pointer",
    border: border ? "1px solid #ddd" : "none",
    boxShadow: isSelected
      ? `0 0 0 2px white, 0 0 0 4px ${BRAND_COLOR}`
      : "0 0 0 2px white, 0 0 0 4px transparent",
    transition: "box-shadow 0.2s ease",
  }),
  ratingOption: {
    cursor: "pointer",
    marginBottom: "0.5rem",
    display: "flex",
    alignItems: "center",
    gap: "5px",
  },
  priceInput: { display: "flex", alignItems: "center", gap: "10px" },
};

const CollapsibleFilterSection = ({ title, children, startOpen = true }) => {
  const [isOpen, setIsOpen] = useState(startOpen);
  return (
    <div style={styles.section}>
      <div style={styles.sectionHeader} onClick={() => setIsOpen(!isOpen)}>
        <span style={styles.sectionTitle}>{title}</span>
        {isOpen ? <FaChevronUp size="0.8em" /> : <FaChevronDown size="0.8em" />}
      </div>
      {isOpen && <div>{children}</div>}
    </div>
  );
};

const FilterContent = ({ filtersData, activeFilters, onFilterChange }) => {
  // Mock için basit bir handleFilter fonksiyonu.
  // Gerçek uygulamada bu, App.js'ten gelen onFilterChange'i çağırır.
  const handleFilter = (key, value) => {
    console.log(`Filtre: ${key}, Değer: ${value}`);
    // onFilterChange(key, value); // Gerçekte bu satır kullanılır.
  };

  return (
    <>
      {filtersData.map((filter) => (
        <CollapsibleFilterSection title={filter.title} key={filter.key}>
          {/* HATA DÜZELTİLDİ: Boş yorumlar yerine gerçek JSX elemanları eklendi. */}
          {filter.type === "checkbox" &&
            filter.options.map((option) => (
              <Form.Check
                type="checkbox"
                id={`check-${filter.key}-${option}`}
                label={option}
                style={styles.formCheck}
                key={option}
                onChange={() => handleFilter(filter.key, option)}
              />
            ))}
          {filter.type === "color" && (
            <div style={styles.colorSwatchContainer}>
              {filter.options.map((option) => (
                <div
                  key={option.name}
                  style={styles.colorSwatch(option.code, option.border, false)} // 'isSelected' şimdilik false
                  title={option.name}
                  onClick={() => handleFilter(filter.key, option.name)}
                />
              ))}
            </div>
          )}
          {filter.type === "rating" && (
            <div>
              {filter.options.map((option) => (
                <div
                  key={option.value}
                  style={styles.ratingOption}
                  onClick={() => handleFilter(filter.key, option.value)}
                >
                  {option.label}
                </div>
              ))}
            </div>
          )}
          {filter.type === "price_input" && (
            <div style={styles.priceInput}>
              <Form.Control
                type="number"
                placeholder="En Az"
                bsPrefix="form-control form-control-sm"
              />
              <span>-</span>
              <Form.Control
                type="number"
                placeholder="En Çok"
                bsPrefix="form-control form-control-sm"
              />
              <Button variant="outline-secondary" size="sm">
                ›
              </Button>
            </div>
          )}
        </CollapsibleFilterSection>
      ))}
    </>
  );
};

export default FilterContent;
