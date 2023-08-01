const walletService = require("../services/walletService");
const walletUtils = require("../utils/walletUtils");

const categoriesList = async (req, res, next) => {
  const { walletId } = req.params;
  const { _id } = req.user;

  const wallet = await walletService.getWalletById({ _id: walletId });
  if (!wallet) {
    return res.status(404).json({
      message: "Wallet not found",
    });
  }

  const owners = wallet.owners;
  const isOwner = owners.findIndex((i) => i.id === _id);
  if (!isOwner) {
    return res.status(403).json({
      message: "User does not owns wallet",
    });
  }

  const categories = wallet.categories;
  if (!categories) {
    return res.status(404).json({
      message: "Categories not found",
    });
  }

  res.status(200).json({ categories });
};

const transactionsSummary = async (req, res, next) => {
  const { walletId } = req.params;
  const { year, month } = req.query;
  const { _id: userId } = req.user;

  const wallet = await walletService.getWalletById({ _id: walletId });
  if (!wallet) {
    return res.status(404).json({
      message: "Wallet not found",
    });
  }

  const { owners, transactions, categories } = wallet;
  const isOwner = owners.find((e) => e.id === userId.toString());
  if (!isOwner) {
    return res.status(403).json({
      message: "User does not owns wallet",
    });
  }

  const summary = walletUtils.sumTransactions({
    transactions: [...transactions],
    categories: [...categories],
    year,
    month,
  });
  if (!summary) {
    return res.status(409).json({
      message: "Transactions summary not calculated",
    });
  }

  res.status(200).json({ ...summary });
};

module.exports = {
  categoriesList,
  transactionsSummary,
};
