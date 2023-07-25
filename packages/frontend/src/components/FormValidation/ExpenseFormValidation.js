const Joi = require("joi").extend(require("@joi/date"));

const ExpenseFormValidation = (data) => {
  const schema = Joi.object({
    date: Joi.date().format("DD.MM.YYYY").required(),
    type: Joi.string().required(),
    category: Joi.string().required(),
    comment: Joi.string().allow(""),
    sum: Joi.number().required(),
  });
  return schema.validate(data);
};
export default ExpenseFormValidation;
