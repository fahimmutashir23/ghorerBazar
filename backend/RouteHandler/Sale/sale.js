const express = require("express");
const router = express.Router();
const loginCheck = require("../../Middleware/checkLogin");
const Stock = require("../../Schemas/Purchase/purchase");
const Sale = require("../../Schemas/Sale/sale");
const { generateInvoiceId } = require("../../Utils/generateOrderId");

const decrementMultipleProducts = async (products) => {
  try {
    const bulkOps = products.products.map((product) => ({
      updateOne: {
        filter: {
          _id: product.product_id,
          quantity: { $gte: product.quantity },
        },
        update: { $inc: { quantity: -product.quantity } },
      },
    }));

    const result = await Stock.bulkWrite(bulkOps);

    if (result.modifiedCount !== products.products.length) {
      throw "One or more products not found or insufficient quantity";
    }
    return result;
  } catch (error) {
    throw error;
  }
};

router.post("/create-sale", loginCheck, async (req, res) => {
  try {
    const newPurchase = new Sale(req.body);
    newPurchase.invoiceId = await generateInvoiceId()
    const result = await newPurchase.save();
    const reduceStock = await decrementMultipleProducts(newPurchase);

    res.status(200).json({
      success: true,
      message: "Purchase created successfully",
      result
    });
  } catch (error) {
    res.status(500).json({
      success: false, 
      message: "Failed to create service",
      error: error,
    });
  }
});

router.get("/get-sale-list", loginCheck, async (req, res) => {
  const pipeline = [
    {
      $unwind: {
        path: "$products",
      },
    },
    {
      $group: {
        _id: "$_id",
        allUnitPrice: {
          $sum: "$products.unitPrice",
        },
        allQuantity: {
          $sum: "$products.quantity",
        },
      },
    },
  ];

  try {
    const { page, limit } = req.query;
    const result = await Sale.find()
      .populate("products.product_id")
      .skip(page * limit)
      .limit(limit)
      .exec();
    const calculate = await Sale.aggregate(pipeline)

    res.status(200).json({
      success: true,
      message: "Data loaded successfully",
      result: result,
      totalData: calculate
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to loaded data",
      error: error,
    });
  }
});

router.get("/get-singleSale/:id", loginCheck, async (req, res) => {
  const pipeline = [
    {
      $unwind: {
        path: "$products",
      },
    },
    {
      $group: {
        _id: "$_id",
        allUnitPrice: {
          $sum: "$products.unitPrice",
        },
        allQuantity: {
          $sum: "$products.quantity",
        },
      },
    },
  ];

  try {
    const id = req.params.id;
    const result = await Sale.findById(id)
      .populate("products.product_id")
      .exec();
    const calculate = await Sale.aggregate(pipeline)

    res.status(200).json({
      success: true,
      message: "Data loaded successfully",
      result: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to loaded data",
      error: error,
    });
  }
});

module.exports = router;
