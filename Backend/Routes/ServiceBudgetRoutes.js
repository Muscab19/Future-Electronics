const express = require('express');
const Customer = require('../models/Customer'); // Correctly import the Customer model
const router = express.Router();

// Route to get all repairs marked as "Taken" for Service Budget
router.get('/serviceBudget', async (req, res) => {
    try {
        const takenRepairs = await Customer.find(
            { status: 'Taken' },
            'name contact model problem serviceFee itemCost itemProfit technician createdAt'
        );

        if (takenRepairs.length === 0) {
            return res.status(404).json({ message: 'No taken repairs found for service budget' });
        }

        res.status(200).json(takenRepairs);
    } catch (error) {
        console.error("Error in serviceBudget route:", error); // Log the error for debugging
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

module.exports = router;