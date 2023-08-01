const User = require("../models/userModel");


const addUser = ({ email, password, firstName, verificationToken }) => {
  try {
    return User.create({
      email,
      password,
      firstName,
      verificationToken,
    });
  } catch (err) {
    return false;
  }
};

const getUserByEmail = ({ email }) => {
  try {
    return User.findOne({ email });
  } catch (err) {
    return false;
  }
};

const getUserById = ({ _id }) => {
  try {
    return User.findOne({ _id: _id }).exec();
  } catch (err) {
    return false;
  }
};

const getUserByRefreshToken = ({ refreshToken }) => {
  try {
    return User.findOne({ refreshToken });
  } catch (err) {
    return false;
  }
};

const updateUser = ({ _id, body }) => {
  try {
    return User.findOneAndUpdate({ _id }, body, { new: true });
  } catch (err) {
    return false;
  }
};

const updateUserWallets = ({ _id, wallet }) => {
  try {
    return User.updateOne({ _id }, { $push: { wallets: wallet } });
  } catch (err) {
    return false;
  }
};

const verifyToken = ({ verificationToken }) => {
  try {
    return User.findOneAndUpdate(
      { verificationToken },
      { verify: true, verificationToken: null },
      { new: true }
    );
  } catch (err) {
    return false;
  }
};

module.exports = {
  addUser,
  getUserByEmail,
  getUserById,
  getUserByRefreshToken,
  updateUser,
  updateUserWallets,
  verifyToken,
};