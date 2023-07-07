const mongoose = require("mongoose");

const typeProductSchema = new mongoose.Schema(
  {
    nameTypeProduct: {
      type: String,
      unique: true,
      trim: true,
      required: [true, "nameTypeProduct is required"],
    },
   
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

module.exports = mongoose.model("TypeProduct", typeProductSchema);
