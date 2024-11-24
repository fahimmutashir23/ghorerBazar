const express = require("express");
const router = express.Router();
const Review = require("../../Schemas/Product/productReview");

router.post("/save-review", async (req, res) => {
  const newProduct = new Review(req.body);
  try {
    const result = await newProduct.save();
    res.json({
      status_code: 200,
      message: "Review send successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.get("/get-reviews", async (req, res) => {
  const id = req.query.id;
  let query = {};
  if(id !== 'null'){
    query.productId = id
  }

  console.log(id, query);
  try {
    const result = await Review.find(query);
    const [avgReview] = await Review.aggregate([
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
