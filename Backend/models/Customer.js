const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  contact: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  problem: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  serviceFee: {
    type: Number,
    required: true,
  },
  itemCost:{
    type: Number,
    required: true,
  },
  itemProfit:{
    type: Number,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  technician: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Solved", "Unsolved", "Taken"],
    default: "Pending",
  },
  paid: { 
    type: Boolean, 
    default: false 
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Customer", customerSchema);
