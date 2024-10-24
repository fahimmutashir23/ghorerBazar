const express = require("express");
const router = express.Router();
const loginCheck = require("../../Middleware/checkLogin");
const Bookings = require("../../Schemas/Bookings/bookings");
const { generateOrderId } = require("../../Utils/generateOrderId");

router.post("/save-bookings", async (req, res) => {
  const orderId = await generateOrderId();
  try {
    const newBookings = new Bookings(req.body);
    newBookings.invoiceId = orderId;
    const result = await newBookings.save();
    if (result) {
      const productDetails = await Bookings.findById(result._id)
        .populate("products.productId")
        .exec();
        
      res.json({
        status_code: 200,
        message: "Bookings Successfully",
        result: productDetails,
      });
    }
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

module.exports = router;
