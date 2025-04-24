const express = require("express");
const router = express.Router();
const User = require("./model/user.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const multer = require("multer");
const path = require("path");
const Product = require("./model/product.js");
const { conn } = require("./config/db.js");
const { GridFSBucket } = require("mongodb");
const { ObjectId } = require("mongodb");

dotenv.config();

// const Stripe = require("stripe");
// const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
// const client_url = process.env.CLIENT_URL;

let gridfsBucket;
conn.once("open", () => {
  gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "uploads",
  });
  console.log("GridFSBucket initialized");
});

const storage = multer.memoryStorage();
const Upload = multer({ storage });

const authMiddleware = async (req, res, next) => {
  try {
    if (!req.session.user) {
      return res
        .status(401)
        .send({ message: "Unauthorized user, please login" });
    }
    next();
  } catch (err) {
    return res.status(401).send({ message: "Unauthorized" });
  }
};

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    req.session.user = { userId: user._id, email: user.email, role: user.role };
    return res.status(200).json({ message: "Login success" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user) return res.status(409).send({ message: "User already exists" });

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    return res.status(200).send({ message: "New User Created" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Server error" });
  }
});

router.get("/dashboard", authMiddleware, async (req, res) => {
  try {
    const { userId } = req.session.user;
    const user = await User.findById({ _id: userId }).select("-password");
    return res.status(200).send(user);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Server error" });
  }
});

router.get("/users", async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.patch("/users/edit", authMiddleware, async (req, res) => {
  const { username, email, password } = req.body;
  const userId = req.session.user.userId;

  try {
    const user = await User.findById({ _id: userId });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    if (password) {
      const salt = await bcrypt.genSalt(Number(process.env.SALT));
      user.password = await bcrypt.hash(password, salt);
    }

    user.username = username || user.username;
    user.email = email || user.email;

    await user.save();

    res.status(200).json({ message: "Profile updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Error updating profile" });
  }
});

router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).send({ message: "Logout failed" });
    res.clearCookie("connect.sid");
    res.status(200).send({ message: "Logged out successfully" });
  });
});

router.get("/products", async (req, res) => {
  try {
    const allProducts = await Product.find();
    return res.status(200).send(allProducts);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Server error" });
  }
});

router.delete("/products/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Product deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

router.post("/upload", Upload.single("file"), async (req, res) => {
  try {
    const {
      productName,
      productDescription,
      price,
      discountPrice,
      stock,
      category,
    } = req.body;

    const uploadStream = gridfsBucket.openUploadStream(req.file.originalname, {
      contentType: req.file.mimetype,
    });

    uploadStream.end(req.file.buffer);

    uploadStream.on("finish", async () => {
      const fileId = new Product({
        productName,
        productDescription,
        price,
        discountPrice,
        stock,
        category,
        image: fileId,
      });

      await product.save();
      return res
        .status(200)
        .send({ message: "Product uploaded successfully", product });
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: "Internal server error" });
  }
});

router.get("/file/:id", async (req, res) => {
  try {
    const fileId = new mongoose.Types.ObjectId(req.params.id);
    const files = await gridfsBucket.find({ _id: fileId }).toArray();

    if (!files || files.length === 0) {
      return res.status(404).json({ message: "File not found" });
    }

    const file = files[0];
    const contentType = file.contentType || "application/octet-stream";

    res.set("Content-Type", contentType);
    gridfsBucket.openDownloadStream(file._id).pipe(res);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
