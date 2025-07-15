import React from "react";
import { Card } from "react-bootstrap";
import FilterContent from "./FilterContent";

const styles = {
  sidebarCard: {
    border: "1px solid #e0e0e0",
    borderRadius: "8px",
    backgroundColor: "white",
    boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
  },
};

const FilterSidebar = (props) => {
  return (
    <Card style={styles.sidebarCard}>
      <Card.Body>
        <FilterContent {...props} />
      </Card.Body>
    </Card>
  );
};

export default FilterSidebar;
