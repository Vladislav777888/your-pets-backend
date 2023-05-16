const Joi = require("joi");

const { regExp } = require("../constants");

exports.registerValidator = (data) => {
  const schema = Joi.object({
    email: Joi.string()
      .email({
        tlds: { allow: false },
      })
      .required(),
    password: Joi.string().regex(regExp.PASSWD_REGEX).required(),
  });

  return schema.validate(data);
};

exports.loginValidator = (data) => {
  const schema = Joi.object({
    email: Joi.string()
      .email({
        tlds: { allow: false },
      })
      .required(),
    password: Joi.string().regex(regExp.PASSWD_REGEX).required(),
  });

  return schema.validate(data);
};
