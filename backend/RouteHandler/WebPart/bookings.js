const express = require("express");
const router = express.Router();
const Bookings = require("../../Schemas/Bookings/bookings");
const Product = require("../../Schemas/Product/product");
const { generateOrderId } = require("../../Utils/generateOrderId");
const deleteCartData = require("./Partial/deleteCartABook");
const loginCheck = require("../../Middleware/checkLogin");
const updateProduct = require("./Partial/updateProduct");

const checkStock = async (productIds) => {
  for (const { productId } of productIds) {
    const product = await Product.findById(productId);
    if (product && product.stock <= 0) {
      return {message: `The product with ID ${productId} is not available.`, success: false};
    }
  }
  return {message: `All products are available.`, success: true};
};

router.post("/save-bookings", async (req, res) => {
  const invoiceId = await generateOrderId();
  const userId = req.cookies.userId;
  try {
    const info = {
      ...req.body, userId, invoiceId
    }

    const qty = await checkStock(req.body.products)
    if(qty.success === false){
      res.json({
        status_code: 400,
        message: qty.message
      })
    }

    const newBookings = new Bookings(info);
    
    const result = await newBookings.save();
    if (result) {
      const productDetails = await Bookings.findById(result._id)
        .populate("products.productId")
        .exec();
      if(productDetails){
        await updateProduct(newBookings.products)
        await deleteCartData(userId);
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

router.get("/get-order", async (req, res) => {
  try {
    const phone = req.query.phone;
    const result = await Bookings.find({ phone })
    .populate('products.productId')
    .exec();
    res.json({
      success: true,
      status_code: 200,
      message: "Successfully Loaded Data",
      result,
    });
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
