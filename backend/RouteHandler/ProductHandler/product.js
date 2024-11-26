const express = require("express");
const router = express.Router();
const loginCheck = require("../../Middleware/checkLogin");
const Product = require("../../Schemas/Product/product");
const Booking = require("../../Schemas/Bookings/bookings");
const { upload, compressImage } = require("../../Utils/multerUpload");

router.post("/create-product", loginCheck, async (req, res) => {
  upload.fields([
    { name: "images", maxCount: 10 },
    { name: "imgArrImages", maxCount: 10 },
  ])(req, res, async (err) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }

    try {
      // Compress Images
      if (req.files.images && req.files.images.length > 0) {
        await compressImage(req, res, () => {});
      }
      if (req.files.imgArrImages && req.files.imgArrImages.length > 0) {
        await compressImage(req, res, () => {});
      }

      // parsing data
      const price = JSON.parse(req.body.price);
      const imgArrDetails = JSON.parse(req.body.imgArrDetails);

      // create img arr with filename
      const imgDetails = req.files.imgArrImages.map((file, index) => ({
        img: file.filename,
        details: imgArrDetails[index] || "", // Match with provided details
      }));
      const images =  req.files.images
      ? req.files.images.map((file) => file.filename)
      : [];
      
      // manipulate data
      const data = {...req.body, price, imgDetails, images}

      
      // validate schema
      const newProduct = new Product(data);
        
      const result = await newProduct.save();
      res.status(200).json({
        success: true,
        message: "Product created successfully",
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

router.get("/get-product-list", async (req, res) => {
  const { page, limit } = req.query;
  try {
    const result = await Product.find()
      .populate("category")
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
    res.json(error);
  }
});

router.get("/get-hot-product-list", async (req, res) => {
  try {
    const result = await Product.find().sort({ sale: -1 }).limit(10).exec();
    res.json({
      message: "Successfully Loaded Data",
      status_code: 200,
      result: result,
    });
  } catch (error) {
    res.json(error);
  }
});

router.get("/get-single-product/:id", async (req, res) => {
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
  upload.fields([
    { name: "images", maxCount: 10 },
    { name: "imgArrImages", maxCount: 10 },
  ])(req, res, async (err) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }

    try {
      const product = await Product.findById(req.params.id);

      // Compress Images
      if (req.files.images && req.files.images.length > 0) {
        await compressImage(req, res, () => {});
      }
      if (req.files.imgArrImages && req.files.imgArrImages.length > 0) {
        await compressImage(req, res, () => {});
      }

      // parsing data
      const price = JSON.parse(req.body.price);
      const imgArrDetails = JSON.parse(req.body.imgArrDetails);

      // create img arr with filename
      const imgDetails = req.files.imgArrImages
      ? req.files.imgArrImages.map((file, index) => ({
          img: file.filename,
          details: imgArrDetails[index] || "",
        }))
      : product.imgDetails;
      const images = req.files.images
        ? req.files.images.map((file) => file.filename)
        : product.images;
      
      // manipulate data
      const data = {...req.body, price, imgDetails, images}
      const filter = {_id : req.params.id}

      const updatedDoc = {
        $set: {
          name: data.name,
          brand: data.brand,
          price: data.price,
          category: data.category,
          stock: data.stock,
          tags: data.tags,
          discount: data.discount,
          details: data.details,
        }
      }


      const result = await Product.findOneAndUpdate(filter,updatedDoc);
      res.status(200).json({
        status_code: 200,
        success: true,
        message: "Product Update successfully",
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
        Revenue: 0,
      },
    });
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
