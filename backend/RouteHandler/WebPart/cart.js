const express = require("express");
const router = express.Router();
const Cart = require("../../Schemas/Cart/cart");

router.post("/save-cart", async (req, res) => {
  try {
    const newCart = new Cart(req.body);
    
    const result = await newCart.save();
    if (result) {
      res.json({
        status_code: 200,
        message: "Added Successfully",
      });
    }
  } catch (error) {
    res.json(error);
  }
});

router.get("/get-cart/:id", async (req, res) => {
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

router.post("/delete-cart", async (req, res) => {
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
