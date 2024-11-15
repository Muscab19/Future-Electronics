const express = require('express');
const Item = require('../models/Customer'); 
const router = express.Router();

// Route to get all item costs
router.get('/itemCost', async (req, res) => {
  try {
    const itemCosts = await Item.find(); // Adjust the query as needed for your database
    if (itemCosts.length === 0) {
      return res.status(404).json({ message: 'No item costs found' });
    }
    res.status(200).json(itemCosts);
  } catch (error) {
    console.error("Error in itemCost route:", error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

module.exports = router;
