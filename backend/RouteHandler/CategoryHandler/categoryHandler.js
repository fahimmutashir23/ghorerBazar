const express = require("express");
const router = express.Router();
const loginCheck = require("../../Middleware/checkLogin");
const Category = require("../../Schemas/Category/category");

router.post("/create-category", loginCheck, async (req, res) => {
  const newProduct = new Category(req.body);
  try {
    const result = await newProduct.save();
    res.json({
      status_code: 200,
      message: "Category Create Successfully",
      result: result,
    });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: "Category name already exists" });
    } else {
      res.status(500).json({ message: error });
    }
  }
});

router.get("/get-category-list", loginCheck, async (req, res) => {
  try {
    const { page, limit } = req.query;
    const result = await Category.find()
      .skip(page * limit)
      .limit(limit)
      .exec();
    res.json({
      status_code: 200,
      message: "Successfully Loaded Data",
      result: result,
    });
  } catch (error) {
    res.json(error);
  }
});

router.get("/get-single-category/:id", loginCheck, async (req, res) => {
  const id = req.params.id;
  const filter = { _id: id };
  try {
    const result = await Category.findOne(filter);
    res.json({
      status_code: 200,
      message: "Successfully Loaded Data",
      result: result,
    });
  } catch (error) {
    res.json(error);
  }
});

router.put("/update-category/:id", loginCheck, async (req, res) => {
  const id = req.params.id;
  const info = req.body;
  const filter = { _id: id };
  const updateDoc = {
    $set: {
      name: info.name,
    },
  };

  try {
    const result = await Category.findOneAndUpdate(filter, updateDoc, {
      new: true,
    });
    res.json({
      status_code: 200,
      message: "Successfully Updated",
      result: result,
    });
  } catch (error) {
    res.json(error);
  }
});

router.delete("/delete-category/:id", loginCheck, async (req, res) => {
  const id = req.params.id;
  const filter = { _id: id };
  try {
    const result = await Category.findOneAndDelete(filter);
    res.json({
      status_code: 201,
      message: "Category Delete Successfully",
    });
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
