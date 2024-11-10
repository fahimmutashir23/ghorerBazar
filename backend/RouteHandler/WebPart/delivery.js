const express = require("express");
const router = express.Router();
const Delivery = require("../../Schemas/Develivery/deliveryCharge");

router.post("/create-delivery-charge" , async (req, res) => {
  const newProduct = new Delivery(req.body);
  try {
    const result = await newProduct.save();
    res.json({
      status_code: 200,
      message: "Delivery Create Successfully",
      result: result,
    });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: "Delivery name already exists" });
    } else {
      res.status(500).json({ message: error });
    }
  }
});

router.get("/get-delivery-charge-list", async (req, res) => {
  try {
    const { page, limit } = req.query;
    const result = await Delivery.find()
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

router.put("/update-delivery-charge/:id",  async (req, res) => {
  const id = req.params.id;
  const info = req.body;
  const filter = { _id: id };
  const updateDoc = {
    $set: {
      name: info.name,
      amount: info.amount,
    },
  };

  try {
    const result = await Delivery.findOneAndUpdate(filter, updateDoc, {
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

router.delete("/delete-delivery-charge/:id", async (req, res) => {
  const id = req.params.id;
  const filter = { _id: id };
  try {
    const result = await Delivery.findOneAndDelete(filter);
    res.json({
      status_code: 201,
      message: "Delivery Delete Successfully",
    });
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
