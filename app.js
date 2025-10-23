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

// الاتصال بقاعدة البيانات
connectDB();

// إعداد الميدل وير قبل أي راوت
app.use(express.json());
app.use(cookieParser());

// ✅ إعداد CORS مضبوط تمامًا
const allowedOrigins = [
  "http://localhost:3000",
  "https://store-henna-one.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// تأكيد أن السيرفر يرد على OPTIONS requests
app.options(/.*/, cors());

// ✅ راوتاتك كلها هنا
app.use("/api", users);
app.use("/api/products", authMiddleware.requireAuth, ProductsRoute);
app.use("/api/sells", authMiddleware.requireAuth, SellesRoute);

// ✅ صفحة اختبار بسيطة
app.get("/", (req, res) => {
  res.json({ message: "Server running successfully ✅" });
});

// ✅ تشغيل السيرفر
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
