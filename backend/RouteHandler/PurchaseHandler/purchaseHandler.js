const express = require("express");
const router = express.Router();
const loginCheck = require("../../Middleware/checkLogin");
const Purchase = require("../../Schemas/Purchase/purchase");
const { upload, compressImage } = require("../../Utils/multerUpload");

router.post("/create-stock", loginCheck, async (req, res) => {
  upload.array("images", 10)(req, res, async (err) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }

    try {
      if (req.files && req.files.length > 0) {
        await compressImage(req, res, () => {});
      }

      const newPurchase = new Purchase(req.body);
      newPurchase.images = req.files
        ? req.files.map((file) => file.filename)
        : [];
      const result = await newPurchase.save();
      res.status(200).json({
        success: true,
        message: "Purchase created successfully",
        data: result,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to create service",
        error: error,
      });
    }
  });
});

router.get("/get-stock-list", loginCheck, async (req, res) => {
  const { page, limit, id } = req.query;
  let query = {};
  if (id) query.category_id = id;

  try {
    const result = await Purchase.find(query)
      .populate("category_id")
      .skip(page * limit)
      .limit(limit)
      .exec();
    res.json({
      success: true,
      message: "Successfully Loaded Data",
      status_code: 200,
      result: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create service",
      error: error,
    });
  }
});

router.get("/get-category-w-stock-list", loginCheck, async (req, res) => {
  const { page, limit, id } = req.query;

  try {
    const result = await Purchase.find({ category_id: id })
      .populate("category_id")
      .skip(page * limit)
      .limit(limit)
      .exec();
    res.json({
      success: true,
      message: "Successfully Loaded Data",
      status_code: 200,
      result: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create service",
      error: error,
    });
  }
});

router.post("/get-brand-w-stock-list", loginCheck, async (req, res) => {
  const { category_id, brandName } = req.body;

  const filters = {
    category_id,
  };

  try {
    const result = await Purchase.find(filters)
      .populate("category_id")
      .populate({
        path: 'brand_id',
      })
      .exec();

      const filteredResult = result.map(item => item.brand_id );

    res.json({
      success: true,
      message: "Successfully Loaded Data",
      status_code: 200,
      result: filteredResult,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create service",
      error: error,
    });
  }
});

router.post("/get-product-w-stock-list", loginCheck, async (req, res) => {
  const { category_id, brand_id } = req.body;

  try {
    const filter = {category_id, brand_id}
    const result = await Purchase.find(filter)
      .populate("category_id")
      .populate("brand_id")
      .exec();
    res.json({
      success: true,
      message: "Successfully Loaded Data",
      status_code: 200,
      result: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create service",
      error: error,
    });
  }
});

router.get("/get-product-show-list", loginCheck, async (req, res) => {
  const {id} = req.query;

  try {
    const result = await Purchase.findById(id)
      .populate("category_id")
      .populate("brand_id")
      .exec();
    res.json({
      success: true,
      message: "Successfully Loaded Data",
      status_code: 200,
      result: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create service",
      error: error,
    });
  }
});

router.put("/update-stock/:id", loginCheck, async (req, res) => {
  const id = req.params.id;
  const info = req.body;

  const updateDoc = {
    $set: {
      unitPrice: info.amount,
      quantity: info.quantity,
    },
  };

  try {
    const result = await Purchase.findByIdAndUpdate(id, updateDoc, {
      new: true,
    });
    res.json({
      success: true,
      message: "Successfully Updated",
      status_code: 200,
      result: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create service",
      error: error,
    });
  }
});

router.delete("/delete-stock/:id", loginCheck, async (req, res) => {
  const id = req.params.id;
  const filter = { _id: id };
  try {
    const result = await Purchase.findOneAndDelete(filter);
    res.json({
      status_code: 201,
      message: "Purchase Delete Successfully",
    });
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
