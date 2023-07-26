const express = require("express");
const router = express.Router();
// const { nanoid } = require("nanoid");
require("dotenv").config();

const Finances = require("../models/finances");
const User = require("../models/users");

const addTransaction = async (req, res, next) => {
  let owner = req.params.owner;
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
    document.sum = document.sum + transaction.sum;
  } else {
    document.sum = document.sum - transaction.sum;
  }

  document.transactions.push(transaction);
  document.save();

  return res.json({
    status: "success",
    code: 200,
    data: {
      document,
    },
  });
};

router.put("/finances/:owner", addTransaction);

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
