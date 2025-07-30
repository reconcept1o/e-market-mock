import React, { useState, useRef, Suspense, useMemo } from "react";
import { useInView } from "react-intersection-observer"; // Animasyon için
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Spinner,
  Modal,
} from "react-bootstrap";
import {
  FaPercentage,
  FaUsers,
  FaMagic,
  FaBullhorn,
  FaShippingFast,
  FaShieldAlt,
  FaChartLine,
  FaBoxes,
  FaCogs,
  FaCube,
} from "react-icons/fa";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
// config.js dosyanızın doğru yolda olduğundan emin olun.
// Örneğin: import config from "../config";
const config = { apiUrl: "http://localhost:5000" }; // Geçici olarak buraya ekledim, kendi config dosyanızı kullanın.

// --- ANİMASYON BİLEŞENİ (Inline Style Kullanarak) ---
const FadeInOnScroll = ({ children, delay = "0s" }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const animationStyles = {
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(20px)",
    transition: `opacity 0.7s ease-out, transform 0.6s ease-out`,
    transitionDelay: delay,
  };

  return (
    <div ref={ref} style={animationStyles}>
      {children}
    </div>
  );
};

// --- 3D ANİMASYON BİLEŞENLERİ ---
const ProductBox = ({ position, color, size = [1, 1, 1] }) => {
  const meshRef = useRef();
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2;
    }
  });
  return (
    <mesh ref={meshRef} position={position} castShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} roughness={0.5} metalness={0.3} />
    </mesh>
  );
};

const HeroAnimation = () => {
  const boxes = useMemo(
    () => [
      { position: [0, 0, 0], color: "#d4af37", size: [1.2, 1.2, 1.2] },
      { position: [-1.5, 0.8, -1], color: "#ffffff" },
      { position: [1.8, -0.5, 0.5], color: "#ffffff" },
      { position: [-0.8, -1.2, 1], color: "#f0f0f0" },
      { position: [1.2, 1.5, -0.8], color: "#f0f0f0" },
    ],
    []
  );

  return (
    <>
      {boxes.map((box, index) => (
        <ProductBox key={index} {...box} />
      ))}
    </>
  );
};

