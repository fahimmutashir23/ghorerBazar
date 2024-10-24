const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
  roleName: {
    type: String,
    required: true,
  },
  permissions: {
    type: Array,
    require: true
  },
  roleGroup: {
    type: Array
  }
}, {timestamps: true});

module.exports = mongoose.model("Role", roleSchema);
