import { FaLaptop, FaTshirt, FaHome, FaMobileAlt, FaTv } from "react-icons/fa";

export const megaMenuCategories = [
  {
    name: "Elektronik",
    icon: <FaLaptop />,
    subCategories: [
      {
        title: "Bilgisayar & Tablet",
        links: [
          "Dizüstü Bilgisayar",
          "Tablet",
          "Masaüstü Bilgisayar",
          "Gaming Laptop",
          "Aksesuarlar",
        ],
      },
      {
        title: "Telefon & Aksesuarları",
        links: [
          "Cep Telefonu",
          "Akıllı Saat",
          "Kablosuz Kulaklık",
          "Powerbank",
          "Telefon Kılıfları",
        ],
      },
      {
        title: "TV, Görüntü & Ses",
        links: [
          "Televizyon",
          "Soundbar",
          "Projeksiyon Cihazı",
          "Medya Oynatıcılar",
        ],
      },
    ],
  },
  {
    name: "Giyim & Moda",
    icon: <FaTshirt />,
    subCategories: [
      {
        title: "Kadın Giyim",
        links: ["Elbise", "T-shirt", "Pantolon", "Ceket", "İç Giyim"],
      },
      {
        title: "Erkek Giyim",
        links: [
          "Gömlek",
          "Polo Yaka T-shirt",
          "Kot Pantolon",
          "Şort",
          "Sweatshirt",
        ],
      },
    ],
  },
  {
    name: "Ev & Yaşam",
    icon: <FaHome />,
    subCategories: [
      {
        title: "Mutfak",
        links: [
          "Tencere Setleri",
          "Kahve Makineleri",
          "Blender",
          "Yemek Takımları",
        ],
      },
      {
        title: "Mobilya",
        links: ["Çalışma Masası", "Kitaplık", "Orta Sehpa", "TV Ünitesi"],
      },
      {
        title: "Dekorasyon",
        links: ["Tablolar", "Vazolar", "Aydınlatma", "Mumlar"],
      },
    ],
  },
  // Promosyon görseli için özel bir nesne
  {
    type: "image",
    imageUrl:
      "https://placehold.co/250x350/f27a1a/ffffff?text=Sezon+Fırsatları!",
    link: "/kampanyalar/sezon-firsatlari",
  },
];
