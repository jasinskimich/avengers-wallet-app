const walletService = require("../services/walletService");
// const walletUtils = require('../utils/walletUtils');
const JoiSchema = require("../schemas/transactionSchema");

const calc = {
  expense: -1,
  income: 1,
};

// <===== TRANSACTION ADD =====>

const addTransaction = async (req, res, next) => {
  const { walletId } = req.params;
  const { date, type, categoryId, comment, sum } = req.body;
  const { _id: userId } = req.user;

  const wallet = await walletService.getWalletById({ _id: walletId });
  if (!wallet) {
    return res.status(401).json({
      message: "User does not owns wallet",
    });
  }

  const { owners, categories } = wallet;
  const isOwner = owners.find((e) => e.id === userId.toString());
  if (!isOwner) {
    return res.status(403).json({
      message: "User does not owns wallet",
    });
  }

  const isValid = JoiSchema.allRequired.validate({
    date,
    type,
    categoryId,
    comment,
    sum,
  });
  if (isValid.error) {
    return res.status(400).json({
      message: isValid.error.details[0].message,
    });
  }

  const isContain = categories.find((e) => e.id === categoryId);
  if (!isContain) {
    return res.status(404).json({
      message: "Transaction category not found",
    });
  }

  const isMatch = isContain.type.includes(type);
  if (!isMatch) {
    return res.status(409).json({
      message: "Transaction category type does not match transaction type",
    });
  }

  await walletService.createTransaction({
    _id: walletId,
    transaction: req.body,
  });

  const newWallet = await walletService.getWalletById({ _id: walletId });

  const transactions = wallet.transactions.flatMap((e) => e._id.toString());
  console.log(transactions);
  const newTransactions = newWallet.transactions.flatMap((e) =>
    e._id.toString()
  );
  console.log(newTransactions);
  const transactionId = newTransactions.filter(
    (e) => transactions.includes(e) === false
  );

  const newBalance = newWallet.transactions.reduce((balance, transaction) => {
    const total = balance + calc[transaction.type] * transaction.sum;
    return total;
  }, 0);

  await walletService.updateWalletBalance({
    _id: walletId,
    balance: newBalance,
  });

  const transaction = { date, type, categoryId, comment, sum };

  res.status(201).json({
    balance: newBalance,
    transaction: { ...transaction, id: transactionId[0] },
  });
};

// <===== TRANSACTIONS LIST =====>

const listTransactions = async (req, res, next) => {
  console.log("transactions");
  const { walletId } = req.params;
  const { _id: userId } = req.user;

  const wallet = await walletService.getWalletById({ _id: walletId });
  if (!wallet) {
    return res.status(404).json({
      message: "Wallet with such id not exist",
    });
  }

  const { owners, transactions, balance } = wallet;

  const isOwner = owners.find((e) => e.id === userId.toString());
  if (!isOwner) {
    return res.status(403).json({
      message: "User does not owns wallet",
    });
  }

  res.status(201).json({ transactions, balance });
};

// <===== TRANSACTION UPDATE =====>

const updateTransaction = async (req, res, next) => {
  const { walletId, transactionId } = req.params;
  const { _id: userId } = req.user;
  const { date, type, categoryId, comment, sum } = req.body;

  const wallet = await walletService.getWalletById({ _id: walletId });
  if (!wallet) {
    return res.status(404).json({
      message: "Wallet with such id not exist",
    });
  }

  const { owners, transactions, categories } = wallet;
  const isOwner = owners.find((e) => e.id === userId.toString());
  if (!isOwner) {
    return res.status(403).json({
      message: "User does not owns wallet",
    });
  }

  const isValid = JoiSchema.allRequired.validate({
    date,
    type,
    categoryId,
    comment,
    sum,
  });
  if (isValid.error) {
    return res.status(400).json({
      message: isValid.error.details[0].message,
    });
  }

  const isContain = categories.find((e) => e.id === categoryId);
  if (!isContain) {
    return res.status(404).json({
      message: "Transaction category not found",
    });
  }

  const isMatch = isContain.type.includes(type);
  if (!isMatch) {
    return res.status(409).json({
      message: "Transaction category type does not match transaction type",
    });
  }

  const isTransaction = transactions.find(
    (e) => e._id.toString() === transactionId
  );
  if (!isTransaction) {
    return res.status(409).json({
      message: "Transaction with such id not exist in user wallet",
    });
  }

  const transaction = { date, type, categoryId, comment, sum };

  await walletService.updateTransaction({
    _id: walletId,
    transaction,
    transactionId,
  });

  const newWallet = await walletService.getWalletById({ _id: walletId });
  const newBalance = newWallet.transactions.reduce(
    (balance, transaction) =>
      balance + calc[transaction.type] * transaction.sum,
    0
  );

  await walletService.updateWalletBalance({
    _id: walletId,
    balance: newBalance,
  });

  res.status(201).json({
    transaction: { ...transaction, id: transactionId },
    balance: newBalance,
  });
};

// <===== TRANSACTION DELETE =====>

const deleteTransaction = async (req, res, next) => {
  const { walletId, transactionId } = req.params;
  const { _id: userId } = req.user;

  const wallet = await walletService.getWalletById({ _id: walletId });
  if (!wallet) {
    return res.status(404).json({
      message: "Wallet with such id not exist",
    });
  }

  const { owners, transactions } = wallet;
  const isOwner = owners.find((e) => e.id === userId.toString());
  if (!isOwner) {
    return res.status(403).json({
      message: "User does not owns wallet",
    });
  }

  const transaction = transactions.find(
    (e) => e._id.toString() === transactionId
  );
  if (!transaction) {
    return res.status(409).json({
      message: "Transaction with such id not exist in user wallet",
    });
  }

  await walletService.deleteTransaction({
    _id: walletId,
    transactionId,
  });

  const newWallet = await walletService.getWalletById({ _id: walletId });
  const newBalance = newWallet.transactions.reduce(
    (balance, transaction) =>
      balance + calc[transaction.type] * transaction.sum,
    0
  );

  await walletService.updateWalletBalance({
    _id: walletId,
    balance: newBalance,
  });

  res.status(201).json({
    message: "Transaction deleted",
    id: transactionId,
    balance: newBalance,
  });
};

module.exports = {
  addTransaction,
  listTransactions,
  updateTransaction,
  deleteTransaction,
};
