require("dotenv").config();
const express = require("express");
const app = express();
const router = require("./routes.js");
const morgan = require("morgan");
const cors = require("cors");
const { connectDB } = require("./config/db.js");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const path = require("path");

connectDB();

const allowedOrigins = ["https://bmi-project.vercel.app", "https://bmi-shop.vercel.app"];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use("/upload", express.static(path.join(__dirname, "upload")));

app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret",
    saveUninitialized: false,
    resave: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      ttl: 14 * 24 * 60 * 60,
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 14,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    },
  })
);

app.use("/api", router);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

module.exports = app;