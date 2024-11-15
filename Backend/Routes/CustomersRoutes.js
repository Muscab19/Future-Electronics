// routes/customerRoutes.js

const express = require('express');
const Customer = require('../models/Customer'); // Correct import for Customer model
const router = express.Router();

// @desc Add a new customer repair entry
router.post('/customers', async (req, res) => {
    const { name, contact, model, serviceBudget, itemPrice, time, problem, technician, description } = req.body;
    
    try {
        console.log(req.body); // Log incoming request data for debugging

        const newCustomer = new Customer({
            name,
            contact,
            model,
            serviceBudget,
            itemPrice,
            time,
            problem,
            technician,
            description,
        });
        

        const savedCustomer = await newCustomer.save(); // Save the new customer entry to the database
        console.log("Data saved to MongoDB:", savedCustomer); // Log saved data to confirm
        res.status(201).json(savedCustomer); // Send back the saved data with a 201 status
    } catch (error) {
        console.log("Error saving to MongoDB:", error); // Log error if save fails
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

// @desc Get all customer repair entries
router.get('/customers', async (req, res) => {
    try {
        const customers = await Customer.find(); // Fetch all customer entries from the database
        res.status(200).json(customers); // Return fetched data as JSON
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

// @desc Update a specific customer’s repair status to Solved
router.put('/customers/:id/solve', async (req, res) => {
    try {
        const customer = await Customer.findByIdAndUpdate(
            req.params.id,
            { status: "Solved" },
            { new: true }
        );

        if (!customer) {
            return res.status(404).json({ message: "Customer not found" });
        }

        res.status(200).json({ message: "Repair marked as solved", customer });
    } catch (error) {
        res.status(500).json({ message: 'Error updating customer', error: error.message });
    }
});


// @desc Delete a customer repair entry
router.delete('/customers/:id', async (req, res) => {
    try {
        await Customer.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Customer deleted successfully." });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting customer', error: error.message });
    }
});

module.exports = router;
