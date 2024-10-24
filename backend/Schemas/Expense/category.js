const { model, Schema } = require("mongoose");

const expenseCategorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    status: {
        type: Boolean,
        default: true
    }
},{
    versionKey: false
}, {timestamps: true});

const ExpenseCategory = model("ExpenseCategory", expenseCategorySchema);

module.exports = ExpenseCategory;
