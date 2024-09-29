const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

// Middleware for CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:8000");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// Proxy to the external API
app.use(
  "/api",
  createProxyMiddleware({
    target: "https://ritmify.com",
    changeOrigin: true,
    pathRewrite: {
      "^/api": "/api", // Adjust path if necessary
    },
  })
);

// Start the server
app.listen(8080, () => {
  console.log("Proxy server is running on http://127.0.0.1:8080");
});
