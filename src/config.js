// src/config.js
const config = {
  apiUrl: process.env.REACT_APP_API_URL || "http://localhost:5000", // Varsayılan yerel URL
  env: process.env.REACT_APP_ENV || "development",
};

export default config;
