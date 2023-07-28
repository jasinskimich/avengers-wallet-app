const express = require("express");
const router = express.Router();
// const { nanoid } = require("nanoid");
require("dotenv").config();

const Finances = require("../models/finances");

const addTransaction = async (req, res, next) => {

	const owner = req.params.owner;
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

router.put("/finances/currency/:owner", changeCurrency);



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
}
router.get("/finances/transactions/:owner", getTransactions)
router.get("/finances/sum/:owner", getOwnerSum);
router.get("/finances/currency/:owner", getOwnerCurrency);
router.get("/getfinances/:owner", getFinances);

// ..............................................

module.exports = router;
