const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  id: {
    type: String
  },
  date: {
    type: String
    
  },
  type: {
    type: String,
    enum: ["+", "-"],
    required: true,
  },
  category: {
    type: String,
  },
  comment: {
    type: String,
  },
  sum: {
    type: Number,
    required: true,
  },
});

const userFinances = new Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  sum: {
    type: Number,
    default: 0,
  },
  transactions: {
    type: [transactionSchema],
  },
  currency: {
    type: String,
    default: "USD"
  }
});

const Finances = mongoose.model("finances", userFinances);

module.exports = Finances;
