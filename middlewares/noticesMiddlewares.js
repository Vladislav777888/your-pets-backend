const { AppError, catchAsync, noticesValidator } = require("../utils");
const { Notice } = require("../models");

exports.checkAddNotice = catchAsync(async (req, res, next) => {
  const { error, value } = noticesValidator.addNoticeValidator(req.body);

  if (error) {
    return next(
      new AppError(
        400,
        error.details.map((item) => {
          return `${item.message}`;
        })
      )
    );
  }

  req.body = value;

  next();
});

exports.checkAddNoticeToFavorite = catchAsync(async (req, res, next) => {
  const { _id: userId } = req.user;
  const { id } = req.params;

  const { favorite } = await Notice.findOne({ _id: id });

  if (favorite.includes(userId)) {
    return next(new AppError(409, "Notice already added to favorites"));
  }

  next();
});

exports.checkDelNoticeFromFavorite = catchAsync(async (req, res, next) => {
  const { _id: userId } = req.user;
  const { id } = req.params;

  const { favorite } = await Notice.findOne({ _id: id });

  if (!favorite.includes(userId)) {
    return next(new AppError(404, "Notice not in favorites"));
  }

  next();
});

exports.checkRemoveOwnNotice = catchAsync(async (req, res, next) => {
  const { _id: userId } = req.user;

  const { id } = req.params;

  const delNotice = await Notice.findOne({ _id: id, owner: userId });

  if (!delNotice) {
    return next(new AppError(404, "Notice not found"));
  }

  next();
});
