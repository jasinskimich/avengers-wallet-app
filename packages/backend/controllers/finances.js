const Finances = require("../models/finances");

const addTransaction = async (req, res, next) => {
    const owner = req.params.owner;
    const transactionId = req.params.id;
    const document = await Finances.findOne({ owner });
  
    if (!document) {
      return res.json({
        status: "error",
        code: 400,
        data: "Bad request",
        message: "User not found",
      });
    }
  
    const transaction = req.body;
  
    if (transaction.type === "+") {
      if (transactionId) {
        // Edit + window
        const existingTransactionIndex = document.transactions.findIndex(
          (t) => t._id.toString() === transactionId
        );
  
        if (existingTransactionIndex === -1) {
          return res.json({
            status: "error",
            code: 400,
            data: "Bad request",
            message: "Transaction not found",
          });
        }
  
        const existingTransaction =
          document.transactions[existingTransactionIndex];
        const previousTransactionSum = existingTransaction.sum;
        const updatedTransactionSum = transaction.sum;
        const prevoiusTransactionType = existingTransaction.type;
        const updatedTransactionType = transaction.type;
        const updatedTransactionDate = transaction.date; 
        const updatedTransactionComment = transaction.comment;
        const updatedTransactionCategory = transaction.category; 
  
        if (prevoiusTransactionType === "+") {
          document.sum =
            document.sum - previousTransactionSum + updatedTransactionSum;
        } else if (prevoiusTransactionType === "-") {
          document.sum =
            document.sum + previousTransactionSum + updatedTransactionSum;
        }
  
        document.transactions = document.transactions.map(
          (transaction, index) => {
            if (index === existingTransactionIndex) {
              return {
                ...transaction,
                date: updatedTransactionDate,
                type: updatedTransactionType,
                category: updatedTransactionCategory,
                comment: updatedTransactionComment, 
                sum: updatedTransactionSum,
              };
            }
            return transaction;
          }
        );
      } else {
        
        const newTransactionSum = transaction.sum;
        const newTransactionDate = transaction.date; 
        const newTransactionComment = transaction.comment; 
  
        document.sum = document.sum + newTransactionSum;
        document.transactions.push({
          ...transaction,
          date: newTransactionDate, 
          comment: newTransactionComment, 
          sum: newTransactionSum,
        });
      }
    } else {
      // Edit - window
      if (transactionId) {
        const existingTransactionIndex = document.transactions.findIndex(
          (t) => t._id.toString() === transactionId
        );
  
        if (existingTransactionIndex === -1) {
          return res.json({
            status: "error",
            code: 400,
            data: "Bad request",
            message: "Transaction not found",
          });
        }
  
        const existingTransaction =
          document.transactions[existingTransactionIndex];
        const previousTransactionSum = existingTransaction.sum;
        const updatedTransactionSum = transaction.sum;
        const updatedTransactionDate = transaction.date;
        const updatedTransactionComment = transaction.comment;
        const prevoiusTransactionType = existingTransaction.type;
        const updatedTransactionType = transaction.type; 
        const updatedTransactionCategory = transaction.category; 
  
        if (prevoiusTransactionType === "+") {
          document.sum =
            document.sum - previousTransactionSum - updatedTransactionSum;
        } else if (prevoiusTransactionType === "-") {
          document.sum =
            document.sum + previousTransactionSum - updatedTransactionSum;
        }
  
        document.transactions = document.transactions.map(
          (transaction, index) => {
            if (index === existingTransactionIndex) {
              return {
                ...transaction,
                date: updatedTransactionDate, 
                type: updatedTransactionType, 
                category: updatedTransactionCategory, 
                comment: updatedTransactionComment, 
                sum: updatedTransactionSum,
              };
            }
            return transaction;
          }
        );
      } else {
        const newTransactionSum = transaction.sum;
        const newTransactionDate = transaction.date; 
        const newTransactionComment = transaction.comment; 
  
        document.sum = document.sum - newTransactionSum;
        document.transactions.push({
          ...transaction,
          date: newTransactionDate, 
          comment: newTransactionComment, 
          sum: newTransactionSum,
        });
      }
    }
  
    await document.save();
  
    res.json({
      status: "success",
      code: 200,
      data: document,
      message: "Transaction added/updated successfully",
    });
};
  
