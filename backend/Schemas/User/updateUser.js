const mongoose = require('mongoose');


const updateUserSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    phone: {
        type: Number,
    },
    email : {
        type: String,
    },
    address : {type: String},
    gender : {type: String},
    image : {type: String},
}, {timestamps: true})

module.exports = updateUserSchema;


