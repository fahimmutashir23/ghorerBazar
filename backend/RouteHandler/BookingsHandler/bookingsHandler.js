const express = require("express");
const router = express.Router();
const loginCheck = require("../../Middleware/checkLogin");
const Bookings = require("../../Schemas/Bookings/bookings");
const { generateOrderId } = require("../../Utils/generateOrderId");

router.get("/get-bookings-list", loginCheck, async (req, res) => {
  try {
    const { page, limit, phone, invoiceId, name } = req.query;
    let query = {};
    if (phone !== "null") query.phone = { $regex: phone, $options: 'i' }
    if (invoiceId !== "null") query.invoiceId = {...query, $regex: invoiceId, $options: 'i' }
    if (name !== "null") query.name = {...query, $regex: name, $options: 'i' }
   
   

    const result = await Bookings.find(query)
      .populate("products.productId")
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

router.get("/get-single-booking/:id", loginCheck, async (req, res) => {
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

router.post("/get-bookings-w-phone", async (req, res) => {
  try {
    const phone = parseInt(req.body.phone);
    const result = await Bookings.find({ phone }).exec();
    res.json({
      success: true,
      status_code: 200,
      message: "Successfully Loaded Data",
      result: result.length === 0 ? "data not found" : result,
    });
  } catch (error) {
    res.json(error);
  }
});

router.put("/update-booking/:id", loginCheck, async (req, res) => {
  const id = req.params.id;
  const info = req.body;
  const filter = { _id: id };
  const updateDoc = {
    $set: {
      status: info.status,
    },
  };

  try {
    const result = await Bookings.findOneAndUpdate(filter, updateDoc, {
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

router.delete("/delete-booking/:id", loginCheck, async (req, res) => {
  const id = req.params.id;
  const filter = { _id: id };
  try {
    const result = await Bookings.findOneAndDelete(filter);
    res.json({
      status_code: 201,
      message: "Bookings Delete Successfully",
    });
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
