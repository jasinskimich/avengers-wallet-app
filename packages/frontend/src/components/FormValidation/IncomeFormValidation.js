const Joi = require("joi").extend(require("@joi/date"));

const IncomeFormValidation = (data) => {
  const schema = Joi.object({
    type: Joi.string().required(),
    amount: Joi.number().required(),
    date: Joi.date().format("DD.MM.YYYY").required(),
    comment: Joi.string(),
  });
  return schema.validate(data);
};
export default IncomeFormValidation;
