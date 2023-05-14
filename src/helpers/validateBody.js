const { AppError } = require("../utils/index");

const validateBody = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(new AppError(400, `${error}`));
      return;
    }
    next();
  };
};

module.exports = validateBody;
