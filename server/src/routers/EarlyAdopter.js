const express = require("express");
const router = express.Router();
const EarlyAdopter = require("../models/EarlyAdopter");

router.post("/", async (req, res) => {
  try {
    const { firstName, lastName, email, phone, createdAt } = req.body;

    const earlyAdopter = new EarlyAdopter({
      firstName,
      lastName,
      email,
      phone,
      createdAt: new Date(createdAt),
    });

    await earlyAdopter.save();
    res.status(201).json({ message: "Başvuru başarıyla kaydedildi." });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: "Bu e-posta zaten kayıtlı." });
    }
    res.status(500).json({ error: "Başvuru kaydedilirken bir hata oluştu." });
  }
});

module.exports = router;
