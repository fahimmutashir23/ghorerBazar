const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const loginCheck = require("../../Middleware/checkLogin");
const User = require('../../Schemas/User/userSchema');
const Role = require('../../Schemas/Role/role');
const Profile = require('../../Schemas/Profile/companyProfile');
const { upload, compressImage } = require("../../Utils/Multer/profileLogo");


router.get("/profile", loginCheck,  async (req, res) => {
  const id = req.user.userID;
 
  try {
    const result = await User.findOne({id}).exec();
    const role = await Role.findOne({roleName : result.role})
    const data = { ...result, userPermissionData : role.permissions }
    if(result){
      res.json({
        success: true,
        message: "Successfully Loaded Data",
        status_code: 200,
        result: data
      });
    }
  } catch (error) {
    res.json(error);
  }
});

router.patch("/profile-update", loginCheck, async (req, res) => {
    const filter = {_id : req.user.userID}
    upload.array("images", 1)(req, res, async (err) => {
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
          
          const newProduct = (req.body);
          
          const updateDoc = {
            $set: {
                name: newProduct.name,
                phone: newProduct.phone,
                gender: newProduct.gender,
                address: newProduct.address,
            }
          }

          if (req.files && req.files.length > 0) {
            updateDoc.$set.image = req.files[0].filename;
          }

          const result = await User.findOneAndUpdate(filter, updateDoc, {
            new: true,
          });
          res.status(200).json({
            success: true,
            message: "Profile Update successfully",
            result: result,
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


  // Company Profile
  router.post("/create-company-profile", loginCheck, async(req, res) => {
    upload.array("logo", 1)(req, res, async (err) => {
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
  
        const newProduct = new Profile(req.body);
        newProduct.logo = req.files ? req.files.map(file => file.filename) : [];

        const result = await newProduct.save();
        res.status(200).json({
          success: true,
          message: "Profile created successfully",
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
  })

  router.put("/edit-company-profile/:id", loginCheck, async(req, res) => {
    const id = req.params.id

    upload.array("logo", 1)(req, res, async (err) => {
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
  
        const update = req.body;

        const updatedDoc = {
          $set : {
            name: update.name,
            address: {
              shopName : update.shopName,
              phone: {phone1: update.phone1, phone2: update.phone2},
              map: update.map,
              email: update.email
            },
            ownerName : update.ownerName,
            category: update.category,
            details: update.details,
          }
        }

        if (req.files && req.files.length > 0) {
          updatedDoc.$set.logo = req.files ? req.files.map(file => file.filename) : []
        }

        const result = await Profile.findOneAndUpdate({_id: id}, updatedDoc, {new: true});
        res.status(200).json({
          success: true,
          message: "Profile Update successfully",
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
  })

  router.get("/get-company-profile",  async (req, res) => {
   
    try {
      const result = await Profile.find().exec();
      if(result){
        res.json({
          success: true,
          message: "Successfully Loaded Data",
          status_code: 200,
          result: result[0]
        });
      }
    } catch (error) {
      res.json(error);
    }
  });

module.exports = router;
