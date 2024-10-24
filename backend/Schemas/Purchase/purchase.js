const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const purchaseSchema = new mongoose.Schema(
  {
    category_id: {
      type: Schema.Types.ObjectId,
      ref: "PurchaseCategory",
      required: true,
    },
    name: {
      type: String,
      required: [true, "Please Enter Your Name"],
    },
    brand_id: {
      type: Schema.Types.ObjectId,
      ref: "Brand",
      required: true,
    },
    model: {
      type: String,
      required: [true, "Please Enter Model Name"],
    },
    warranty: {
      type: Date,
      default: null,
    },
    stockAlert: {
      type: Number,
      default: 0,
    },
    unitPrice: {
      type: Number,
      required: [true, "Please Enter price"],
    },
    totalPrice: {
      type: Number,
      required: [true, "Please Enter Total Price"],
    },
    quantity: {
      type: Number,
      required: true,
    },
    details: {
      type: String,
      required: true,
    },
    images: {
      type: Array,
      required: true,
    },
    status: {
      type: String,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Stock", purchaseSchema);
