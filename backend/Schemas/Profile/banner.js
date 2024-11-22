const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema(
  {
    banner: {
      type: Array,
      require: true,
    },
    name: {
      type: String,
      require: true,
      unique: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Banner", bannerSchema);
