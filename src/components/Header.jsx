import React from "react";
import {
  Navbar,
  Nav,
  Container,
  InputGroup,
  Form,
  Dropdown,
} from "react-bootstrap"; // NavDropdown yerine Dropdown import ettik
import { FaUser, FaHeart, FaShoppingCart, FaSearch } from "react-icons/fa";
import logo from "../assests/logo.jpg";

const styles = {
  header: {
    backgroundColor: "white",
    borderBottom: "1px solid #e0e0e0",
    padding: "1rem 0",
  },
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo: {
    height: "40px",
    flexShrink: 0,
  },
  searchContainer: {
    flexGrow: 1,
    margin: "0 2rem",
    maxWidth: "600px",
  },
  searchInput: {
    borderRight: "none",
    boxShadow: "none",
  },
  searchButton: {
    backgroundColor: "#f27a1a",
    borderColor: "#f27a1a",
    color: "white",
  },
  userActions: {
    display: "flex",
    alignItems: "center",
    flexShrink: 0,
  },
  actionLink: {
    display: "flex",
    alignItems: "center",
    color: "#333",
    textDecoration: "none",
    padding: "0.5rem 1rem", // Bu padding değeri tüm linkler için tutarlılık sağlar
    fontSize: "14px",
  },
  actionIcon: {
    marginRight: "6px",
    fontSize: "1.2rem",
  },
};

const Header = () => {
  return (
    <header style={styles.header}>
      <Container style={styles.container}>
        {/* 1. Logo */}
        <Navbar.Brand href="/">
          <img src={logo} alt="E-Pazar Yeri Logosu" style={styles.logo} />
        </Navbar.Brand>

        {/* 2. Arama Çubuğu */}
        <div style={styles.searchContainer}>
          <InputGroup>
            <Form.Control
              placeholder="Aradığınız ürünü veya markayı yazın..."
              style={styles.searchInput}
            />
            <InputGroup.Text style={styles.searchButton}>
              <FaSearch />
            </InputGroup.Text>
          </InputGroup>
        </div>

        {/* 3. Kullanıcı Aksiyonları */}
        <Nav style={styles.userActions}>
          {/* --- DEĞİŞİKLİK BURADA BAŞLIYOR --- */}
          {/* NavDropdown yerine daha esnek olan Dropdown bileşenini kullanıyoruz */}
          <Dropdown as={Nav.Item}>
            {/* Toggle'ın bir Nav.Link gibi render edilmesini sağlıyoruz. Bu, hizalamayı çözen anahtar adımdır. */}
            <Dropdown.Toggle
              as={Nav.Link}
              style={styles.actionLink}
              id="user-account-dropdown"
            >
              <FaUser style={styles.actionIcon} /> Üye Ol/Giriş Yap
            </Dropdown.Toggle>

            <Dropdown.Menu align="end">
              <Dropdown.Item href="/login">Giriş Yap</Dropdown.Item>
              <Dropdown.Item href="/register">Kayıt Ol</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item href="/orders">Siparişlerim</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          {/* --- DEĞİŞİKLİK BURADA BİTİYOR --- */}

          <Nav.Link href="/favorites" style={styles.actionLink}>
            <FaHeart style={styles.actionIcon} /> Favorilerim
          </Nav.Link>

          <Nav.Link href="/cart" style={styles.actionLink}>
            <FaShoppingCart style={styles.actionIcon} /> Sepetim
          </Nav.Link>
        </Nav>
      </Container>
    </header>
  );
};

export default Header;
