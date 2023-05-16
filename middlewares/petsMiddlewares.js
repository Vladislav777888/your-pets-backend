const { Types } = require("mongoose");
const { AppError, catchAsync } = require("../utils");

exports.checkIsValidId = catchAsync(async (req, res, next) => {
  const { id: petId } = req.params;

  const idIsValid = Types.ObjectId.isValid(petId);

  if (!idIsValid) {
    return next(new AppError(404, "Not found"));
  }

  next();
});
