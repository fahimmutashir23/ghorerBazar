const express = require("express");
const router = express.Router();
const Cart = require("../../Schemas/Cart/cart");
const userId = require("../../Middleware/userId");

router.post("/save-cart", userId, async (req, res) => {
  const userId = req.userId
  console.log(userId);
  try {
    const info = {
      ...req.body,
      userId: req.userId,
    };

    const checkExist = await Cart.findOne({productId: req.body.productId, userId: req.userId})
    if(checkExist){
      return res.json({
        status_code: 401,
        message: 'This product is already added'
      })
    }

    const newCart = new Cart(info);

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

router.get("/get-cart", async (req, res) => {
  const userId = req.cookies.userId;
  try {
    const productDetails = await Cart.find({ userId });
    const [totalAmount] = await Cart.aggregate([
      {
        $match: { userId },
      },
      {
        $addFields: {
          totalAmount: { $multiply: ["$price", "$quantity"] },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$totalAmount" },
        },
      },
    ]);

    res.json({
      status_code: 200,
      message: "Successfully Loaded Data",
      result: productDetails,
      totalAmount: totalAmount?.total || 0,
    });
  } catch (error) {
    res.json(error);
  }
});

router.get("/get-total-cart", async (req, res) => {
  const userId = req.cookies.userId;
  try {
    const totalProduct = await Cart.countDocuments({ userId });

    res.json({
      status_code: 200,
      message: "Successfully Loaded Data",
      totalProduct,
    });
  } catch (error) {
    res.json(error);
  }
});

router.put("/update-cart/:id", async (req, res) => {
  // const userId = req.cookies.userId;
  const id = req.params.id;
  const { quantity } = req.body;

  if (quantity < 1) {
    return res.status(400).json({ message: "Quantity must be at least 1" });
  }
  try {
    const totalProduct = await Cart.updateOne(
      { _id: id },
      {
        $set: {
          quantity,
        },
      }
    );

    res.json({
      status_code: 200,
      message: "Successfully Loaded Data",
      totalProduct,
    });
  } catch (error) {
    res.json(error);
  }
});

router.delete("/delete-cart/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const result = await Cart.deleteOne({
      userId: req.cookies.userId,
      _id: id,
    });

    if (result) {
      res.json({
        success: true,
        status_code: 200,
        message: "Successfully Loaded Data",
      });
    }
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
