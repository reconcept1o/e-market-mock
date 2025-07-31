const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Bağlantısı
// Bu bağlantı her istekte yeniden kurulmaya çalışılabilir, bu normaldir.
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB bağlantısı başarılı"))
  .catch((err) => console.error("MongoDB bağlantı hatası:", err));

// Rotalar
// Test için basit bir ana API rotası eklemek çok faydalıdır.
app.get("/api", (req, res) => {
  res.send("Backend API'si çalışıyor!");
});
app.use("/api/early-adopters", require("./src/routers/EarlyAdopter"));

// --- BU SATIRI SİLİN VEYA YORUM SATIRI YAPIN ---
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Sunucu ${PORT} portunda çalışıyor`));

// --- YERİNE BU SATIRI EKLEYİN ---
module.exports = app;
