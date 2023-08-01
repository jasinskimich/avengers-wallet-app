const JoiSchema = require("../schemas/usersSchema");
// const nanoid = require('nanoid');
const bcrypt = require("bcrypt");
// const sgMail = require("@sendgrid/mail");
const userService = require("../services/userService");
const walletService = require("../services/walletService");
const tokensUtils = require("../utils/tokensUtils");
const walletUtils = require("../utils/walletUtils");

require("dotenv").config();

// sgMail.setApiKey(process.env.SENDGRID_TOKEN);
// const sgFrom = process.env.SENDGRID_EMAIL;

const cookieParams = {
  httpOnly: true,
  // secure: true,
  sameSite: "Strict",
  maxAge: 604800000, // 7 days
};

const signup = async (req, res, next) => {
  try {
    const { email, password, firstName } = req.body;

    const isValid = JoiSchema.allRequired.validate({
      email,
      password,
      firstName,
    });
    if (isValid.error) {
      return res.status(400).json({
        message: isValid.error.details[0].message,
      });
    }

    const isExist = await userService.getUserByEmail({ email });
    if (isExist) {
      return res.status(409).json({
        message: "User with such email already exists",
      });
    }

    const hash = await bcrypt.hash(password, 15);

    // const verificationToken = await nanoid.nanoid();

    const user = await userService.addUser({
      email,
      password: hash,
      firstName,
    });
    if (!user) {
      return res.status(409).json({
        message: "User not created, try again",
      });
    }

    const wallet = await walletService.createWallet({
      balance: 0,
      transactions: [],
      categories: walletUtils.basicCategories(),
      owners: [{ id: user._id, name: user.firstName, role: "main" }],
    });

    await userService.updateUserWallets({
      _id: user._id,
      wallet: { id: wallet._id, role: "main" },
    });

    const { accessToken, refreshToken } = await tokensUtils.generateTokens({
      user,
    });

    // const verificationURL = `${req.protocol}://${req.get(
    //   'host'
    // )}/api/users/verify/:${verificationToken}`;
    // const msgMail = {
    //   to: email,
    //   from: sgFrom,
    //   subject: 'Please verify your email for walletapp',
    //   text: `Hello ${firstName}. You registered an account on walletapp. Before you can access verify your email by clicking here: ${verificationURL}`,
    // };
    // await sgMail.send(msgMail);
    res.cookie("refreshToken", refreshToken, cookieParams);
    res.status(201).json({
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        wallets: [{ id: wallet._id, role: "main" }],
      },
      accessToken,
      message: "New user registered",
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password is required",
      });
    }
    const isValid = JoiSchema.atLeastOne.validate({
      email,
      password,
    });
    if (isValid.error) {
      return res.status(400).json({
        message: isValid.error.details[0].message,
      });
    }

    const user = await userService.getUserByEmail({
      email,
    });
    if (!user) {
      return res.status(404).json({
        message: "Email or password is wrong",
      });
    }

    // if (!user.verify) {
    //   return req.status(403).json({
    //     message: 'User not verified',
    //   });
    // }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(404).json({
        message: "Email or password is wrong",
      });
    }

    const { accessToken, refreshToken } = await tokensUtils.generateTokens({
      user,
    });

    const { firstName, _id } = user;

    res.cookie("refreshToken", refreshToken, cookieParams);
    res.json({
      user: {
        id: _id,
        email,
        firstName,
        wallets: user.wallets,
      },
      accessToken,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const signout = async (req, res, next) => {
  try {
    const { _id } = req.user;

    const user = await userService.getUserById({ _id });
    if (!user) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    await userService.updateUser({
      _id,
      body: { accessToken: null, refreshToken: null },
    });
    res.cookie("refreshToken", null);
    res.status(204).json();
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const verifyToken = async (req, res, next) => {
  try {
    const { verificationToken } = req.params;

    const isVerify = userService.verifyToken({ verificationToken });
    if (!isVerify) {
      return res.status(404).json({
        message: "This verification is not exist",
      });
    }

    res.json({ message: "Verification completed successfully" });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

// const sendVerification = async (req, res, next) => {
//   try {
//     const { email } = req.body;
//     const isValid = JoiSchema.atLeastOne.validate({ email });
//     if (isValid.error) {
//       return res.status(400).json({
//         message: isValid.error.details[0].message,
//       });
//     }

//     const user = await userService.getUserByEmail({ email });
//     if (!user) {
//       return res.status(401).json({
//         message: "User with such email not existed",
//       });
//     }
//     if (user.verify) {
//       return res.status(403).json({
//         message: "User already verified",
//       });
//     }

//     const verificationURL = `${req.protocol}://${req.get(
//       "host"
//     )}/api/users/verify/:${user.verificationToken}`;
//     const msgMail = {
//       to: email,
//       from: sgFrom,
//       subject: "Please verify your email for walletapp",
//       text: `Hello ${user.firstName}. You registered an account on walletapp. Before you can access, verify your email by clicking here: ${verificationURL}`,
//     };
//     await sgMail.send(msgMail);

//     res.json({
//       message: "Verification sent",
//     });
//   } catch (err) {
//     console.error(err);
//     next(err);
//   }
// };

const refreshTokens = async (req, res, next) => {
  try {
    let refreshToken = req.cookies.refreshToken;

    const { tokenDetails } = await tokensUtils.verifyRefreshToken({
      refreshToken,
    });

    if (!tokenDetails) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }
    const { id } = tokenDetails;

    const user = await userService.getUserById({
      _id: id,
    });

    if (!user) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    if (refreshToken !== user.refreshToken) {
      return res.status(401).json({
        message: "Not authorized",
        refreshToken,
        userToken: user.refreshToken,
      });
    }

    const tokens = await tokensUtils.generateTokens({
      user,
    });

    refreshToken = tokens.refreshToken;
    res.cookie("refreshToken", refreshToken, cookieParams);
    res.status(201).json({
      accessToken: tokens.accessToken,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

module.exports = {
  signup,
  signin,
  signout,
  verifyToken,
//   sendVerification,
  refreshTokens,
};
