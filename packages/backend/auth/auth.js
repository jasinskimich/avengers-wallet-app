const { findUser } = require("../controll/userControll");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.SECRET;

const auth = async (req, res, next) => {
  const token = req.headers.authorization;
  try {
    const { id } = jwt.verify(token, secret);
    const user = await findUser("_id", id);
    if (!user) {
      return res.status(401).send({ message: "unauthorized" });
    }
    if (user) {
      next();
    }
  } catch {
    return res.status(401).send({ message: "unauthorized" });
  }
};

module.exports = auth;
