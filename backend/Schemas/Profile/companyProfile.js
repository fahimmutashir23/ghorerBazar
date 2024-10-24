const mongoose = require("mongoose");

const companyProfileSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    ownerName: {
      type: String,
      required: true,
    },
    address: {
      shopName : {
        type: String,
        require: true
      },
      map: {
        type: String,
        default: null
      },
      phone: {
        phone1: {type: Number, require: true},
        phone2: {type: Number, default: null}
      },
      email: {type: String, default: null}
    },
    logo: {
      type: Array,
      default: null
    },
    category: {
      type: String,
      required: true,
    },
    details: {
      type: String,
      required: true,
    }
  }, {timestamps : true});

  module.exports = mongoose.model("CompanyProfile", companyProfileSchema)