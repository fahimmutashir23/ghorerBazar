const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const loginCheck = require("../../Middleware/checkLogin");
const User = require("../../Schemas/User/userSchema");
const Role = require("../../Schemas/Role/role");
const {
  upload,
  compressImage,
} = require("../../Utils/Multer/uploadUpdateProfile");
const getUserInfo = require("../../Utils/getUserInfo");

router.get("/get-users", loginCheck, async (req, res) => {
  const { page, limit, email, phone } = req.query;
  let query = {};
  if (phone) query.phone = phone;
  if (email) query.email = email;

  try {
    const result = await User.find(query)
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

router.get("/get-create-users", loginCheck, async (req, res) => {
  const userInfo = await getUserInfo(req.user.userId);

  try {
    if (userInfo.role === "super admin") {
      const result = await Role.find(
        { roleName: { $nin: ["super admin"] } },
        "roleName -_id"
      ).exec();
      res.json({
        success: true,
        message: "Successfully Loaded Data",
        status_code: 200,
        result: result,
      });
    } else {
      const result = await Role.find(
        { roleName: { $nin: ["super admin", "admin"] } },
        "roleName -_id"
      ).exec();
      res.json({
        success: true,
        message: "Successfully Loaded Data",
        status_code: 200,
        result: result,
      });
    }
  } catch (error) {
    res.json(error);
  }
});

router.post("/create-users", loginCheck, async (req, res) => {
  upload.array("image", 1)(req, res, async (err) => {
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

      const newUser = new User(req.body);
      newUser.image = req.files ? req.files[0].filename : null;

      const filterMail = { email: newUser.email };
      const filterPhone = { phone: newUser.phone };

      const findMail = await User.findOne(filterMail);
      if (findMail) {
        return res.json({ message: "Email already exist", status_code: 409 });
      }
      const findPhone = await User.findOne(filterPhone);
      if (findPhone) {
        return res.json({ message: "Phone already exist", status_code: 409 });
      }

      console.log(newUser);

      const result = await newUser.save();
      res.json({
        success: true,
        result: result,
        message: "User Create Successfully",
        status_code: 200,
      });
    } catch (error) {
      res.json({
        success: false,
        message: error,
      });
    }
  });
});

router.delete("/delete-user/:id", loginCheck, async (req, res) => {
  try {
    const id = req.params.id;
    const filter = { _id: id };
    const result = await User.findOneAndDelete(filter);
    res.json({
      success: true,
      status_code: 201,
      message: "User Delete Successfully",
    });
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
