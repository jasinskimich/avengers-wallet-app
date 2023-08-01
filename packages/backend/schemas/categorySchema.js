const Joi = require("joi");

const categorySchema = Joi.object({
  id: Joi.string(),
  name: Joi.string(),
  type: Joi.array(),
});

const atLeastOne = categorySchema.object().or("id", "name", "type");
const allRequired = categorySchema
  .object()
  .options({ presence: "required" })
  .required();

module.exports = {
  atLeastOne,
  allRequired,
};
