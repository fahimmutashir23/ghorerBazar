const mongoose = require("mongoose");

const infoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  details: { type: String },
  category: { type: String, required: true }
}, {timestamps: true});

const finalExpenseSchema = new mongoose.Schema({
  expenseName: {
    type: String,
    required: true,
  },
  makerName: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default : true
  },
  expenses: [infoSchema]
}, {timestamps: true});

module.exports = mongoose.model("FinalExpense", finalExpenseSchema);


