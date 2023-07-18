const express = require("express");
const router = express.Router();
const { createUser, findUser } = require("../controll/userControll");
const auth = require("../auth/auth");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.SECRET;

router.post("/sign-up", async (req, res, next) => {
  // //validation response
  // res.status(400).send({message: "Validation error!"})
  const isEmailTaken = await findUser("email", req.body.email);
  if (isEmailTaken) {
    return res.status(409).send({
      message: "Sorry, this email already exist in our database!",
    });
  }
  try {
    const user = await createUser(req.body);
    user.balance = 0;
    user.save();
    return res.status(201).send({ message: "Registered successfully!" });
  } catch {
    return res.send({
      message: "Something went wrong with your registration!",
    });
  }
});

router.post("/sign-in", async (req, res, next) => {
  // //validation response
  // res.status(400).send({message: "Validation error!"})
  const { email, password } = req.body;
  try {
    const user = await findUser("email", email);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    const payload = { email: user.email, id: user._id };
    const token = jwt.sign(payload, secret, { expiresIn: "1h" });
    console.log(token);
    if (user.password !== password) {
      return res.status(403).send({ message: "Wrong email or password" });
    }

    return res
      .status(201)
      .send({ message: "Successfully logged in!", user, token });
  } catch {
    return res.status(404).send({
      message: "Something went wrong with log in action! ",
    });
  }
});

router.delete("/sign-out", auth, async (req, res, next) => {
  try {
    return res.status(201).send({ message: "Logged out!" });
  } catch {
    return res.status(201).send({ message: "Something went wrong!" });
  }
});

module.exports = router;
