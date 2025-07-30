import React, { useState, useRef, Suspense, useMemo } from "react";
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
import config from "../config";

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
      <meshStandardMaterial color={color} roughness={0.6} metalness={0.2} />
    </mesh>
  );
};

const HeroAnimation = () => {
  const boxes = useMemo(() => [
    { position: [0, 0, 0], color: "#d4af37", size: [1.2, 1.2, 1.2] },
    { position: [-1.5, 0.8, -1], color: "#ffffff" },
    { position: [1.8, -0.5, 0.5], color: "#ffffff" },
    { position: [-0.8, -1.2, 1], color: "#f0f0f0" },
    { position: [1.2, 1.5, -0.8], color: "#f0f0f0" },
  ], []);

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
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", email: "", phone: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => {
    setErrors({});
    setShowModal(true);
  };

  // --- TASARIM STİLLERİ ---
  const styles = {
    pageWrapper: {
      backgroundColor: "#f9f9f9",
      fontFamily: "'Poppins', sans-serif",
      color: "#212529",
      overflowX: 'hidden',
    },
    header: {
      padding: "1.5rem 0",
      borderBottom: "1px solid #e9ecef",
      backgroundColor: "#ffffff",
      boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
      position: 'sticky',
      top: 0,
      zIndex: 1020,
    },
    brandContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
    },
    brandIcon: {
      fontSize: '2rem',
      color: '#d4af37',
    },
    brandLogo: {
      fontFamily: "'Montserrat', sans-serif",
      fontSize: "clamp(1.8rem, 4vw, 2.2rem)",
      fontWeight: 700,
      color: "#003366",
      letterSpacing: "10px", // --- RESPONSIVE DÜZENLEME --- Bu değer media query ile değiştirilecek
      margin: 0,
    },
    heroSection: {
      padding: "6rem 1rem", // --- RESPONSIVE DÜZENLEME --- Dikey padding media query ile ayarlanacak
      minHeight: "90vh",
      display: "flex",
      alignItems: "center",
      textAlign: "left", // --- RESPONSIVE DÜZENLEME --- Mobil için media query ile 'center' yapılacak
      backgroundColor: "#ffffff",
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
        height: '500px',
        width: '100%',
    },
    section: { 
        padding: "6rem 1rem", // --- RESPONSIVE DÜZENLEME --- Dikey padding media query ile ayarlanacak
        textAlign: "center" 
    },
    sectionTitle: {
      fontWeight: 700,
      fontSize: "clamp(2.2rem, 5vw, 3rem)",
      marginBottom: "5rem", // --- RESPONSIVE DÜZENLEME --- Mobil için margin azaltılacak
      color: "#212529",
    },
    featureCard: {
      backgroundColor: "#ffffff",
      padding: "2.5rem 1.5rem",
      borderRadius: "15px",
      border: "1px solid #e9ecef",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    featureIcon: {
      fontSize: "3rem",
      color: "#d4af37",
      marginBottom: "1.5rem",
    },
    featureTitle: {
      fontSize: "1.4rem",
      fontWeight: 700,
      marginBottom: "1rem",
      color: "#212529"
    },
    featureText: {
      fontSize: "0.95rem",
      color: "#6c757d",
      lineHeight: 1.7,
    },
    formSection: {
      padding: "6rem 1rem", // --- RESPONSIVE DÜZENLEME --- Dikey padding media query ile ayarlanacak
      backgroundColor: "#fff8e1",
    },
    ctaButton: {
        padding: "1rem 3rem",
        fontSize: "1.2rem",
        fontWeight: "bold",
        backgroundColor: "#d4af37",
        color: "#ffffff",
        border: 'none',
        borderRadius: "50px",
        transition: 'transform 0.2s ease, box-shadow 0.3s ease',
        boxShadow: '0 4px 15px rgba(212, 175, 55, 0.3)',
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
      color: '#ffffff',
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

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "İsim alanı zorunludur.";
    if (!formData.lastName.trim()) newErrors.lastName = "Soyisim alanı zorunludur.";
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Geçerli bir e-posta adresi girin.";
    if (!formData.phone.trim()) newErrors.phone = "Telefon numarası zorunludur.";
    return newErrors;
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors); return;
    }
    setIsSubmitting(true);
    try {
      const response = await fetch(`${config.apiUrl}/api/early-adopters`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, createdAt: new Date().toISOString() }),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Başvurunuz gönderilirken bir hata oluştu.");
      }
      handleCloseModal();
      alert(`Teşekkürler ${formData.firstName}! Başvurunuz alındı. Sizi aramızda görmek için sabırsızlanıyoruz!`);
      setFormData({ firstName: "", lastName: "", email: "", phone: "" });
    } catch (e) {
      console.error("Error submitting form: ", e);
      alert(e.message || "Başvurunuz gönderilirken bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const featureCards = [
    { icon: FaBoxes, title: "Akıllı Envanter Yönetimi", text: "Farklı kanallardaki stoklarınızı tek merkezden yönetin. Ürünleriniz azalınca uyarı alın, 'olmayan ürünü satma' derdine son verin. Farklı renk ve beden seçeneklerini (varyant) kolayca takip edin." },
    { icon: FaCogs, title: "Otomatikleştirilmiş Sipariş Akışı", text: "Günün tüm siparişlerini tek tuşla işleyin, kargo etiketlerini anında yazdırın. 'Kargom nerede?' sorularını bitiren otomatik müşteri bildirimleri ile profesyonel bir deneyim sunun." },
    { 
      icon: FaShippingFast, 
      title: "Entegre Kargo Çözümleri",
      text: "Türkiye'nin önde gelen kargo firmalarıyla entegre çalışın. Siparişlerinize ait kargo etiketlerini panelinizden saniyeler içinde oluşturun ve gönderim sürecinizi hızlandırın."
    },
    { 
      icon: FaShieldAlt, 
      title: "Güvenli Ödeme Altyapısı", 
      text: "BDDK lisanslı ve PCI-DSS uyumlu ödeme altyapımız ile müşterilerinize tüm kartlarla güvenli ve kolay bir alışveriş deneyimi sunun."
    },
    { icon: FaChartLine, title: "Detaylı Raporlama", text: "Google Analytics entegrasyonu ile mağaza performansınızı analiz ederek doğru kararlar verin." },
    { icon: FaPercentage, title: "Sıfır Komisyon & Aidat", text: "Kurucu üyelerimizden satışları üzerinden ömür boyu hiçbir komisyon veya gizli ücret talep etmiyoruz." },
    { icon: FaUsers, title: "Destekleyici Topluluk", text: "Sadece bir pazar yeri değil, aynı zamanda satıcıların birbirine destek olduğu bir komünite inşa ediyoruz." },
    { icon: FaBullhorn, title: "Gelişmiş Pazarlama", text: "Klaviyo gibi profesyonel e-posta pazarlama araçlarıyla entegre olun, terk edilmiş sepetleri kurtarın ve sadık müşteri kitlenizi oluşturun." },
  ];

  return (
    <div style={styles.pageWrapper}>
      <header style={styles.header}>
        <Container className="d-flex justify-content-center">
          <div style={styles.brandContainer}>
            <FaCube style={styles.brandIcon} />
            <h1 style={styles.brandLogo} id="brand-logo">
              kendimden
              <span style={{color: styles.brandIcon.color}}>.com</span>
            </h1>
          </div>
        </Container>
      </header>

      <main>
        <section style={styles.heroSection} id="hero-section">
          <Container>
            <Row className="align-items-center">
              <Col lg={6} md={7}>
                <h2 style={styles.heroTitle}>
                  İşinizi Büyütün, Kazancınız Size Kalsın.
                </h2>
                <p style={styles.heroSubtitle}>
                  Kendi markanızı oluşturabileceğiniz, ürünlerinizi sergileyip
                  güvenle satabileceğiniz <strong>yeni nesil e-pazaryeri platformu.</strong>
                  Açılışa özel 500 üyemizden{" "}
                  <strong>ömür boyu komisyon ve aidat almıyoruz.</strong>
                </p>
                <Button style={styles.ctaButton} className="mt-4" onClick={handleShowModal}>
                  HEMEN YERİNİ AYIRT
                </Button>
              </Col>
              <Col lg={6} md={5} className="d-none d-md-block">
                <div style={styles.heroCanvasContainer}>
                  <Suspense fallback={<Spinner animation="border" style={{ color: styles.featureIcon.color }} />}>
                    <Canvas shadows camera={{ position: [0, 1, 5], fov: 60 }}>
                      <ambientLight intensity={0.7} />
                      <directionalLight 
                        position={[5, 5, 5]} 
                        intensity={1.5} 
                        castShadow 
                        shadow-mapSize-width={1024}
                        shadow-mapSize-height={1024}
                      />
                      <HeroAnimation />
                      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 3} />
                    </Canvas>
                  </Suspense>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        <section style={{ ...styles.section, backgroundColor: "#f9f9f9" }}>
          <Container>
            <h3 style={styles.sectionTitle} id="section-title">Neden Kendimden.com?</h3>
            <Row>
              {featureCards.map((card, index) => (
                // --- RESPONSIVE DÜZENLEME --- xs={12} eklenerek en küçük ekranlarda tek sütun olması garantilendi.
                <Col xs={12} sm={6} lg={3} key={index} className="mb-4 d-flex">
                  <div style={styles.featureCard} className="feature-card-hover">
                    <card.icon style={styles.featureIcon} />
                    <h4 style={styles.featureTitle}>{card.title}</h4>
                    <p style={styles.featureText}>{card.text}</p>
                  </div>
                </Col>
              ))}
            </Row>
          </Container>
        </section>
        
        <section style={styles.formSection}>
          <Container className="text-center">
            <h3 className="mb-4" style={{ fontWeight: 700, fontSize: "clamp(2rem, 5vw, 2.5rem)", color: "#212529" }}>
              Kurucu Üye Olma Fırsatını Kaçırmayın!
            </h3>
            <p className="lead mb-4" style={{ color: "#495057", maxWidth: "700px", margin: "0 auto" }}>
              Ömür boyu komisyonsuz satış hakkı ve tüm gelişmiş özellikleri
              kullanma şansını garantilemek için hemen yerinizi ayırtın.
            </p>
            <Button style={styles.ctaButton} onClick={handleShowModal}>
              YERİMİ GARANTİLE
            </Button>
          </Container>
        </section>
      </main>

      <footer style={styles.footer}>
        <Container><p>© {new Date().getFullYear()} kendimden.com - Tüm Hakları Saklıdır.</p></Container>
      </footer>

      {/* --- RESPONSIVE DÜZENLEME ---
          Tüm responsive CSS kuralları burada toplanmıştır.
          Bu, kodun daha temiz kalmasını ve yönetilmesini kolaylaştırır.
      */}
      <style type="text/css">
        {`
          .feature-card-hover:hover {
            transform: translateY(-10px);
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
          }
          .btn:hover {
            transform: translateY(-2px);
          }

          /* Mobil Cihazlar için (768px altı) */
          @media (max-width: 767.98px) {
            #brand-logo {
              letter-spacing: 4px !important; /* Logo harf aralığı azaltıldı */
            }

            #hero-section {
              text-align: center !important; /* Hero metinleri ortalandı */
              padding-top: 4rem !important;
              padding-bottom: 4rem !important;
            }

            .section, #hero-section, .formSection {
              padding-top: 4rem !important;
              padding-bottom: 4rem !important;
            }

            #section-title {
              margin-bottom: 3rem !important; /* Bölüm başlığı alt boşluğu azaltıldı */
            }

            .display-4, .display-3 {
                font-size: 2.5rem !important; /* Başlık fontları küçültüldü */
            }
          }
        `}
      </style>
      
      <Modal show={showModal} onHide={handleCloseModal} centered>
          <Modal.Header closeButton>
            <Modal.Title style={{ fontWeight: 700 }}>
              Kurucu Üye Başvuru Formu
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p className="text-secondary mb-4">
              Bu özel fırsattan yararlanmak için lütfen bilgilerinizi eksiksiz doldurun.
            </p>
            <Form noValidate onSubmit={handleFormSubmit}>
              <Row>
                <Col md={6}><Form.Group className="mb-3" controlId="firstName"><Form.Label>İsim</Form.Label><Form.Control type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} isInvalid={!!errors.firstName} required /><Form.Control.Feedback type="invalid">{errors.firstName}</Form.Control.Feedback></Form.Group></Col>
                <Col md={6}><Form.Group className="mb-3" controlId="lastName"><Form.Label>Soyisim</Form.Label><Form.Control type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} isInvalid={!!errors.lastName} required /><Form.Control.Feedback type="invalid">{errors.lastName}</Form.Control.Feedback></Form.Group></Col>
              </Row>
              <Form.Group className="mb-3" controlId="email"><Form.Label>E-posta Adresi</Form.Label><Form.Control type="email" name="email" value={formData.email} onChange={handleInputChange} isInvalid={!!errors.email} required /><Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback></Form.Group>
              <Form.Group className="mb-3" controlId="phone"><Form.Label>Telefon Numarası</Form.Label><Form.Control type="tel" name="phone" value={formData.phone} onChange={handleInputChange} isInvalid={!!errors.phone} required /><Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback></Form.Group>
              <Modal.Footer className="px-0 pt-3">
                <Button variant="secondary" onClick={handleCloseModal}>Kapat</Button>
                <Button type="submit" style={styles.submitButton} disabled={isSubmitting}>
                  {isSubmitting ? (<><Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/> Gönderiliyor...</>) : ("YERİMİ GARANTİLE")}
                </Button>
              </Modal.Footer>
              <Form.Text className="d-block text-center mt-2 text-muted">Bilgileriniz güvende. Sadece açılışı haber vermek için kullanacağız.</Form.Text>
            </Form>
          </Modal.Body>
      </Modal>
    </div>
  );
};

export default Home;