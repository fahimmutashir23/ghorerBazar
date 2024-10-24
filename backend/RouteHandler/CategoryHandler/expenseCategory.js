const express = require("express");
const router = express.Router();
const loginCheck = require("../../Middleware/checkLogin");
const ExpenseCategory = require("../../Schemas/Expense/category");

// get all categories
router.get("/get-expenseCategory-list", loginCheck, async (req, res) => {
  try {
    const { page, limit } = req.query;
    let query = {};
    const name = req.query.name;
    if (name) query.name = name;

    const result = await ExpenseCategory.find(query)
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

// create categories
router.post("/save-expenseCategory", loginCheck, async (req, res) => {
  const newExpense = new ExpenseCategory(req.body);
  try {
    const result = await newExpense.save();
    res.json({
      success: true,
      message: "Category Create Successfully",
      status_code: 200,
      result: result,
    });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: "Category name already exists" });
    } else {
      res.status(500).json({ message: error });
    }
  }
});

// categories edit
router.put("/update-expenseCategory/:id", loginCheck, async (req, res) => {
  try {
    const id = req.params.id;
    const updates = req.body;
    const result = await ExpenseCategory.findByIdAndUpdate(id, updates, {
      new: true,
    });
    if (!result) {
      return res.status(404).json({ message: "Expense Category not found" });
    }
    res.json({
      success: true,
      status_code: 200,
      message: "Expense Category Updated Successfully",
      result: result,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// categories Active Inactive
router.put("/activeInactive-expenseCategory/:id", loginCheck, async (req, res) => {
  try {
    const id = req.params.id;
    const updates = req.body;
    const result = await ExpenseCategory.findByIdAndUpdate(id, updates, {
      new: true,
    });
    if (!result) {
      return res.status(404).json({ message: "Expense Category not found" });
    }
    res.json({
      success: true,
      status_code: 200,
      message: "Expense Category Updated Successfully",
      result: result,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// categories Delete
router.delete("/delete-expenseCategory/:id", loginCheck, async (req, res) => {
  try {
    const id = req.params.id;
    const result = await ExpenseCategory.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: "Expense not found" });
    }
    res.json({
      success: true,
      status_code: 200,
      message: "Expense Category Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
