const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookingsSchema = new mongoose.Schema({
    invoiceId: {
      type: String,
    },
    name: {
      type: String,
      required: [true, 'Please Enter Your Name'],
    },
    phone: {
      type: String,
      required: [true, 'Please Enter Your Number'],
    },
    email: {
      type: String,
      required: [true, 'Please Enter Your email'],
    },
    address: {
      type: String,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    deliveryCharge: {
      type: Number,
      required: true,
    },
    products: {
      type: Array,
      require: true
    },
    details: {
      type: String,
      required: true,
    },
    status: {
        type: String,
      default: 'pending'
    },
  }, {timestamps : true});

  module.exports = mongoose.model("Booking", bookingsSchema)