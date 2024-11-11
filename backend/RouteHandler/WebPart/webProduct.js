const express = require("express");
const router = express.Router();
const Product = require("../../Schemas/Product/product");
const userId = require("../../Middleware/userId");

router.get("/get-all-products", userId, async (req, res) => {
  const { page, limit } = req.query;
  const totalProducts = await Product.estimatedDocumentCount();
  try {
    const result = await Product.find(
      {},
      {
        name: 1,
        price: 1,
        category: 1,
        brand: 1,
        details: 1,
        images: 1,
      }
    )
      .skip(page * limit)
      .limit(limit)
      .exec();
    res.json({
      success: true,
      message: "Successfully Loaded Data",
      status_code: 200,
      result,
      totalProducts,
    });
  } catch (error) {
    res.json(error);
  }
});

router.post("/get-products-by-cat", async (req, res) => {
  const { page, limit } = req.query;
  const id = req.body.categoryId;
  let query = {};
  if (id) query = { category: id };
  const totalProducts = await Product.estimatedDocumentCount();
  try {
    const result = await Product.find(query, {
      name: 1,
      price: 1,
      category: 1,
      brand: 1,
      details: 1,
      images: 1,
    })
      .populate("category")
      .skip(page * limit)
      .limit(limit)
      .exec();
    const catName = totalProducts === result.length ? "All Category" : result[0].category.name;

    res.json({
      success: true,
      message: "Successfully Loaded Data",
      status_code: 200,
      result,
      catName,
      totalProducts,
    });
  } catch (error) {
    res.json(error);
  }
});

router.get("/get-product-details/:id", async (req, res) => {
  const id = req.params.id;
  const filter = { _id: id };
  try {
    const result = await Product.findOne(filter).populate("category");
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
