const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookingsSchema = new mongoose.Schema({
    userId: {
      type: String,
      require: true
    },
    invoiceId: {
      type: String,
      require: true
    },
    name: {
      type: String,
      required: [true, 'Please Enter Your Name'],
    },
    phone: {
      type: Number,
      required: [true, 'Please Enter Your Number'],
    },
    email: {
      type: String,
      default: null
    },
    address: {
      type: String,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    products: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        }
      }
    ],
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