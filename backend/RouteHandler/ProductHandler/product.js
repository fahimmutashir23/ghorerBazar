const express = require("express");
const router = express.Router();
const loginCheck = require("../../Middleware/checkLogin");
const Product = require('../../Schemas/Product/product');
const Booking = require('../../Schemas/Bookings/bookings');
const { upload, compressImage } = require("../../Utils/multerUpload");


router.post("/create-product", loginCheck, async (req, res) => {
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

      const newProduct = new Product(req.body);
      newProduct.images = req.files ? req.files.map(file => file.filename) : [];
      const result = await newProduct.save();
      res.status(200).json({
        success: true,
        message: "Product created successfully",
        data: result,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to create service',
        error: error,
      });
    }
  });
  });
  
  router.get("/get-product-list", loginCheck, async (req, res) => {
    const {page, limit} = req.query;
    try {
      const result = await Product.find().skip(page*limit).limit(limit).exec();
      res.json({
        success: true,
        message: "Successfully Loaded Data",
        status_code: 200,
        result: result,
      });
    } catch (error) {
      res.json(error);
    }
  });

  router.get("/get-hot-product-list", loginCheck, async (req, res) => {
    try {
      const result = await Product.find().sort({sale: -1}).limit(10).exec();
      res.json({
        message: "Successfully Loaded Data",
        status_code: 200,
        result: result,
      });
    } catch (error) {
      res.json(error);
    }
  });
  
  router.get("/get-single-product/:id", loginCheck, async (req, res) => {
    const id = req.params.id;
    const filter = { _id: id };
    try {
      const result = await Product.findOne(filter);
      res.json({
        message: "Successfully Loaded Data",
        status_code: 200,
        result: result,
      });
    } catch (error) {
      res.json(error);
    }
  });
  
  router.put("/update-product/:id", loginCheck, async (req, res) => {
    const id = req.params.id;
    const info = req.body;
    const filter = { _id: id };
    const updateDoc = {
      $set: {
        name: info.name,
        price: info.price,
        brand: info.brand,
        image: info.image,
      },
    };
  
    try {
      const result = await Product.findOneAndUpdate(filter, updateDoc, {
        new: true,
      });
      res.json({
        message: "Successfully Updated",
        status_code: 200,
        result: result,
      });
    } catch (error) {
      res.json(error);
    }
  });
  
  router.delete("/delete-product/:id", loginCheck, async (req, res) => {
    const id = req.params.id;
    const filter = { _id: id };
    try {
      const result = await Product.findOneAndDelete(filter);
      res.json({
        status_code: 201,
        message: "Product Delete Successfully",
      });
    } catch (error) {
      res.json(error);
    }
  });

  router.get("/get-stat-report", loginCheck, async (req, res) => {

    try {
      const product = await Product.find();
      const bookings = await Booking.find();

      res.json({
        status_code: 201,
        message: "Successfully Loaded Data",
        result: {
          totalProduct: product.length,
          totalBookings: bookings.length,
          TotalSale: 0,
          Revenue: 0
        }
      });
    } catch (error) {
      res.json(error);
    }
  });

  module.exports = router