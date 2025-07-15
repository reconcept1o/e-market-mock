import React from "react";
import { Accordion } from "react-bootstrap";

const styles = {
  mainCategoryHeader: {
    display: "flex",
    alignItems: "center",
    fontWeight: "bold",
  },
  icon: {
    marginRight: "10px",
    color: "#f27a1a",
  },
  subCategoryTitle: {
    fontWeight: "bold",
    color: "#555",
    marginTop: "1rem",
    fontSize: "0.9rem",
  },
  link: {
    display: "block",
    color: "#666",
    textDecoration: "none",
    padding: "0.5rem 0",
    fontSize: "0.9rem",
  },
};

const MobileMenu = ({ categories }) => {
  const mainCategories = categories.filter((cat) => cat.type !== "image");

  return (
    <Accordion flush>
      {mainCategories.map((category, index) => (
        <Accordion.Item eventKey={index.toString()} key={index}>
          <Accordion.Header>
            <span style={styles.mainCategoryHeader}>
              <span style={styles.icon}>{category.icon}</span>
              {category.name}
            </span>
          </Accordion.Header>
          <Accordion.Body>
            {category.subCategories.map((sub, subIndex) => (
              <div key={subIndex}>
                <p style={styles.subCategoryTitle}>{sub.title}</p>
                {sub.links.map((link, linkIndex) => (
                  <a key={linkIndex} href="#" style={styles.link}>
                    {link}
                  </a>
                ))}
              </div>
            ))}
          </Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  );
};

export default MobileMenu;
