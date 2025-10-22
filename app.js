require("dotenv").config();
const express = require("express");
const app = express();
const ProductsRoute = require("./routes/ProductsRoute");
const SellesRoute = require("./routes/SellesRoute");
const connectDB = require("./config/db");
const cors = require("cors");
const users = require("./routes/user");
const cookieParser = require("cookie-parser");
const authMiddleware = require("./middleware/authMiddleware");

// ✅ CORS في البداية
app.use(cors({
  origin: ["http://localhost:3000", "https://store-henna-one.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true
}));

// ✅ connect DB
connectDB();

app.use(express.json());
app.use(cookieParser());

// ✅ Routes
app.use("/api/products", authMiddleware.requireAuth, ProductsRoute);
app.use("/api/sells", authMiddleware.requireAuth, SellesRoute);
app.use("/api", users);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listen in port ${port}...`);
});