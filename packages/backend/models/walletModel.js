const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  date: { type: Date, required: true },
  type: { type: String, required: true },
  categoryId: { type: String, required: true },
  comment: { type: String, required: true },
  sum: { type: Number, required: true },
});

const categorySchema = new Schema({
  _id: false,
  id: { type: String, required: true },
  name: { type: String, required: true },
  type: { type: Array, required: true },
});

const ownerSchema = new Schema({
  _id: false,
  id: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, required: true },
});

const walletSchema = new Schema(
  {
    balance: { type: Number, required: true },
    transactions: [transactionSchema.obj],
    categories: [categorySchema.obj],
    owners: [ownerSchema.obj],
  },
  {
    timestamps: true,
  }
);

const Wallet = mongoose.model("Wallet", walletSchema);

module.exports = Wallet;
