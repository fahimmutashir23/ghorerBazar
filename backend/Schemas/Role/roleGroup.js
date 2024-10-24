const mongoose = require("mongoose");

const roleGroupSchema = new mongoose.Schema({
  group_name: {
    type: String,
  },
  name: {
    type: String,
  },
}, {timestamps: true});

module.exports = mongoose.model("RoleGroup", roleGroupSchema);
