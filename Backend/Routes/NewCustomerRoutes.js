// routes/customerRoutes.js
const express = require("express");
const Customer = require("../models/Customer"); 

const router = express.Router();

// Route to add a new customer
router.post("/new-customer", async (req, res) => {
  try {
    const customer = new Customer(req.body);
    const savedCustomer = await customer.save();
    console.log("Customer data saved:", savedCustomer);
    res.status(201).json({ message: "Customer added successfully", customer: savedCustomer });
  } catch (error) {
    console.error("Error adding customer:", error);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;