const express = require("express");
const router = express.Router();
const loginCheck = require("../../Middleware/checkLogin");
const Expense = require("../../Schemas/Expense/expense");

router.get("/get-expense-list", async (req, res) => {
  try {
    const { page, limit } = req.query;
    let query = {};
    const date = req.query.date;
    if (!date == " ") query.date = date;
    


    const result = await Expense.find(query)
    .skip(page * limit)
      .limit(limit)
      .exec();
    res.json({
      success: true,
      status_code: 200,
      message: "Successfully Loaded Data",
      result: result,
    });
  } catch (error) {
    res.json(error);
  }
});

router.post("/save-expense", loginCheck, async (req, res) => {
  try {
    const newExpense = new Expense(req.body);
    const result = await newExpense.save();
    res.json({
      success: true,
      message: "Expense Create Successfully",
      status_code: 200,
      result: result,
    });
  } catch (error) {
    res.json(error);
  }
});

router.get("/get-single-expense/:id", async (req, res) => {
  try {
    const id = req.params.id
    
    const result = await Expense.findById(id)
    res.json({
      success: true,
      status_code: 200,
      message: "Successfully Loaded Data",
      result: result,
    });
  } catch (error) {
    res.json(error);
  }
});

router.patch("/update-expense/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updates = req.body;
    
    // Separate the new expense from other updates
    const { expenses, ...otherUpdates } = updates;

    const result = await Expense.findByIdAndUpdate(
      id,
      {
        $set: otherUpdates,
        $push: { expenses: expenses }
      },
      { new: true }
    );
    if (!result) {
      return res.status(404).json({ message: "Expense not found" });
    }
    res.json({
      success: true,
      status_code: 200,
      message: "Expense Updated Successfully",
      result: result,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.patch("/update-single-expense/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updates = req.body;
    const update = {
      'expenses.$.name': updates.name,
      'expenses.$.amount': updates.amount,
      'expenses.$.details': updates.details,
      'expenses.$.category': updates.category
  };
    const result = await Expense.findOneAndUpdate(
      { 'expenses._id': id },
      {$set: update},
      { new: true }
    );

    if (!result) {
      return res.status(404).json({ message: "Expense not found" });
    }
    res.json({
      success: true,
      status_code: 200,
      message: "Expense Updated Successfully",
      result: result,
    });
  } catch (error) {
    res.status(500).json({message: error});
  }
});

router.delete("/delete-expense/:id", loginCheck, async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Expense.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: "Expense not found" });
    }
    res.json({
      status_code: 200,
      message: "Expense Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});








// router.get("/expense/receipt/all", async (req, res) => {
//   try {
//     const result = await ExpenseReceipt.find();
//     res.json({
//       status_code: 200,
//       message: "Successfully Loaded Data",
//       result: result,
//     });
//   } catch (error) {
//     res.json(error);
//   }
// });


// router.post("/expense/receipt/create", async (req, res) => {
//   const newExpense = new ExpenseReceipt(req.body);
//   try {
//     const result = newExpense.save();
//     res.json({
//       id: result._id,
//       message: "Expense Receipt Create Successfully",
//       status_code: 200,
//     });
//   } catch (error) {
//     res.json(error);
//   }
// });


// router.patch("/expense/receipt/update/:id", async (req, res) => {
//   try {
//     const id = req.params.id;
//     const updates = req.body;
//     const result = await ExpenseReceipt.findByIdAndUpdate(id, updates, {
//       new: true,
//     });
//     if (!result) {
//       return res.status(404).json({ message: "Expense receipt not found" });
//     }
//     res.json({
//       status_code: 200,
//       message: "Expense Category Updated Successfully",
//       result: result,
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });



// router.delete("/expense/receipt/delete/:id", async (req, res) => {
//   try {
//     const id = req.params.id;
//     const result = await ExpenseReceipt.findByIdAndDelete(id);
//     if (!result) {
//       return res.status(404).json({ message: "Expense receipt not found" });
//     }
//     res.json({
//       status_code: 200,
//       message: "Expense Category Deleted Successfully",
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

module.exports = router;
