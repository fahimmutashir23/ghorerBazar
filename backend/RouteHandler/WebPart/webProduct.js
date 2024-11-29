const express = require("express");
const router = express.Router();
const Product = require("../../Schemas/Product/product");
const userId = require("../../Middleware/userId");

router.get("/get-all-products", userId, async (req, res) => {
  const { page, limit, search } = req.query;
  const totalProducts = await Product.estimatedDocumentCount();
  let query = {};
  if (search !== "null") {
    query = {
      $or: [
        { name: { $regex: search, $options: "i" } },
        { brand: { $regex: search, $options: "i" } },
      ],
    };
  }

  try {
    const result = await Product.find(query, {
      name: 1,
      price: 1,
      category: 1,
      brand: 1,
      details: 1,
      images: 1,
      stock: 1,
      sold: 1,
      discount: 1,
    })
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
  const { id, price } = req.body;
  let query = {};
  if (id.length !== 0)
    query = { ...query, category: Array.isArray(id) ? { $in: id } : id };
  if (price) query = { ...query, price: { $lte: price } };

  const totalProducts = await Product.estimatedDocumentCount();
  try {
    const result = await Product.find(query, {
      name: 1,
      price: 1,
      category: 1,
      brand: 1,
      details: 1,
      images: 1,
      reviews: 1
    })
      .populate("category")
      .skip(page * limit)
      .limit(limit)
      .exec();
    const catName =
      totalProducts === result.length
        ? "All Category"
        : result[0].category.name;

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

router.get("/get-products/:id", async (req, res) => {
  const id = req.params.id;
  let query = {};
  if (id !== "null") {
    query = { category: id };
  }

  try {
    const result = await Product.find(query, {
      name: 1,
      price: 1,
      category: 1,
      brand: 1,
      details: 1,
      images: 1,
      discount: 1,
      reviews: 1
    }).populate("category");

    res.json({
      success: true,
      message: "Successfully Loaded Data",
      status_code: 200,
      result,
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
