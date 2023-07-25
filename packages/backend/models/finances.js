const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userFinances = new Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  sum: {
    type: Number,
    default: 0,
  },
  transactions: [
    {
      date: {
        type: Date,
        default: Date.now,
      },
      type: {
        type: String,
        enum: ["+", "-"],
      },
      category: {
        type: String,
        enum: [
          "Income",
          "Main expenses",
          "Products",
          "Car",
          "Self care",
          "Child care",
          "Household products",
          "Education",
          "Leisure",
          "Else",
        ],
      },
      comment: {
        type: String,
      },
      sum: {
        type: Number,
      },
    },
  ],
});

const Finances = mongoose.model("finances", userFinances);

module.exports = Finances;
