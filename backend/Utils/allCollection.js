const express = require("express");
const moment = require('moment');
const router = express.Router();
const loginCheck = require("../Middleware/checkLogin");
const User = require("../Schemas/User/userSchema");
const Booking = require("../Schemas/Bookings/bookings");
const Category = require("../Schemas/Category/category");
const StockCategory = require("../Schemas/Category/purchase");
const Product = require("../Schemas/Product/product");
const Contact = require("../Schemas/Contact/contact");
const ExpenseCategory = require("../Schemas/Expense/category");
const Expense = require("../Schemas/Expense/expense");
const Purchase = require("../Schemas/Purchase/purchase");
const Sales = require("../Schemas/Sale/sale");
const Brand = require("../Schemas/Brand/brand");
const Tag = require("../Schemas/Tag/tag");
const banner = require("../Schemas/Profile/banner");
const deliveryCharge = require("../Schemas/Develivery/deliveryCharge");

router.post("/get-all-collection-length", loginCheck, async (req, res) => {
  const { date, from, to, lastMonth, lastWeek } = req.body;
  try {
    const user = await User.estimatedDocumentCount();
    const booking = await Booking.estimatedDocumentCount();
    const category = await Category.estimatedDocumentCount();
    const stockCategory = await StockCategory.estimatedDocumentCount();
    const product = await Product.estimatedDocumentCount();
    const contact = await Contact.estimatedDocumentCount();
    const expenseCategory = await ExpenseCategory.estimatedDocumentCount();
    const expense = await Expense.estimatedDocumentCount();
    const stock = await Purchase.estimatedDocumentCount();
    const sales = await Sales.estimatedDocumentCount();
    const brand = await Brand.estimatedDocumentCount();
    const tags = await Tag.estimatedDocumentCount();
    const banners = await banner.estimatedDocumentCount();
    const delivery = await deliveryCharge.estimatedDocumentCount();


    const unwindStage = {
      $unwind: {
        path: "$expenses",
      },
    };
    const groupStage = {
      $group: {
        _id: "$_id",
        totalAmount: {
          $sum: "$expenses.amount",
        },
      },
    };

    let pipeline = [ unwindStage, groupStage];

    const oneMonthAgo = moment().subtract(1, 'months').startOf('day').format('DD-MM-YYYY');
    const oneWeekAgo = moment().subtract(7, 'days').startOf('day').format('DD-MM-YYYY');

    if(date){
      pipeline.unshift({ $match : { date } })
    } else if(lastWeek){
      pipeline.unshift({ $match : { date: {$lte: oneWeekAgo} } })
    } else if(lastMonth){
      pipeline.unshift({ $match : { date: {$lte: oneMonthAgo} } })
    } else if(from && to){
      pipeline.unshift({ $match : { date: {$gte: from, $lte: to} } })
    } else {
      pipeline.unshift({ $match : { date: {$lte: oneMonthAgo} } })
    }

    const expenseAmount = await Expense.aggregate(pipeline);
    const totalExpense = expenseAmount.reduce((a, b) => a + b.totalAmount, 0);

    // stock
    const stockPipeline = [
      {
        $project: {
          totalAmount: { $multiply: ["$unitPrice", "$quantity"] }
        }
      },
      {
        $group: {
          _id: null,
          totalSum: { $sum: "$totalAmount" }
        }
      }
    ]
    const [stockAmount] = await Purchase.aggregate(stockPipeline)

    res.json({
      message: "Successfully Loaded Data",
      success: true,
      result: {
        user,
        booking,
        category,
        product,
        contact,
        expenseCategory,
        stockCategory,
        sales,
        brand,
        tags,
        banners,
        delivery,
        stock : {stock, stockAmount: stockAmount ? stockAmount : 0},
        expense: {
          expense,
          totalExpense,
        },
      },
    });
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
