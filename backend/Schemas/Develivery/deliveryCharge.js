const mongoose = require('mongoose');


const DeliverySchema = new mongoose.Schema({
    name: {
        type: String,
        required : true,
        unique: true
    },
    amount: {
        type: Number,
        required : true,
    }
}, {timestamps: true})

module.exports = mongoose.model("Delivery", DeliverySchema);