require("dotenv").config();
const express = require("express");
const app = express();
const router = require("./routes.js");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const { connectDB } = require("./config/db.js");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const path = require("path");
const { handleWebhook } = require("./controllers/webhookController.js");

connectDB();

app.use(express.static(path.join(__dirname, "public")));

app.use(
  "/api/stripe/webhook",
  express.raw({ type: "application/json" }),
  handleWebhook
);
app.use("/upload", express.static(path.join(__dirname, "upload")));

session({
  secret: "ots secret",
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    ttl: 14 * 24 * 60 * 60,
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 14,
  },
});

app.use(express.json());
const allowedOrigins = ["https://bmi-shop.vercel.app", "http:git //localhost:3000"];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(
  session({
    secret: "ots store",
    saveUninitialized: false,
    resave: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      ttl: 14 * 24 * 60 * 60,
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 14,
    },
  })
);
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);
app.use("/upload", express.static(path.join(__dirname, "upload")));

app.use("/public", express.static(__dirname + "/public"));

app.use("/api", router);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
