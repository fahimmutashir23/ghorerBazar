const express = require("express");
const moment = require("moment");
const router = express.Router();
const loginCheck = require("../../Middleware/checkLogin");
const Sales = require("../../Schemas/Sale/sale");

const unwindStage = {
  $unwind: "$products",
};
const groupStage =   {
  $group: {
    _id: null,
    totalAmount: {
      $sum: "$totalAmount"
    }
  }
};
const projectStage =   {
  $project: {
    _id: 0,
    amount: "$totalAmount"
  }
};
const totalStage = {
  $group: {
    _id: null,
    totalAmount: {
      $sum: "$total",
    },
  },
};
const pickStage = {
    $project: {
      _id: 0
    }
}

const today = moment().subtract(0, "days").startOf("day").format("DD-MM-YYYY");
const oneDayAgo = moment().subtract(1, "days").startOf("day").format("DD-MM-YYYY");
const oneWeekAgo = moment().subtract(7, "days").startOf("day").toDate();
const oneMonthAgo = moment().subtract(1, "months").startOf("day").toDate();
const oneYearAgo = moment().subtract(1, 'years').startOf('day').toDate();



router.get("/report/bulk-sales", loginCheck, async (req, res) => {
  try {
    const todayAmountPipeline = [
      { $match: { date : today } },
      groupStage,
      projectStage,
    ];
    const yesterdayAmountPipeline = [
      { $match: { date : oneDayAgo } },
      groupStage,
      projectStage,
    ];
    const lastWeekAmountPipeline = [
        { $match: { createdAt : { $gte: oneWeekAgo } } },
        groupStage,
        projectStage,
    ];
    const lastMonthAmountPipeline = [
        { $match: { createdAt : { $gte: oneMonthAgo } } },
      groupStage,
      projectStage,
    ];
    const lastYearAmountPipeline = [
        { $match: { createdAt : { $gte: oneYearAgo } } },
        groupStage,
        projectStage,
    ];


    const [todayAmount] = await Sales.aggregate(todayAmountPipeline);
    const [yesterdayAmount] = await Sales.aggregate(yesterdayAmountPipeline);
    const [lastWeekAmount] = await Sales.aggregate(lastWeekAmountPipeline);
    const [lastMonthAmount] = await Sales.aggregate(lastMonthAmountPipeline);
    const [lastYearAmount] = await Sales.aggregate(lastYearAmountPipeline);


    res.status(200).json({
      success: true,
      message: "Successfully loaded data",
      status_code: 200,
      amount: {
        todayAmount: todayAmount ? todayAmount.amount : 0,
        yesterdayAmount: yesterdayAmount ? yesterdayAmount.amount : 0,
        lastWeekAmount: lastWeekAmount ? lastWeekAmount.amount : 0,
        lastMonthAmount: lastMonthAmount ? lastMonthAmount.amount : 0,
        lastYearAmount: lastYearAmount ? lastYearAmount.amount : 0,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error,
    });
  }
});


router.post("/report/get-stock", loginCheck, async (req, res) => {});
router.post("/report/get-expense", loginCheck, async (req, res) => {});
router.post("/report/get-revenue", loginCheck, async (req, res) => {});

module.exports = router;

// [
//   {
//     $group: {
//       _id: {
//         year: {$year: "$createdAt"},
//         month: {$month: "$createdAt"}
//       },
//       totalAmount: {
//         $sum: "$totalAmount"
//       }
//     }
//   },
//   {
//     $project: {
//       _id: 0,
//       month: "$_id.month",
//       year: "$_id.year",
//       amount: "$totalAmount"
//     }
//   }
// ]
