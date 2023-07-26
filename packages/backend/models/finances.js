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
  transactions: {
    type: Array,
  },
});

const Finances = mongoose.model("finances", userFinances);

module.exports = Finances;
