const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userFinances = new Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  sum: {
    type: Number,
  },
  transactions: [
    {
      transactionId: {
        type: String,
      },
      tranactionType: {
        type: String,
        enum: ["+", "-"],
      },
      tranactionCategory: {
        type: String,
        enum: [
          "Main expenses",
          "Products",
          "Car",
          "Self care",
          "Child care",
          "Household products",
          "Education",
          "Leisure",
        ],
      },
      transactionComment: {
        type: String,
      },
      transactionSum: {
        type: Number,
      },
      transactionDate: {
        type: Date,
      },
      transactionOwner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    },
  ],
});

const Finances = mongoose.model("finances", userFinances);

module.exports = Finances;
