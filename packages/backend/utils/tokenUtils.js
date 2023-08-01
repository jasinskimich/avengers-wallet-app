const jwt = require("jsonwebtoken");
const userService = require("../services/userService");

require("dotenv").config();

const secretAccess = process.env.SECRET_ACCESS_TOKEN;
const secretRefresh = process.env.SECRET_REFRESH_TOKEN;

const generateTokens = async ({ user }) => {
  const payload = {
    id: user._id,
    username: user.email,
  };
  const accessToken = jwt.sign(payload, secretAccess, { expiresIn: "1h" });
  const refreshToken = jwt.sign(payload, secretRefresh, { expiresIn: "30d" });

  const addToken = await userService.updateUser({
    _id: user._id,
    body: { accessToken, refreshToken },
  });

  if (!addToken) {
    return false;
  }

  return { accessToken, refreshToken };
};

const verifyRefreshToken = async ({ refreshToken }) => {
  const user = await userService.getUserByRefreshToken({ refreshToken });
  if (!user) {
    return false;
  }
  return jwt.verify(refreshToken, secretRefresh, (err, tokenDetails) => {
    if (err) {
      return false;
    }
    return { tokenDetails };
  });
};

module.exports = {
  generateTokens,
  verifyRefreshToken,
};
