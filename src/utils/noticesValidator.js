const Joi = require("joi");
const { regExp } = require("../constants");

exports.addNoticeValidator = (data) => {
  const schema = Joi.object({
    category: Joi.string()
      .valid("sell", "lost-found", "for-free")
      .default("sell")
      .required(),
    title: Joi.string().min(2).max(120).required(),
    name: Joi.string().min(2).max(16).required(),
    birthdate: Joi.date().min("1914-01-01").max(Date.now()).iso(),
    breed: Joi.string().min(2).max(16).required(),
    sex: Joi.string().valid("male", "female").default("male").required(),
    location: Joi.string().min(2).max(36).pattern(regExp.LOCATION).required(),
    comments: Joi.string().min(8).max(120).required(),
    price: Joi.number().default(0),
    favorite: Joi.array().items(Joi.string()),
  });

  return schema.validate(data);
};
