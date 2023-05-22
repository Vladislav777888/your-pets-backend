const express = require("express");
const userRouter = express.Router();

const { userMiddlewares } = require("../middlewares");
const { userController } = require("../controllers");
const { uploadCloud } = require("../helpers");

userRouter
  .route("/auth/register")
  .post(userMiddlewares.checkUserRegister, userController.registerUser);

userRouter
  .route("/auth/login")
  .post(userMiddlewares.checkUserLogin, userController.loginUser);

// userRouter
//   .route('/auth/google')
//   .post(userController.googleAuth);

userRouter
  .route("/user/logout")
  .post(userMiddlewares.checkUserLogout, userController.logoutUser);

userRouter
  .route("/user/current")
  .get(userMiddlewares.checkCurrentUser, userController.currentUser);

userRouter
  .route("/user/info")
  .patch(
    [
      userMiddlewares.checkCurrentUser,
      userMiddlewares.checkUserInfo,
      uploadCloud.single("avatar"),
    ],
    userController.updateUserInfo
  );

module.exports = userRouter;
