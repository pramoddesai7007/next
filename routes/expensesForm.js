const express = require('express');
const ExpensesForm = require('../models/ExpensesForm');
const router = express.Router();


// Create ExpensesForm
// router.post('/', async (req, res) => {
//   try {
//     const { date, expenseTitle, expenseType, description, paidBy, bankName, checkNo, amount } = req.body;
//     const newExpensesForm = new ExpensesForm({ date, expenseTitle, expenseType, description, paidBy, bankName, checkNo, amount });
//     const savedExpensesForm = await newExpensesForm.save();
//     res.json(savedExpensesForm);
//   } catch (error) {
//     console.error('Error creating expenses form:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });  


router.post('/', async (req, res) => {
  try {
    // Input validation
    const { date, expenseTitle, expenseType, description, paidBy, bankName, checkNo,online, amount } = req.body;
    if (!date  || !expenseType || !paidBy || !amount) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newExpensesForm = new ExpensesForm({ date, expenseTitle, expenseType, description, paidBy, bankName, checkNo,online, amount });
    const savedExpensesForm = await newExpensesForm.save();
    res.status(201).json(savedExpensesForm);
  } catch (error) {
    console.error('Error creating expenses form:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get All ExpensesForms
router.get('/', async (req, res) => {
  try {
    const expensesForms = await ExpensesForm.find();
    res.json(expensesForms);
  } catch (error) {
    console.error('Error getting expenses forms:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get ExpensesForm by ID
router.get('/:id', async (req, res) => {
  try {
    const expensesForm = await ExpensesForm.findById(req.params.id);
    if (expensesForm) {
      res.json(expensesForm);
    } else {
      res.status(404).json({ error: 'Expenses form not found' });
    }
  } catch (error) {
    console.error('Error getting expenses form by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update ExpensesForm by ID
router.patch('/:id', async (req, res) => {
  try {
    const updatedExpensesForm = await ExpensesForm.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (updatedExpensesForm) {
      res.json(updatedExpensesForm);
    } else {
      res.status(404).json({ error: 'Expenses form not found' });
    }
  } catch (error) {
    console.error('Error updating expenses form by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete ExpensesForm by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedExpensesForm = await ExpensesForm.findByIdAndDelete(req.params.id);
    if (deletedExpensesForm) {
      res.json({ message: 'Expenses form deleted successfully' });
    } else {
      res.status(404).json({ error: 'Expenses form not found' });
    }
  } catch (error) {
    console.error('Error deleting expenses form by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;