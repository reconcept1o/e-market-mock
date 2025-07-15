import { FaStar } from "react-icons/fa";

export const filters = [
  {
    key: "category",
    title: "Kategori",
    type: "checkbox", // Filtre tipini belirtiyoruz
    options: ["Elektronik", "Giyim", "Mutfak", "Spor", "Mobilya"],
  },
  {
    key: "brand",
    title: "Marka",
    type: "checkbox",
    options: [
      "TeknoMarka",
      "SesKalite",
      "ModaTrend",
      "MutfakStar",
      "SporFit",
      "EvDekor",
    ],
  },
  {
    key: "color",
    title: "Renk",
    type: "color", // Yeni tip: Renk kutucukları
    options: [
      { name: "Siyah", code: "#000000" },
      { name: "Beyaz", code: "#FFFFFF", border: true }, // Beyaz renk için kenarlık
      { name: "Mavi", code: "#007bff" },
      { name: "Kırmızı", code: "#dc3545" },
      { name: "Yeşil", code: "#28a745" },
      { name: "Sarı", code: "#ffc107" },
    ],
  },
  {
    key: "rating",
    title: "Değerlendirme",
    type: "rating", // Yeni tip: Yıldızlar
    options: [
      {
        value: 5,
        label: (
          <span>
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
          </span>
        ),
      },
      {
        value: 4,
        label: (
          <span>
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <span className="text-muted">
              <FaStar />
            </span>{" "}
            & üzeri
          </span>
        ),
      },
      {
        value: 3,
        label: (
          <span>
            <FaStar />
            <FaStar />
            <FaStar />
            <span className="text-muted">
              <FaStar />
              <FaStar />
            </span>{" "}
            & üzeri
          </span>
        ),
      },
    ],
  },
  {
    key: "price",
    title: "Fiyat Aralığı",
    type: "price_input", // Yeni tip: Input alanları
  },
];
