const express = require("express");
const moment = require("moment");
const router = express.Router();
const loginCheck = require("../../Middleware/checkLogin");
const Sales = require("../../Schemas/Sale/sale");
const Bookings = require("../../Schemas/Bookings/bookings");

const unwindStage = {
  $unwind: "$products",
};
const groupStage = {
  $group: {
    _id: null,
    totalAmount: {
      $sum: {
        $add: ["$totalAmount", "$deliveryCharge"],
      },
    },
  },
};
const projectStage = {
  $project: {
    _id: 0,
    amount: "$totalAmount",
  },
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
    _id: 0,
  },
};

// Helper function to get date range
const getDateRange = (period) => {
  const now = new Date();
  const hour = new Date().getHours();
  const second = new Date().getSeconds();
  const minute = new Date().getMinutes();
  const millisecond = new Date().getMilliseconds();
  let start, end;

  if (period === "today") {
    start = new Date();
    start.setUTCHours(0, 0, 0, 0);
    end = new Date();
    end.setUTCHours(hour, minute, second, millisecond);
  } else if (period === "yesterday") {
    start = new Date();
    start.setDate(start.getDate() - 1);
    start.setUTCHours(0, 0, 0, 0);
    end = new Date();
    end.setDate(end.getDate() - 1);
    end.setUTCHours(hour, minute, second, millisecond);
  } else if (period === "weekly") {
    start = new Date(now.setDate(now.getDate() - now.getDay()));
    start.setUTCHours(0, 0, 0, 0);
    end = new Date();
    end.setUTCHours(hour, minute, second, millisecond);
  } else if (period === "monthly") {
    start = new Date();
    start.setDate(1);
    start.setUTCHours(0, 0, 0, 0);
    end = new Date();
    end.setMonth(end.getMonth() + 1);
    end.setDate(0);
    end.setUTCHours(hour, minute, second, millisecond);
  } else if (period === "yearly") {
    start = new Date(new Date().getFullYear(), 0, 1);
    start.setUTCHours(0, 0, 0, 0);
    end = new Date(new Date().getFullYear(), 11, 31);
    end.setUTCHours(hour, minute, second, millisecond);
  } else {
    return null;
  }

  return { start, end };
};

router.get("/report/bulk-sales", loginCheck, async (req, res) => {
  const today = getDateRange("today");
  const yesterday = getDateRange("yesterday");
  const weekly = getDateRange("weekly");
  const monthly = getDateRange("monthly");
  const yearly = getDateRange("yearly");

  try {
    const todayAmountPipeline = [
      {
        $match: {
          createdAt: { $gte: today.start, $lte: today.end },
          status: "confirm",
        },
      },
      groupStage,
      projectStage,
    ];
    const yesterdayAmountPipeline = [
      {
        $match: {
          createdAt: { $gte: yesterday.start, $lte: yesterday.end },
          status: "confirm",
        },
      },
      groupStage,
      projectStage,
    ];
    const weeklyAmountPipeline = [
      {
        $match: {
          createdAt: { $gte: weekly.start, $lte: weekly.end },
          status: "confirm",
        },
      },
      groupStage,
      projectStage,
    ];
    const monthlyAmountPipeline = [
      {
        $match: {
          createdAt: { $gte: monthly.start, $lte: monthly.end },
          status: "confirm",
        },
      },
      groupStage,
      projectStage,
    ];
    const yearlyAmountPipeline = [
      {
        $match: {
          createdAt: { $gte: yearly.start, $lte: yearly.end },
          status: "confirm",
        },
      },
      groupStage,
      projectStage,
    ];

    const [todayAmount] = await Bookings.aggregate(todayAmountPipeline);
    const [yesterdayAmount] = await Bookings.aggregate(yesterdayAmountPipeline);
    const [lastWeekAmount] = await Bookings.aggregate(weeklyAmountPipeline);
    const [lastMonthAmount] = await Bookings.aggregate(monthlyAmountPipeline);
    const [lastYearAmount] = await Bookings.aggregate(yearlyAmountPipeline);


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
