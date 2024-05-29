require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const http = require("http");
const server = http.createServer(app);
const cookieParser = require("cookie-parser");


const userRoutes = require("./routes/Users");
const contactRoutes = require("./routes/Contact");
const reservationRoutes = require("./routes/Reservation");
const categoryRoutes = require("./routes/Category");
const menuRoutes = require("./routes/Menu");
const reviewRoutes = require("./routes/Review");
const paymentRoutes = require("./routes/Payement");

const adminRoutes = require("./routes/Admin/Admin");

const {connectDB} = require("./conifg/database");
const { cloudinaryConnect } = require("./conifg/cloudinary");
const fileUpload = require("express-fileupload");

cloudinaryConnect();
connectDB();

const PORT = process.env.PORT

app.use(express.json());
app.use(fileUpload({ useTempFiles: true, tempFileDir: "/tmp", }));

const allowedOrigins = [
    'http://localhost:3000',
    'http://admin.localhost:3000',
    'https://khaao-restaurant.vercel.app/',
    '*'
];

app.use(cors({
    origin: allowedOrigins,
    credentials: true
}));

// app.use(cors());

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/contact", contactRoutes);
app.use("/api/v1/reservation", reservationRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/menu", menuRoutes);
app.use("/api/v1/review", reviewRoutes);
app.use("/api/v1/payment", paymentRoutes)
app.use("/api/v1/admin", adminRoutes );


app.get("/", (req, res) => {
    console.log("hello it working")
    // res.josn({
    //     sucess: true,
    //     message: "Your sever is up and running..."
    // });
    res.send(`<h1>Backend is Running and this is '/' Route</h1>`);
});

app.listen(PORT, ()=>{
    console.log(`App is running at ${PORT}`)
});

