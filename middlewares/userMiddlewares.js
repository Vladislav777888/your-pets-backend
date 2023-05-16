const jwt = require("jsonwebtoken");

const { User } = require("../models");
const { AppError, catchAsync, userValidator } = require("../utils");

exports.checkUserRegister = catchAsync(async (req, res, next) => {
  const { error, value } = userValidator.registerValidator(req.body);

  if (error) {
    return next(new AppError(400, error.details[0].message));
  }

  const userExists = await User.exists({ email: value.email });

  if (userExists) return next(new AppError(409, "Email in use"));

  req.body = value;

  next();
});

exports.checkUserLogin = catchAsync(async (req, res, next) => {
  const { error, value } = userValidator.loginValidator(req.body);

  const user = await User.findOne({
    email: value.email,
  });

  if (error) {
    return next(new AppError(400, error.details[0].message));
  }

  if (!user) {
    return next(new AppError(401, "Email or password is wrong"));
  }

  const correctPassword = await user.checkPassword(
    value.password,
    user.password
  );

  if (!correctPassword) {
    return next(new AppError(401, "Email or password is wrong"));
  }

  req.body = value;

  next();
});

exports.protectRoute = catchAsync(async (req, res, next) => {
  const token =
    req.headers.authorization?.startsWith("Bearer") &&
    req.headers.authorization.split(" ")[1];

  if (!token) return next(new AppError(401, "Not authorized"));

  let decodedToken;

  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    console.log(err.message);

    return next(new AppError(401, "Not authorized"));
  }

  const currentUser = await User.findOne({ _id: decodedToken.id, token });

  if (!currentUser) return next(new AppError(401, "Not authorized"));

  req.user = currentUser;

  next();
});

exports.checkCurrentUser = catchAsync(async (req, res, next) => {
  const token =
    req.headers.authorization?.startsWith("Bearer") &&
    req.headers.authorization.split(" ")[1];

  if (!token) return next(new AppError(401, "Not authorized"));

  const currentUser = await User.findOne({ token });

  if (!currentUser) return next(new AppError(401, "Not authorized"));

  req.user = currentUser;

  next();
});

exports.checkUserLogout = catchAsync(async (req, res, next) => {
  const token =
    req.headers.authorization?.startsWith("Bearer") &&
    req.headers.authorization.split(" ")[1];

  if (!token) return next(new AppError(401, "Not authorized"));

  let decodedToken;

  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    console.log(err.message);

    return next(new AppError(401, "Not authorized"));
  }

  const currentUser = await User.findOne({ _id: decodedToken.id, token });

  if (!currentUser) return next(new AppError(401, "Not authorized"));

  req.user = currentUser;

  next();
});

exports.checkUserInfo = catchAsync(async (req, res, next) => {
  const { error, value } = userValidator.updateUserInfoValidator(req.body);

  if (error) {
    return next(new AppError(400, error.details[0].message));
  }

  const userExists = await User.exists({ email: value.email });

  if (userExists) return next(new AppError(409, "Email in use"));

  req.body = value;

  next();
});
