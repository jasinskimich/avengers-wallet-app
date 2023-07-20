const Joi = require("joi").extend(require("@joi/date"));

const ExpenseFormValidation = (data) => {
  const schema = Joi.object({
    type: Joi.string().required(),
    expense: Joi.string().required(),
    amount: Joi.number().required(),
    date: Joi.date().format("DD.MM.YYYY").required(),
    comment: Joi.string(),
  });
  return schema.validate(data);
};
export default ExpenseFormValidation;
