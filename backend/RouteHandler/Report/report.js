const express = require("express");
const moment = require('moment');
const router = express.Router();
const loginCheck = require("../../Middleware/checkLogin");
const Sales = require("../../Schemas/Sale/sale")

const unwindStage = {
    $unwind: "$products"
  }
const groupStage = {
    $group: {
      _id: "$_id",
      unitPrice: {
        $sum : "$products.unitPrice",
      },
      quantity: {
        $sum: "$products.quantity"
      }
    }
  }
const projectStage = {
    $project: {
      total: {
        $multiply: ["$unitPrice", "$quantity"]
      }
    }
  }
const totalStage = {
    $group: {
      _id: null,
      totalAmount: {
        $sum: "$total"
      }
    }
  }


router.post("/report/get-sales", loginCheck, async (req, res) => {
    try {
        const range = req.body.signal;

        let pipeline = [];
        let amountPipeline = [unwindStage, groupStage, projectStage, totalStage];

        const today = moment().subtract(0, 'days').startOf('day').format('DD-MM-YYYY');
        const oneDayAgo = moment().subtract(1, 'days').startOf('day').format('DD-MM-YYYY');
        const oneWeekAgo = moment().subtract(7, 'days').startOf('day').format('DD-MM-YYYY');
        const oneMonthAgo = moment().subtract(1, 'months').startOf('day').format('DD-MM-YYYY');
        const oneYearAgo = moment().subtract(1, 'years').startOf('day').format('DD-MM-YYYY');

        if(range === 'today'){
            pipeline.push({ $match : { date : today } })
            amountPipeline.unshift({ $match : { date: today } })
        } else if(range === 'yesterday'){
            pipeline.push({ $match : { date : oneDayAgo } })
            amountPipeline.unshift({ $match : { date : oneDayAgo } })
        } else if(range === 'lastWeek'){
            pipeline.push({ $match : { date : { $gte : oneWeekAgo } } })
            amountPipeline.unshift({ $match : { date : { $gte : oneWeekAgo } } })
        } else if(range === 'lastMonth'){
            pipeline.push({ $match : { date : { $gte : oneMonthAgo } } })
            amountPipeline.unshift({ $match : { date : { $gte : oneMonthAgo } } })
        } else if(range === 'lastYear'){
            pipeline.push({ $match : { date : { $gte : oneYearAgo } } })
            amountPipeline.unshift({ $match : { date : { $gte : oneYearAgo } } })
        } else if(range.from && range.to){
            pipeline.push({ $match : { date: {$gte: range.from, $lte: range.to} } })
            amountPipeline.unshift({ $match : { date: {$gte: range.from, $lte: range.to} } })
        } else {
            pipeline.push({ $match : { date : today } })
            amountPipeline.unshift({ $match : { date: today } })
        }

          
        const result = await Sales.aggregate(pipeline)
        const amount = await Sales.aggregate(amountPipeline)
        if(result) {
            res.status(200).json({
                success : true,
                message: "Successfully loaded data",
                status_code: 200,
                data: {result, amount}
        })
        }
    } catch (error) {
        res.status(500).json({
            success: false, 
            error: error,
          });
    }
})
router.post("/report/get-stock", loginCheck, async (req, res) => {
    
})
router.post("/report/get-expense", loginCheck, async (req, res) => {
    
})
router.post("/report/get-revenue", loginCheck, async (req, res) => {
    
})

module.exports = router