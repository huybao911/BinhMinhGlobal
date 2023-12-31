const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      trim: true,
      required: [true, "Username is required"],
    },
    role:
    {
      type: mongoose.Schema.Types.ObjectId,
      trim: true,
      ref: "Role",
    },
    password: {
      type: String,
      trim: true,
      required: [true, "Password is required"],
    },
    confirmPass: {
      type: String,
    },
    resetPass: {
      type: String,
    }
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);


module.exports = mongoose.model("User", userSchema);
