const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Review = require("../../Schemas/Product/productReview");
const Product = require("../../Schemas/Product/product");

router.post("/save-review", async (req, res) => {
  const newProduct = new Review(req.body);
  try {
    const result = await newProduct.save();
    if(result){
      const [avgReview] = await Review.aggregate([
        {
          $match: { productId: new mongoose.Types.ObjectId(newProduct.productId) }
        },
        {
          $group: {
            _id: "$productId",
            averageRating: { $avg: "$rating" },
            count: { $sum: 1 },
          },
        },
        {
          $sort: { averageRating: -1 },
        },
      ]);

      const updateDoc = {
        $set : {
          reviews : avgReview.averageRating.toFixed(2)
        }
      }
      await Product.findByIdAndUpdate(newProduct.productId, updateDoc)
    }
    res.json({
      status_code: 200,
      message: "Review send successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.get("/get-product-reviews", async (req, res) => {
  const id = req.query.id;
  let query = {};
  if(id !== 'null'){
    query.productId = id
  }

  try {
    const result = await Review.find(query);
    const [avgReview] = await Review.aggregate([
      {
        $match: { productId: new mongoose.Types.ObjectId(id) }
      },
      {
        $group: {
          _id: "$productId",
          averageRating: { $avg: "$rating" },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { averageRating: -1 },
      },
    ]);

    res.json({
      status_code: 200,
      message: "Successfully Loaded Data",
      result,
      avgReview
    });
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
