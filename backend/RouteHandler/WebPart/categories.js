const express = require("express");
const router = express.Router();
const Category = require("../../Schemas/Category/category");

router.get("/get-category", async (req, res) => {
  try {
    const result = await Category.find().exec();
    res.json({
      status_code: 200,
      message: "Successfully Loaded Data",
      result: result,
    });
  } catch (error) {
    res.json(error);
  }
});

router.get("/get-category/:id", async (req, res) => {
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

module.exports = router;
