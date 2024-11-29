const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: [
      {
        count: {
          type: String,
          default: null,
        },
        countPrice: {
          type: Number,
          default: null,
        },
      },
    ],
    brand: {
      type: String,
      required: true,
    },
    images: {
      type: Array,
      required: true,
    },
    imgDetails: [
      {
        img: {
          type: String,
          required: false,
        },
        details: {
          type: String,
          required: false,
        },
      },
    ],
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    details: {
      type: String,
      required: true,
    },
    sold: {
      type: Number,
      default: 0,
    },
    discount: {
      type: Number,
      default: 0,
    },
    tags: [
      {
        type: String,
        default: null,
      },
    ],
    reviews: { type: Number },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