// --- ANA HOME BİLEŞENİ ---
const Home = () => {
  // State'ler
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [showKvkkModal, setShowKvkkModal] = useState(false);

  // Modal handler'ları
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => {
    setErrors({});
    setShowModal(true);
  };
  const handleCloseKvkkModal = () => setShowKvkkModal(false);
  const handleShowKvkkModal = () => setShowKvkkModal(true);

  // --- TÜM STİLLER TEK BİR OBJE İÇİNDE ---
  const styles = {
    pageWrapper: {
      backgroundColor: "#ffffff",
      fontFamily: "'Poppins', sans-serif",
      color: "#343a40",
      overflowX: "hidden",
    },
    header: {
      padding: "1rem 0",
      position: "sticky",
      top: 0,
      zIndex: 1030,
      width: "100%",
      background: "rgba(255, 255, 255, 0.8)",
      backdropFilter: "saturate(180%) blur(10px)",
      WebkitBackdropFilter: "saturate(180%) blur(10px)",
      borderBottom: "1px solid #e9ecef",
    },
    brandContainer: {
      display: "flex",
      alignItems: "center",
      gap: "15px",
    },
    brandIcon: {
      fontSize: "2.2rem",
      color: "#d4af37",
    },
    brandLogo: {
      fontFamily: "'Montserrat', sans-serif",
      fontSize: "clamp(1.8rem, 4vw, 2.2rem)",
      fontWeight: 700,
      color: "#003366",
      letterSpacing: "8px",
      margin: 0,
    },
    heroSection: {
      padding: "6rem 1rem",
      minHeight: "90vh",
      display: "flex",
      alignItems: "center",
      background: "radial-gradient(circle, #fdfdff 0%, #f1f4f8 100%)",
      textAlign: "left",
    },
    heroTitle: {
      fontSize: "clamp(2.5rem, 6vw, 4rem)",
      fontWeight: 900,
      color: "#003366",
      marginBottom: "1.5rem",
      lineHeight: 1.2,
    },
    heroSubtitle: {
      fontSize: "clamp(1.1rem, 2.5vw, 1.3rem)",
      fontWeight: 400,
      lineHeight: 1.8,
      color: "#495057",
      maxWidth: "600px",
    },
    heroCanvasContainer: {
      height: "500px",
      width: "100%",
    },
    section: {
      padding: "6rem 1rem",
      textAlign: "center",
    },
    sectionTitle: {
      fontFamily: "'Montserrat', sans-serif",
      fontWeight: 700,
      fontSize: "clamp(2.2rem, 5vw, 3rem)",
      marginBottom: "5rem",
      color: "#212529",
    },
    featureCard: {
      backgroundColor: "#ffffff",
      padding: "2.5rem 1.5rem",
      borderRadius: "15px",
      border: "1px solid #e9ecef",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      boxShadow: "0 4px 6px rgba(0,0,0,0.04)",
    },
    featureIcon: {
      fontSize: "3rem",
      color: "#d4af37",
      marginBottom: "1.5rem",
    },
    featureTitle: {
      fontFamily: "'Montserrat', sans-serif",
      fontSize: "1.3rem",
      fontWeight: 700,
      marginBottom: "1rem",
      color: "#003366",
    },
    featureText: {
      fontSize: "0.95rem",
      color: "#6c757d",
      lineHeight: 1.7,
    },
    ctaButton: {
      padding: "1rem 3rem",
      fontSize: "1.2rem",
      fontWeight: "bold",
      background: "linear-gradient(45deg, #d4af37, #e6c667)",
      color: "#ffffff",
      border: "none",
      borderRadius: "50px",
      transition:
        "transform 0.2s ease, box-shadow 0.3s ease, background 0.3s ease",
      boxShadow: "0 4px 15px rgba(212, 175, 55, 0.3)",
    },
    footer: {
      padding: "2rem 0",
      textAlign: "center",
      fontSize: "0.9rem",
      backgroundColor: "#ffffff",
      color: "#6c757d",
      borderTop: "1px solid #e9ecef",
    },
    submitButton: {
      padding: "0.8rem",
      fontSize: "1rem",
      fontWeight: "bold",
      borderRadius: "8px",
      backgroundColor: "#d4af37",
      color: "#ffffff",
      border: "none",
      transition: "all 0.3s ease",
      flexGrow: 1,
    },
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  // --- EKSİK OLAN FONKSİYONLAR ---
  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim())
      newErrors.firstName = "İsim alanı zorunludur.";
    if (!formData.lastName.trim())
      newErrors.lastName = "Soyisim alanı zorunludur.";
    if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Geçerli bir e-posta adresi girin.";
    if (!formData.phone.trim())
      newErrors.phone = "Telefon numarası zorunludur.";
    return newErrors;
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await fetch(`${config.apiUrl}/api/early-adopters`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          createdAt: new Date().toISOString(),
        }),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(
          result.error || "Başvurunuz gönderilirken bir hata oluştu."
        );
      }
      handleCloseModal();
      alert(
        `Teşekkürler ${formData.firstName}! Başvurunuz alındı. Sizi aramızda görmek için sabırsızlanıyoruz!`
      );
      setFormData({ firstName: "", lastName: "", email: "", phone: "" });
    } catch (e) {
      console.error("Error submitting form: ", e);
      alert(
        e.message ||
          "Başvurunuz gönderilirken bir hata oluştu. Lütfen tekrar deneyin."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const featureCards = [
    {
      icon: FaBoxes,
      title: "Akıllı Envanter Yönetimi",
      text: "Farklı kanallardaki stoklarınızı tek merkezden yönetin. Ürünleriniz azalınca uyarı alın, 'olmayan ürünü satma' derdine son verin.",
    },
    {
      icon: FaCogs,
      title: "Otomatik Sipariş Akışı",
      text: "Siparişlerinizi tek tuşla işleyin, kargo etiketlerini anında yazdırın ve müşterilerinize otomatik bildirimler gönderin.",
    },
    {
      icon: FaShippingFast,
      title: "Entegre Kargo Çözümleri",
      text: "Anlaşmalı kargo firmalarıyla gönderimlerinizi panelden saniyeler içinde oluşturun ve süreci hızlandırın.",
    },
    {
      icon: FaShieldAlt,
      title: "Güvenli Ödeme Altyapısı",
      text: "BDDK lisanslı ve PCI-DSS uyumlu altyapımız ile müşterilerinize güvenli ve kolay bir alışveriş deneyimi sunun.",
    },
    {
      icon: FaChartLine,
      title: "Detaylı Raporlama",
      text: "Google Analytics entegrasyonu ile mağaza performansınızı analiz ederek doğru kararlar verin.",
    },
    {
      icon: FaPercentage,
      title: "Sıfır Komisyon & Aidat",
      text: "Kurucu üyelerimizden satışları üzerinden ömür boyu hiçbir komisyon veya gizli ücret talep etmiyoruz.",
    },
    {
      icon: FaUsers,
      title: "Destekleyici Topluluk",
      text: "Sadece bir pazar yeri değil, aynı zamanda satıcıların birbirine destek olduğu bir komünite inşa ediyoruz.",
    },
    {
      icon: FaBullhorn,
      title: "Gelişmiş Pazarlama",
      text: "Profesyonel e-posta pazarlama araçlarıyla entegre olun, terk edilmiş sepetleri kurtarın ve müşteri kitlenizi büyütün.",
    },
  ];

  return (
    <div style={styles.pageWrapper}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="true"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700;900&family=Poppins:wght@400&display=swap"
        rel="stylesheet"
      />

      <header style={styles.header}>
        <Container className="d-flex justify-content-center">
          <div style={styles.brandContainer}>
            <FaCube style={styles.brandIcon} />
            <h1 style={styles.brandLogo} id="brand-logo">
              kendimden
              <span style={{ color: styles.brandIcon.color }}>.com</span> 
            </h1>
          </div>
        </Container>
      </header>

      <main>
        <section style={styles.heroSection} id="hero-section">
          <Container>
            <Row className="align-items-center">
              <Col lg={6} md={12} className="mb-5 mb-lg-0">
                <FadeInOnScroll>
                  <h2 style={styles.heroTitle}>
                    İşinizi Büyütün, Kazancınız Size Kalsın.
                  </h2>
                </FadeInOnScroll>
                <FadeInOnScroll delay="200ms">
                  <p style={styles.heroSubtitle}>
                    Kendi markanızı oluşturabileceğiniz, ürünlerinizi sergileyip
                    güvenle satabileceğiniz{" "}
                    <strong>yeni nesil e-pazaryeri platformu.</strong>
                    <br />
                    Açılışa özel ilk 1000 üyemizden{" "}
                    <strong>ömür boyu komisyon ve aidat almıyoruz.</strong>
                  </p>
                </FadeInOnScroll>
                <FadeInOnScroll delay="400ms">
                  <Button
                    style={styles.ctaButton}
                    className="mt-4 cta-button-hover"
                    onClick={handleShowModal}
                  >
                    HEMEN YERİNİ AYIRT
                  </Button>
                </FadeInOnScroll>
              </Col>
              <Col lg={6} className="d-none d-lg-block">
                <FadeInOnScroll delay="300ms">
                  <div style={styles.heroCanvasContainer}>
                    <Suspense
                      fallback={
                        <Spinner
                          animation="border"
                          style={{ color: styles.brandIcon.color }}
                        />
                      }
                    >
                      <Canvas shadows camera={{ position: [0, 1, 5], fov: 60 }}>
                        <ambientLight intensity={0.6} />
                        <directionalLight
                          position={[5, 5, 5]}
                          intensity={1.2}
                          castShadow
                        />
                        <pointLight
                          position={[-5, -5, -5]}
                          intensity={0.5}
                          color="#d4af37"
                        />
                        <HeroAnimation />
                        <OrbitControls
                          enableZoom={false}
                          enablePan={false}
                          autoRotate
                          autoRotateSpeed={0.5}
                          maxPolarAngle={Math.PI / 2}
                          minPolarAngle={Math.PI / 3}
                        />
                      </Canvas>
                    </Suspense>
                  </div>
                </FadeInOnScroll>
              </Col>
            </Row>
          </Container>
        </section>

        <section style={{ ...styles.section, backgroundColor: "#f8f9fa" }}>
          <Container>
            <FadeInOnScroll>
              <h3 style={styles.sectionTitle} id="section-title">
                Neden Kendimden.com?
              </h3>
            </FadeInOnScroll>
            <Row>
              {featureCards.map((card, index) => (
                <Col xs={12} sm={6} lg={3} key={index} className="mb-4 d-flex">
                  <FadeInOnScroll delay={`${index * 100}ms`}>
                    <div
                      style={styles.featureCard}
                      className="feature-card-hover"
                    >
                      <card.icon style={styles.featureIcon} />
                      <h4 style={styles.featureTitle}>{card.title}</h4>
                      <p style={styles.featureText}>{card.text}</p>
                    </div>
                  </FadeInOnScroll>
                </Col>
              ))}
            </Row>
          </Container>
        </section>

        <section style={styles.section}>
          <Container className="text-center">
            <FadeInOnScroll>
              <h3 style={styles.sectionTitle}>Kurucu Üye Olun</h3>
            </FadeInOnScroll>
            <FadeInOnScroll delay="200ms">
              <p
                className="lead mb-5"
                style={{
                  color: "#495057",
                  maxWidth: "700px",
                  margin: "0 auto",
                }}
              >
                Ömür boyu komisyonsuz satış hakkı ve tüm gelişmiş özellikleri
                kullanma şansını garantilemek için hemen yerinizi ayırtın.
                Sadece birkaç saniyenizi alacak.
              </p>
            </FadeInOnScroll>
            <FadeInOnScroll delay="400ms">
              <Button
                style={styles.ctaButton}
                className="cta-button-hover"
                onClick={handleShowModal}
              >
                YERİMİ GARANTİLE
              </Button>
            </FadeInOnScroll>
          </Container>
        </section>
      </main>

      <footer style={styles.footer}>
        <Container>
          <p className="mb-1">
            © {new Date().getFullYear()} kendimden.com - Tüm Hakları Saklıdır.
          </p>
          <Button variant="link" size="sm" onClick={handleShowKvkkModal}>
            KVKK Aydınlatma Metni
          </Button>
        </Container>
      </footer>

      <style type="text/css">
        {`
          .feature-card-hover:hover {
            transform: translateY(-10px);
            box-shadow: 0 12px 20px rgba(0, 0, 0, 0.08);
          }
          .cta-button-hover:hover {
            transform: translateY(-3px);
            box-shadow: 0 7px 20px rgba(212, 175, 55, 0.4);
            background: linear-gradient(45deg, #c5a030, #d4af37);
          }
          @media (max-width: 991.98px) {
            #hero-section {
              text-align: center !important;
              padding-top: 4rem !important;
              padding-bottom: 4rem !important;
              min-height: auto !important;
            }
          }
          @media (max-width: 767.98px) {
            #brand-logo { letter-spacing: 4px !important; }
            .section, #hero-section { padding-top: 4rem !important; padding-bottom: 4rem !important; }
            #section-title { margin-bottom: 3rem !important; }
          }
        `}
      </style>

      {/* Üye Başvuru Modalı (TAMAMLANMIŞ) */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontWeight: 700, color: "#003366" }}>
            Kurucu Üye Başvuru Formu
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-secondary mb-4">
            Bu özel fırsattan yararlanmak için lütfen bilgilerinizi eksiksiz
            doldurun.
          </p>
          <Form noValidate onSubmit={handleFormSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="firstName">
                  <Form.Label>İsim</Form.Label>
                  <Form.Control
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    isInvalid={!!errors.firstName}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.firstName}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="lastName">
                  <Form.Label>Soyisim</Form.Label>
                  <Form.Control
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    isInvalid={!!errors.lastName}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.lastName}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>E-posta Adresi</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                isInvalid={!!errors.email}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="phone">
              <Form.Label>Telefon Numarası</Form.Label>
              <Form.Control
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                isInvalid={!!errors.phone}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.phone}
              </Form.Control.Feedback>
            </Form.Group>
            <Modal.Footer className="px-0 pt-3 border-0">
              <Button variant="secondary" onClick={handleCloseModal}>
                Kapat
              </Button>
              <Button
                type="submit"
                style={styles.submitButton}
                className="cta-button-hover"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />{" "}
                    Gönderiliyor...
                  </>
                ) : (
                  "YERİMİ GARANTİLE"
                )}
              </Button>
            </Modal.Footer>
            <Form.Text className="d-block text-center mt-2 text-muted">
              Bilgileriniz güvende. Sadece açılışı haber vermek için
              kullanacağız.
            </Form.Text>
          </Form>
        </Modal.Body>
      </Modal>

      {/* KVKK Aydınlatma Metni Modalı */}
      <Modal
        show={showKvkkModal}
        onHide={handleCloseKvkkModal}
        centered
        size="lg"
        scrollable
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ fontWeight: 700, color: "#003366" }}>
            KVKK Aydınlatma Metni
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <strong>kendimden.com</strong> olarak, 6698 sayılı Kişisel Verilerin
            Korunması Kanunu (“KVKK”) uyarınca, Veri Sorumlusu sıfatıyla, siz
            değerli kullanıcılarımızın kişisel verilerini aşağıda açıklanan
            kapsamda işlemekteyiz.
          </p>
          <h5>1. İşlenen Kişisel Veriler ve İşleme Amaçları</h5>
          <p>
            Erken erişim programımıza başvuru yapmanız durumunda, tarafınızca
            sağlanan{" "}
            <strong>ad, soyad, e-posta adresi ve telefon numarası</strong> gibi
            kimlik ve iletişim bilgileriniz;
            <ul>
              <li>Başvurunuzun alınması ve değerlendirilmesi,</li>
              <li>Platformumuzun lansmanı hakkında sizi bilgilendirmek,</li>
              <li>
                Kurucu üyelik programı avantajları ve süreçleri hakkında sizinle
                iletişime geçmek,
              </li>
              <li>Hizmet kalitemizi artırmak ve geri bildirimlerinizi almak</li>
            </ul>
            amaçlarıyla sınırlı olarak işlenecektir.
          </p>
          <h5>2. Kişisel Verilerin Aktarılması</h5>
          <p>
            Kişisel verileriniz, yasal zorunluluklar ve rızanız dışında üçüncü
            kişilerle paylaşılmayacaktır.
          </p>
          <h5>3. Kişisel Veri Sahibinin Hakları</h5>
          <p>
            KVKK’nın 11. maddesi uyarınca, kişisel verilerinizle ilgili olarak;
            kişisel veri işlenip işlenmediğini öğrenme, işlenmişse buna ilişkin
            bilgi talep etme, işlenme amacını ve bunların amacına uygun
            kullanılıp kullanılmadığını öğrenme, yurt içinde veya yurt dışında
            kişisel verilerin aktarıldığı üçüncü kişileri bilme, eksik veya
            yanlış işlenmiş olması hâlinde bunların düzeltilmesini isteme ve bu
            kapsamda yapılan işlemin kişisel verilerin aktarıldığı üçüncü
            kişilere bildirilmesini isteme, kanuna aykırı olarak işlenmesi
            sebebiyle zarara uğraması hâlinde zararın giderilmesini talep etme
            haklarına sahipsiniz.
          </p>
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseKvkkModal}>
            Kapat
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Home;
