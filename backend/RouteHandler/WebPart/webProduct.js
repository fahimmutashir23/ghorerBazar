const express = require("express");
const router = express.Router();
const Product = require("../../Schemas/Product/product");
const userId = require("../../Middleware/userId");

router.get("/get-all-products", userId, async (req, res) => {
  const { page, limit } = req.query;
  const totalProducts = await Product.estimatedDocumentCount();
  try {
    const result = await Product.find({}, {
        name: 1,
        price: 1,
        category: 1,
        brand: 1,
        details: 1,
        images: 1,
    })
      .skip(page * limit)
      .limit(limit)
      .exec();
    res.json({
      success: true,
      message: "Successfully Loaded Data",
      status_code: 200,
      result,
      totalProducts
    });
  } catch (error) {
    res.json(error);
  }
});

router.get("/get-product/:id", async (req, res) => {
  const id = req.params.id;
  const filter = { _id: id };
  try {
    const result = await Product.findOne(filter);
    res.json({
      message: "Successfully Loaded Data",
      status_code: 200,
      result: result,
    });
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
