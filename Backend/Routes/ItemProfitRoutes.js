const express = require('express');
const Customer = require('../models/Customer'); 
const router = express.Router();

// Route to get all item profits
router.get('/itemProfit', async (req, res) => {
    try {
        const itemProfits = await Customer.find(
            { status: 'Taken' }, 
            'name model itemProfit problem' // Select fields based on your schema
        );

        if (itemProfits.length === 0) {
            return res.status(404).json({ message: 'No item profits found' });
        }

        // Map to the desired structure
        const formattedProfits = itemProfits.map(item => ({
            customer: item.name,
            item: item.model, // Assuming 'model' represents the item
            profitAmount: item.itemProfit,
            issue: item.problem // Using 'problem' as the issue
        }));

        res.status(200).json(formattedProfits);
    } catch (error) {
        console.error("Error in itemProfit route:", error); // Log the error for debugging
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

module.exports = router;
