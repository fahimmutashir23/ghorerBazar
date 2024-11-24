const express = require("express");
const router = express.Router();
const loginCheck = require("../../Middleware/checkLogin");
const Contact = require("../../Schemas/Contact/contact");

router.post("/save-contact", async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    const result = await newContact.save();
    if (result) {
      res.json({
        success: true,
        status_code: 200,
        message: "Send Successfully",
        result: result,
      });
    }
  } catch (error) {
    res.json(error);
  }
});

router.get("/get-contact-list", loginCheck, async (req, res) => {
  try {
    const { page, limit } = req.query;
    let query = {};
    const phone = parseInt(req.query.phone);
    if (phone) query.phone = phone;

    const result = await Contact.find(query)
      .skip(page * limit)
      .limit(limit)
      .exec();
    if(result){
      res.json({
        success : true,
        status_code: 200,
        message: "Successfully Loaded Data",
        result: result,
      });
    }
  } catch (error) {
    res.json(error);
  }
});

router.get("/get-single-contact/:id", loginCheck, async (req, res) => {
  const id = req.params.id;
  const filter = { _id: id };
  try {
    const result = await Category.findOne(filter);
    res.json({
      status_code: 200,
      message: "Successfully Loaded Data",
      result: result,
    });
  } catch (error) {
    res.json(error);
  }
});

router.post("/get-contact-w-phone", async (req, res) => {
  try {
    const phone = parseInt(req.body.phone);
    const result = await Contact.find({ phone }).exec();
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
