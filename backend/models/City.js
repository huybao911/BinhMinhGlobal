const mongoose = require("mongoose");

const citySchema = new mongoose.Schema(
  {
    nameCity: {
      type: String,
      unique: true,
      trim: true,
      required: [true, "Name City is required"],
    },
   
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

module.exports = mongoose.model("City", citySchema);
