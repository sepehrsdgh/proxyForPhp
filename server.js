const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const cors = require("cors");

const app = express();

const corsOptions = {
  origin: "http://127.0.0.1:8000", // Specify the exact origin
  credentials: true, // Allow credentials (cookies, etc.)
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowed methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
};

app.use(cors(corsOptions));

app.use((req, res, next) => {
  console.log("Test");
  console.log("Test");
  console.log("Request Path:", req.path); // Logs the path of the request
  console.log("Original URL:", req.originalUrl); // Logs the original URL of the request
  next();
});

app.post("/api/v1/auth/login/otp", (req, res, next) => {
  console.log("hi");
  next();
});

app.post(
  "/api/v1/auth/login/otp",
  createProxyMiddleware({
    target: "https://ritmify.com",
    changeOrigin: true,
    pathRewrite: {
      "^/api/v1/auth/login/otp": "/api/v1/auth/login/otp", // Keep the same path
    },
    onProxyReq: (proxyReq, req, res) => {
      console.log(
        `Proxying request to: ${proxyReq.protocol}//${proxyReq.host}${proxyReq.path}`
      );
      console.log(`Request Method: ${req.method}`);
      console.log(`Request Headers:`, req.headers);
      console.log(`Request Body:`, req.body);
    },
    onProxyRes: (proxyRes, req, res) => {
      console.log(`Received response with status: ${proxyRes.statusCode}`);
    },
    onError: (err, req, res) => {
      console.error(`Error during proxy:`, err);
    },
  })
);

app.post(
  "/api/v1/auth/login/otp/verify",
  createProxyMiddleware({
    target: "https://ritmify.com",
    changeOrigin: true,
    pathRewrite: {
      "^/api/v1/auth/login/otp/verify": "/api/v1/auth/login/otp/verify", // Keep the same path
    },
    onProxyReq: (proxyReq, req, res) => {
      console.log(
        `Proxying request to: ${proxyReq.protocol}//${proxyReq.host}${proxyReq.path}`
      );
      console.log(`Request Method: ${req.method}`);
      console.log(`Request Headers:`, req.headers);
      console.log(`Request Body:`, req.body);
    },
    onProxyRes: (proxyRes, req, res) => {
      console.log(`Received response with status: ${proxyRes.statusCode}`);
    },
    onError: (err, req, res) => {
      console.error(`Error during proxy:`, err);
    },
  })
);

app.post(
  "/api/v1/auth/register",
  createProxyMiddleware({
    target: "https://ritmify.com",
    changeOrigin: true,
    pathRewrite: {
      "^/api/v1/auth/register": "/api/v1/auth/register", // Keep the same path
    },
    onProxyReq: (proxyReq, req, res) => {
      console.log(
        `Proxying request to: ${proxyReq.protocol}//${proxyReq.host}${proxyReq.path}`
      );
      console.log(`Request Method: ${req.method}`);
      console.log(`Request Headers:`, req.headers);
      console.log(`Request Body:`, req.body);
    },
    onProxyRes: (proxyRes, req, res) => {
      console.log(`Received response with status: ${proxyRes.statusCode}`);
    },
    onError: (err, req, res) => {
      console.error(`Error during proxy:`, err);
    },
  })
);

app.post(
  "/api/v1/auth/login",
  createProxyMiddleware({
    target: "https://ritmify.com",
    changeOrigin: true,
    pathRewrite: {
      "^/api/v1/auth/login/otp": "/api/v1/auth/login/otp", // Keep the same path
    },
    onProxyReq: (proxyReq, req, res) => {
      console.log(
        `Proxying request to: ${proxyReq.protocol}//${proxyReq.host}${proxyReq.path}`
      );
      console.log(`Request Method: ${req.method}`);
      console.log(`Request Headers:`, req.headers);
      console.log(`Request Body:`, req.body);
    },
    onProxyRes: (proxyRes, req, res) => {
      console.log(`Received response with status: ${proxyRes.statusCode}`);
    },
    onError: (err, req, res) => {
      console.error(`Error during proxy:`, err);
    },
  })
);

// Start the server
app.listen(8080, () => {
  console.log("Proxy server is running on http://127.0.0.1:8080");
});
