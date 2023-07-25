const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const passport = require("passport");
const { nanoid } = require("nanoid");
require("dotenv").config();

const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const User = require("../models/users");
const Finances = require("../models/finances");

const auth = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (!user || err) {
      return res.status(401).json({
        status: "error",
        code: 401,
        data: "Unauthorized",
        message: "Not authorized",
      });
    }
    req.user = user;
    next();
  })(req, res, next);
};
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    next(error);
  }
};
router.get("/all-users", getAllUsers);

const sendVerificationEmail = async (email, verificationToken) => {
  const msg = {
    to: email,
    from: "walletavengersapp@gmail.com",
    subject: "Please verify your email and registration.",
    text: `URL to mail verification: ${verificationToken}`,
    html: `<p>Click <a href="http://localhost:5000/api/users/verify/${verificationToken}"><strong>here</strong></a> to verify your email and registration.</p>`,
  };

  return sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
};

router.post("/users/signup", async (req, res, next) => {
  const { email, password, name } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return res.json({
      status: "error",
      code: 409,
      data: "Conflict",
      message: "Email in use",
    });
  }
  try {
    const newUser = new User({ email });

    newUser.name = name;

    newUser.setPassword(password);

    newUser.verificationToken = nanoid();

    await newUser.save();

    await sendVerificationEmail(email, newUser.verificationToken);

    const newFinances = new Finances({ owner: newUser._id, sum: 0, transactions: [] });
    await newFinances.save();

    res.json({
      status: "success",
      code: 201,
      data: "Created",
      message: "Register complete! Check your email to confirm verification.",
    });
  } catch (error) {
    next(error);
  }
});

router.post("/users/login", async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const loginVerify = user.verify;

  if (!user || !user.validPassword(password)) {
    return res.json({
      status: "error",
      code: 400,
      data: "Bad request",
      message: "Incorrect login or password",
    });
  }

  if (loginVerify === false) {
    return res.json({
      status: "error",
      code: 404,
      data: "Not found",
      message: "Incorrect login or password. Check if your login is verified.",
    });
  }

  const payload = {
    id: user.id,
  };

  const secret = process.env.SECRET;

  const token = jwt.sign(payload, secret, { expiresIn: "1h" });

  user.token = token;

  await user.save();

  return res.json({
    status: "success",
    code: 200,
    data: {
      token,
      user,
    },
  });
});

router.get("/users/logout", auth, async (req, res, next) => {
  const id = req.user._id;
  const user = await User.findById(id);

  if (!user) {
    return res.json({
      status: "error",
      code: 401,
      data: "Unauthorized",
      message: "Not authorized",
    });
  }

  user.token = null;
  await user.save();

  return res.json({
    status: "success",
    code: 204,
    message: "Logout successful",
  });
});

router.get("/users/current", auth, async (req, res, next) => {
  const email = req.user.email;
  const name = req.user.name;
  const id = req.user._id;
  const user = await User.findById(id);

  if (!user) {
    return res.json({
      status: "error",
      code: 401,
      data: "Unauthorized",
      message: "Not authorized",
    });
  }

  return res.json({
    status: "success",
    code: 200,
    data: {
      email,
      name,
    },
    message: `Current user is ${email}`,
  });
});

router.get("/users/verify/:verificationToken", async (req, res, next) => {
  const user = await User.findOne({ verificationToken: req.params.verificationToken });

  if (!user) {
    return res.json({
      status: "error",
      code: 404,
      message: "User not found",
      data: "Not found",
    });
  }

  try {
    user.verify = true;
    user.verificationToken = "null";
    await user.save();

    // res.send({
    //   status: 'success',
    //   code: 200,
    //   message: 'Verification successful',
    //   data: 'OK',
    // })

    res.send('<h1>Registration Complete!</h1><p>Click <a href="http://localhost:3000/login"><strong>here</strong></a> to go to the login page.</p>');
  } catch (error) {
    next(error);
  }
});

router.post("/users/verify", async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!email) {
    return res.json({
      status: "error",
      code: 400,
      message: "Missing required field email",
    });
  }

  if (email && user.verify === true) {
    return res.json({
      status: "error",
      code: 400,
      message: "Verification has already passed",
    });
  }

  if (email && user.verify === false) {
    await sendVerificationEmail(email, user.verificationToken);

    return res.json({
      status: "success",
      code: 200,
      message: "Verification email sent",
    });
  }
});

router.get(`/users/checkEmail/:email`, async (req, res, next) => {
  const { email } = req.params;
  const user = await User.findOne({ email });

  if (user) {
    return res.json({ exists: true });
  } else {
    return res.json({ exists: false });
  }
});

router.get(`/users/checkVerify/:email`, async (req, res, next) => {
  const { email } = req.params;
  const user = await User.findOne({ email });

  if (user.verify === true) {
    return res.json({ verification: true });
  } else {
    return res.json({ verification: false });
  }
});

module.exports = router;
