const Users = require("../schemas/user");

const createUser = async (credentials) => {
  return await Users.create(credentials);
};

const findUser = async (value, credentials) => {
  return await Users.findOne({ [value]: credentials });
};

const updateUser = async (id, updateinfo) => {
  return await Users.findByIdAndUpdate(id, updateinfo);
};

module.exports = { createUser, findUser, updateUser };
