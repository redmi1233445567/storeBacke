const mongoose = require("mongoose");

const sellItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  qty: {
    type: Number,
    required: true,
    min: 1,
  },
  price: {
    type: Number,
    required: true,
  },
  proId: {
    type: String,
    required: true,
  },
});

const orderSchema = new mongoose.Schema({
  date: {
    type: String, 
    required: true,
  },
  sells: {
    type: [sellItemSchema],
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    default: "",
  },
  or: {
    type: Number,
    required: true,
  },
  allPrice: {
    type: Number,
    required: true,
  },
  paided: {
    type: Number,
    required: true,
  },
}, { timestamps: true });

const Selles = mongoose.model("sell", orderSchema);

module.exports = Selles;