const express = require("express");
const router = express.Router();
require("dotenv").config();

const financeControllers = require("../controllers/finances")

router.post("/finances/:owner", financeControllers.addTransaction);

router.put("/finances/currency/:owner", financeControllers.changeCurrency);
router.put("/finances/transactions/:owner/:id", financeControllers.addTransaction);

router.get("/finances/transactions/:owner", financeControllers.getTransactions);
router.get("/finances/sum/:owner", financeControllers.getOwnerSum);
router.get("/finances/currency/:owner", financeControllers.getOwnerCurrency);
router.get("/getfinances/:owner", financeControllers.getFinances);

router.delete("/finances/transactions/:owner/:id", financeControllers.removeTransaction);

module.exports = router;
