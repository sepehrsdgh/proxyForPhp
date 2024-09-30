const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

// Middleware for CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// Proxy only for the specific route
app.post(
  "/api/v1/auth/login/otp",
  createProxyMiddleware({
    target: "https://ritmify.com",
    changeOrigin: true,
    pathRewrite: {
      "^/api/v1/auth/login/otp": "/api/v1/auth/login/otp", // Keep the same path
    },
    onProxyReq: (proxyReq, req, res) => {
      console.log(`Proxying request to: ${proxyReq.protocol}//${proxyReq.host}${proxyReq.path}`);
      console.log(`Request Method: ${req.method}`);
      console.log(`Request Headers:`, req.headers);
      console.log(`Request Body:`, req.body);
    },
    onProxyRes: (proxyRes, req, res) => {
      console.log(`Received response with status: ${proxyRes.statusCode}`);
    },
    onError: (err, req, res) => {
      console.error(`Error during proxy:`, err);
    }
  })
);

// Start the server
app.listen(8080, () => {
  console.log("Proxy server is running on http://127.0.0.1:8080");
});
