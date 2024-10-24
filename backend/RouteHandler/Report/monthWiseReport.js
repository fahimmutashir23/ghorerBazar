const express = require("express");
const router = express.Router();
const loginCheck = require("../../Middleware/checkLogin");
const Sales = require("../../Schemas/Sale/sale");


const groupStage = {
    $group: {
      _id: {
        year: {$year: "$createdAt"},
        month: {$month: "$createdAt"}
      },
      totalAmount: {
        $sum: "$totalAmount"
      }
    }
  }
const projectStage =   {
    $project: {
      _id: 0,
      month: "$_id.month",
      year: "$_id.year",
      amount: "$totalAmount"
    }
  }

router.get("/report/monthly-sales", loginCheck, async (req, res) => {
  try {
    const pipeline = [groupStage, projectStage]
    const [report] = await Sales.aggregate(pipeline)

    res.status(200).json({
      success: true,
      message: "Successfully loaded data",
      status_code: 200,
      report
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
