const express = require("express");
const router = express.Router();
const loginCheck = require("../../Middleware/checkLogin");
const Banner = require("../../Schemas/Profile/banner");
const { upload, compressImage } = require("../../Utils/Multer/uploadBanner");

router.post("/create-banner", loginCheck, async (req, res) => {
  upload.array("banner", 10)(req, res, async (err) => {
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

      const newProduct = new Banner(req.body);
      newProduct.banner = req.files
        ? req.files.map((file) => file.filename)
        : [];

      const result = await newProduct.save();

      res.status(200).json({
        success: true,
        message: "Banner created successfully",
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

router.get("/get-banner-list", async (req, res) => {
  try {
    const { page, limit } = req.query;
    const result = await Banner.find()
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

router.get("/get-banner", async (req, res) => {
    try {
      const { page, limit } = req.query;
      const result = await Banner.find({isActive: true})
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

router.put("/update-banner/:id", loginCheck, async (req, res) => {
  const id = req.params.id;
  const info = req.body;
  const filter = { _id: id };
  const updateDoc = {
    $set: {
      isActive: !info.status,
    },
  };

  try {
    const result = await Banner.updateOne(filter, updateDoc, {
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

router.delete("/delete-banner/:id", loginCheck, async (req, res) => {
  const id = req.params.id;
  const filter = { _id: id };
  try {
    const result = await Banner.findOneAndDelete(filter);
    res.json({
      status_code: 201,
      message: "Banner Delete Successfully",
    });
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
