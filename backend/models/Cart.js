const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
    {
        product: {
            type: Array,
            default: [],
        },
        fullName: {
            type: String,
        },
        nameCompany: {
            type: String,
        },
        address: {
            type: String,
        },
        city: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "City",
        },
        sdt: {
            type: String,
        },
        email: {
            type: String,
        },
        note: {
            type: String,
        },
        date: {
            type: String,
        },
    },
    { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);


module.exports = mongoose.model("Cart", cartSchema);
