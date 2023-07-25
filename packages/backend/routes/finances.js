const express = require("express");
const router = express.Router();
// const { nanoid } = require("nanoid");
require("dotenv").config();

const Finances = require("../models/finances");
const User = require("../models/users");

const addTransaction = async (req, res, next) => {
  let owner = req.params.id;
  let sum = 0;
  let transactions = [];
  const { transaction } = req.body;
  const user = await User.findOne({ owner });

  if (!user) {
    return res.json({
      status: "error",
      code: 401,
      data: "Unauthorized",
      message: "Not authorized",
    });
  }

  try {
    const newTransaction = new Finances({
      owner: owner,
      sum: sum,
      transactions: transactions.push(transaction),
    });
    newTransaction.save();
    console.log(newTransaction);
  } catch (error) {
    next(error);
  }
};

router.post("/finances", addTransaction);

// GET Balance sum
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

router.get("/finances/sum/:owner", getOwnerSum);
// ..............................................

module.exports = router;