const validCurrencies = [
    "PLN",
    "USD",
    "EUR",
    "JPY",
    "GBP",
    "AUD",
    "CAD",
    "CHF",
    "CNY",
    "SEK",
    "NZD",
    "MXN",
    "SGD",
    "HKD",
    "NOK",
    "KRW",
    "TRY",
    "RUB",
    "INR",
    "BRL",
    "ZAR",
];
  
const changeCurrency = async (req, res, next) => {
    try {
      const owner = req.params.owner;
      const updatedCurrency = req.body.currency;
  
      if (!validCurrencies.includes(updatedCurrency)) {
        return res.json({
          status: "error",
          code: 400,
          data: "Bad request",
          message: "Invalid currency code",
        });
      }
  
      const document = await Finances.findOneAndUpdate(
        { owner },
        { currency: `${updatedCurrency}` },
        { new: true }
      );
  
      if (!document) {
        return res.json({
          status: "error",
          code: 400,
          data: "Bad request",
          message: "User not found",
        });
      }
  
      return res.json({
        status: "success",
        code: 200,
        data: document,
        message: "Currency updated successfully",
      });
    } catch (error) {
      return res.json({
        status: "error",
        code: 500,
        data: error.message,
        message: "Internal server error",
      });
    }
};

const getOwnerSum = async (req, res) => {
    try {
      const owner = req.params.owner;
  
      const document = await Finances.findOne({ owner });
  
      if (!document) {
        return res.status(404).json({ message: "Document not found" });
      }
  
      const sum = document.sum;
  
      res.json({ sum });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
};
  
const getOwnerCurrency = async (req, res) => {
    try {
      const owner = req.params.owner;
  
      const document = await Finances.findOne({ owner });
  
      if (!document) {
        return res.status(404).json({ message: "Document not found" });
      }
  
      const currency = document.currency;
  
      res.json({ currency });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
};
  
const getFinances = async (req, res, next) => {
    try {
      const owner = req.params.owner;
  
      const document = await Finances.findOne({ owner });
      if (!document) {
        return res.status(404).json({ message: "Document not found" });
      }
      res.send({ status: "ok", data: document });
    } catch (error) {
      next(error);
    }
};
  
const getTransactions = async (req, res, next) => {
    try {
      const owner = req.params.owner;
      const document = await Finances.findOne({ owner });
      if (!document) {
        return res.status(404).json({ message: "Document not found" });
      }
      res.send({ status: "ok", transactions: document.transactions });
    } catch (error) {
      next(error);
    }
};

const removeTransaction = async (req, res, next) => {
    try {
        const finances = await Finances.findOne({ owner: req.params.owner });
        if (!finances) {
            return res.status(404).json({ message: "Owner not found" });
        }
    
        const transaction = finances.transactions.find(
            (t) => t._id.toString() === req.params.id
        );
        if (!transaction) {
            return res.status(404).json({ message: "Transaction not found" });
        }
    
        await Finances.findOneAndUpdate(
            { owner: req.params.owner },
            {
            $pull: { transactions: { _id: req.params.id } },
            $inc: {
                sum: transaction.type === "+" ? -transaction.sum : transaction.sum,
            },
            }
        );
    
        const updatedFinances = await Finances.findOne({ owner: req.params.owner });
        if (!updatedFinances) {
            return res.status(404).json({ message: "Owner not found" });
        }
    
        res.json({
            message: "Transaction deleted",
            deletedTransaction: transaction,
            balance: updatedFinances.sum,
        });
    } catch (error) {
      next(error);
    }
};

module.exports = {
    addTransaction, 
    validCurrencies, 
    changeCurrency, 
    getOwnerSum, 
    getOwnerCurrency, 
    getFinances, 
    getTransactions, 
    removeTransaction
}

