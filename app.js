require("dotenv").config();
const express = require("express");
const app = express();
const ProductsRoute = require("./routes/ProductsRoute");
const SellesRoute = require("./routes/SellesRoute")
const connectDB = require("./config/db")
const cors = require("cors");
const users = require("./routes/user");
const cookieParser = require("cookie-parser");
const authMiddleware = require("./middleware/authMiddleware")

//2 connect
connectDB()
//ده عشان يقرأ الجاسون الي في البادي بتاع الربكوست
app.use(express.json());
app.use(cookieParser())

//ده عشان يشتغل علي اي رابط
app.use(cors({
  origin: "http://localhost:3000", // عنوان الفرونت
  credentials: true,               // 🔥 يسمح بإرسال الكوكيز
}));

const port = process.env.PORT || 3000;

app.use("/api/products",authMiddleware.requireAuth, ProductsRoute);
app.use("/api/sells",authMiddleware.requireAuth, SellesRoute);
app.use("/api", users)




app.listen(port, ()=> {
    console.log(`listen in port ${port}...` )
});

//اهم المكتبات

// npm init -y
// npm i express mongoose bcryptjs jsonwebtoken dotenv cookie-parser express-rate-limit helmet cors nodemailer validator
// npm i -D nodemon
