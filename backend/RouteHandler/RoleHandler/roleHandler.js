const express = require("express");
const router = express.Router();
const loginCheck = require("../../Middleware/checkLogin");
const Role = require("../../Schemas/Role/role");
const RoleGroup = require("../../Schemas/Role/roleGroup");
const status = require("http-status");

router.get("/get-role", loginCheck, async (req, res) => {
  try {
    const result = await Role.find();
    res.status(status.OK).json({
      status_code: status.OK,
      success: true,
      message: "Successfully Loaded Data",
      result: result.length === 0 ? "No data found" : result
    });
  } catch (error) {
    res.status(status.NO_CONTENT).json({
      success: false,
      message: error.message,
    });
  }
});

router.get("/get-create-role", loginCheck, async (req, res) => {
  try {
    const result = await RoleGroup.find();
    res.status(status.OK).json({
      status_code: status.OK,
      success: true,
      message: "Successfully Loaded Data",
      data: result.length === 0 ? "No data found" : result
    });
  } catch (error) {
    res.status(status.NO_CONTENT).json({
      success: false,
      message: error.message,
    });
  }
});

router.post("/save-role", loginCheck, async (req, res) => {
  try {
    const newRole = new Role(req.body);

    const filter = { name: { $in: newRole.permissions } };
    const roleGroup = await RoleGroup.find(filter);
    newRole.roleGroup = roleGroup;
    newRole.roleName = newRole.roleName.toLowerCase();

    const findRole = await Role.findOne({
      roleName: newRole.roleName.toLowerCase()
    });

    if (!findRole) {
      const result = await newRole.save();
      res.status(200).json({
        success: true,
        message: "Role Created successfully",
        data: result,
      });
    } else {
      return res.json({ message: "This name is already exist" });
    }
  } catch (error) {
    res.status(403).json({
      success: false,
      message: error.message 
    });
  }
});

router.get("/get-edit-role/:id", loginCheck, async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Role.findById(id);
    res.status(200).json({
      success: true,
      message: "Successfully Loaded Data",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.patch("/edit-role/:id", loginCheck, async (req, res) => {
  try {
    const id = req.params.id;
    const isSuperAdmin = await Role.findOne({_id: id});
    if(isSuperAdmin.roleName === 'super admin'){
      return res.status(status.BAD_REQUEST).json({message: 'This is not modifiable', status: status.BAD_REQUEST})
    }
 
    const updates = req.body;
    const filter = { name: { $in: updates.permissions } };
    const roleGroup = await RoleGroup.find(filter);
    updates.roleGroup = roleGroup;
    updates.roleName = updates.roleName.toLowerCase();

    const result = await Role.findByIdAndUpdate(id, updates, { new: true });
    if (!result) {
      return res.status(404).json({ message: "client not found" });
    }
    res.json({
      success: true,
      status_code: 200,
      message: "Role Updated Successfully",
      result: result,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/delete-role/:id", loginCheck, async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Role.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: "Role not found" });
    }
    res.json({
      status_code: 200,
      message: "Role Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/delete-roleGroup", async(req, res) => {
  await RoleGroup.deleteMany()
})

module.exports = router;
