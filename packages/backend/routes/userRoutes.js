const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.SECRET;
const { findUser } = require("../controll/userControll");
const auth = require("../auth/auth");

router.get("/", (req, res, next) => {
  res.send("respond with a resource");
});

router.get("/current", auth, async (req, res, next) => {
  const token = req.headers.authorization;
  const { id } = jwt.verify(token, secret);
  try {
    const user = await findUser("_id", id);
    return res
      .status(200)
      .send({ messaage: "Succesfully get current user info!", user });
  } catch {
    return res.status(404).send({ message: "Something went wrong!" });
  }
});

module.exports = router;
