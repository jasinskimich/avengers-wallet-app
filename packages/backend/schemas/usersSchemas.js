const Joi = require("joi");

const custom = Joi.defaults(() =>
  Joi.object({
    password: Joi.string().pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,12}$/
    ),
    email: Joi.string().email(),
    firstName: Joi.string().min(1).max(12),
  })
);

const atLeastOne = custom.object().or("password", "email", "firstName");
const allRequired = custom
  .object()
  .options({ presence: "required" })
  .required();

module.exports = {
  atLeastOne,
  allRequired,
};
