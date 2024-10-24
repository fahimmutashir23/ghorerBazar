const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'enter your name'],
    },
    phone: {
      type: Number,
      required: [true, 'enter your phone'],
    },
    email: {
      type: String,
      default: null
    },
    subject: {
      type: String,
      required: [true, 'enter your email'],
    },
    message: {
      type: String,
      required: [true, 'enter your message'],
    },
  }, {timestamps : true});

  module.exports = mongoose.model("Contact", contactSchema)