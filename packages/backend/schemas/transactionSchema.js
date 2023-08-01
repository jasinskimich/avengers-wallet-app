const Joi = require("joi");

const transactionSchema = Joi.defaults(() =>
  Joi.object({
    date: Joi.date(),
    type: Joi.string().valid("income", "expense"),
    categoryId: Joi.string(),
    comment: Joi.string(),
    sum: Joi.number().min(1),
  })
);

const atLeastOne = transactionSchema
  .object()
  .or("date", "type", "category", "comment", "sum");
const allRequired = transactionSchema
  .object()
  .options({ presence: "required" })
  .required();

module.exports = {
  atLeastOne,
  allRequired,
};
