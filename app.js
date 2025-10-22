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
// Cors fix
app.use(cors({
  origin: function (origin, callback) {
    const allowedOrigins = [
      "http://localhost:3000",
      "https://store-henna-one.vercel.app"
    ];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

// اختياري: لتأكيد الهيدر دايمًا موجود حتى في الأخطاء
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

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