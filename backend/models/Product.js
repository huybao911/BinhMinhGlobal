const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    nameProduct: {
      type: String,
      required: [true, "nameProduct is required"],
    },
    typeProduct:
    {
      type: mongoose.Schema.Types.ObjectId,
      trim: true,
      ref: "TypeProduct",
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    productDetail: {
      type: String,
      maxLength: [50000, "Must be no more than 50000 characters"],
    },
    productDescription: {
      type: String,
      maxLength: [50000, "Must be no more than 50000 characters"],
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

module.exports = mongoose.model("Product", productSchema);
