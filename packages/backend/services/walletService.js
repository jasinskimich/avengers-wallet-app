const Wallet = require("../models/walletModel");

const createWallet = (body) => {
  try {
    return Wallet.create(body);
  } catch (err) {
    return false;
  }
};

const getWalletById = ({ _id }) => {
  try {
    return Wallet.findById({ _id: _id });
  } catch (err) {
    return false;
  }
};

const getWalletOwners = async ({ _id }) => {
  try {
    const { owners } = await Wallet.findById({ _id });
    return owners;
  } catch (err) {
    return false;
  }
};

const getWalletCategories = async ({ _id }) => {
  try {
    const { categories } = await Wallet.findById({ _id });
    return categories;
  } catch (err) {
    return false;
  }
};

const createTransaction = ({ _id, transaction }) => {
  try {
    return Wallet.updateOne({ _id }, { $push: { transactions: transaction } });
  } catch (err) {
    return false;
  }
};

const updateWalletBalance = ({ _id, balance }) => {
  try {
    return Wallet.updateOne({ _id }, { balance });
  } catch (err) {
    return false;
  }
};

const updateTransaction = async ({ _id, transaction, transactionId }) => {
  try {
    return Wallet.updateOne(
      {
        _id,
        "transactions._id": transactionId,
      },
      {
        $set: {
          "transactions.$.date": transaction.date,
          "transactions.$.type": transaction.type,
          "transactions.$.categoryId": transaction.categoryId,
          "transactions.$.comment": transaction.comment,
          "transactions.$.sum": transaction.sum,
        },
      },
      {
        new: true,
      }
    );
  } catch (err) {
    return false;
  }
};

const deleteTransaction = async ({ _id, transactionId }) => {
  try {
    return Wallet.updateOne(
      { _id },
      { $pull: { transactions: { _id: transactionId } } }
    );
  } catch (err) {
    return false;
  }
};

module.exports = {
  createWallet,
  createTransaction,
  getWalletById,
  getWalletOwners,
  getWalletCategories,
  updateWalletBalance,
  updateTransaction,
  deleteTransaction,
};
