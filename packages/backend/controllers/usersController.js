const userService = require("../services/userService");

require("dotenv").config();

const currentUser = async (req, res, next) => {
  try {
    const { _id } = req.user;

    const user = await userService.getUserById({ _id });
    if (!user) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    const { email, firstName, wallets } = user;
    res.status(201).json({
      user: {
        id: _id,
        email,
        firstName,
        wallets,
      },
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

module.exports = {
  currentUser,
};
