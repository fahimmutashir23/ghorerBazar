const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productReviewSchema = new mongoose.Schema(
  {
    userName: { type: String, require: true },
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    comment: { type: String, require: true },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: null
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ProductReview", productReviewSchema);
