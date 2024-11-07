const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    images: {
      type: Array,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },  
    details: {
      type: String,
      required: true,
    },
    sold: {
      type: Number,
      default: 0
    },
    stock: {
      type: Number,
      require: true
    },
    discount: {
      type: Number,
      default: 0
    },
    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Tag'
      }
    ],
    reviews: [
      {
        userName: String,
        comment: String,
        rating: {
          type: Number,
          min: 1,
          max: 5
        },
        createdAt: {
          type: Date,
          default: Date.now
        }
      }
    ],
  }, {timestamps : true});

  module.exports = mongoose.model("Product", productSchema)