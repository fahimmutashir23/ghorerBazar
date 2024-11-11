const express = require("express");
const router = express.Router();
const Bookings = require("../../Schemas/Bookings/bookings");
const Products = require("../../Schemas/Product/product");
const { generateOrderId } = require("../../Utils/generateOrderId");
const deleteCartData = require("./Partial/deleteCartABook");
const loginCheck = require("../../Middleware/checkLogin");

router.post("/save-bookings", async (req, res) => {
  const invoiceId = await generateOrderId();
  const userId = req.cookies.userId;
  try {
    const info = {
      ...req.body, userId, invoiceId
    }

    const newBookings = new Bookings(info);
    const result = await newBookings.save();
    if (result) {
      const productDetails = await Bookings.findById(result._id)
        .populate("products.productId")
        .exec();
      if(productDetails){

        deleteCartData(userId);
          res.json({
            status_code: 200,
            message: "Bookings Successfully",
            result: productDetails,
          });
      }
    }
  } catch (error) {
    res.json(error);
  }
});

router.post("/get-bookings-w-id", loginCheck, async (req, res) => {
  try {
    const invoiceId = req.body.invoiceId;
    const result = await Bookings.findOne({ invoiceId })
    .populate('products.productId')
    .exec();
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
