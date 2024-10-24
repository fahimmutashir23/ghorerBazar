const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const saleProductSchema = new mongoose.Schema({
  product_id: {
    type: Schema.Types.ObjectId,
    ref: "Stock",
    required: true,
  },
  productName: {
    type: String,
    required: [true, "Please Enter Your Name"],
  },
  brand: {
    type: String,
    required: [true, "Please Enter Brand Name"],
  },
  model: {
    type: String,
    required: [true, "Please Enter Model Name"],
  },
  unitPrice: {
    type: Number,
    required: [true, "Please Enter price"],
  },
  quantity: {
    type: Number,
    required: true,
  }
});

const saleSchema = new mongoose.Schema({
  products: [saleProductSchema],
  clientName: {
    type: String,
    required: true,
  },
  clientPhone: {
    type: String,
    required: true,
  },
  clientAdd: {
    type: String,
    default: null
  },
  makerName: {
    type: String,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  discountAmount: {
    type: Number,
    required: true,
  },
  invoiceId: {
    type: String,
    default: null
  },
  details: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    require: true,
  },
}, {timestamps: true});

module.exports = mongoose.model("Sale", saleSchema);
