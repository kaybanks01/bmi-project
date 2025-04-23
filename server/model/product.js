const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    image: { type: mongoose.Schema.Types.ObjectId, ref:"uploads.files", required: true },
    productDescription: { type: String, required: true },
    price: { type: Number, required: true },
    discountPrice: { type: Number },
    stock: { type: Number, required: true },
    category: { type: String, required: true },
    productName: { type: String, required: true },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
