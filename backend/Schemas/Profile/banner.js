const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema({
    banner: {
      type: Array,
      require: true,
    },
    isActive: {
      type: Boolean,
      require: false,
    },
  }, {timestamps : true});

  module.exports = mongoose.model("Banner", bannerSchema)