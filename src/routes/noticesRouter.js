const express = require("express");
const noticeRouter = express.Router();

const {
  petsMiddlewares,
  userMiddlewares,
  noticesMiddlewares,
} = require("../middlewares");
const { noticesController } = require("../controllers");
const { uploadCloud } = require("../helpers");

// Список нотісів по категоріям
noticeRouter.route("/:category").get(noticesController.listNoticesByCategory);

// Отримання нотіса по id
noticeRouter
  .route("/card/:id")
  .get(petsMiddlewares.checkIsValidId, noticesController.getNoticeById);

// Список нотісів по ключовому слову
noticeRouter
  .route("/title/search/:category")
  .get(noticesController.searcNoticeByTitle);

// Далі пішли захищєні маршрути
noticeRouter.use(userMiddlewares.protectRoute);

// Додавання нотіса юзером
noticeRouter
  .route("/")
  .post(
    [uploadCloud.single("photo"), noticesMiddlewares.checkAddNotice],
    noticesController.addOwnNotice
  );

// Додавання нотіса до улюблених
noticeRouter
  .route("/:id/favorite")
  .post(
    [
      petsMiddlewares.checkIsValidId,
      noticesMiddlewares.checkAddNoticeToFavorite,
    ],
    noticesController.addNoticeToFavorite
  );

// Видалення нотіса з улюблених
noticeRouter
  .route("/:id/favorite")
  .delete(
    [
      petsMiddlewares.checkIsValidId,
      noticesMiddlewares.checkDelNoticeFromFavorite,
    ],
    noticesController.removeNoticeFromFavorite
  );

// Видалення власного нотіса
noticeRouter
  .route("/:id")
  .delete(
    [petsMiddlewares.checkIsValidId, noticesMiddlewares.checkRemoveOwnNotice],
    noticesController.removeOwnNotice
  );

// Отримання списка нотісів, які створив юзер
noticeRouter.route("/user/own").get(noticesController.listUserOwnNotices);

// Отримання списка нотісів, які додані до улюблених
noticeRouter.route("/user/favorite").get(noticesController.listFavoriteNotices);

// Список улюблених нотісів по ключовому слову
noticeRouter
  .route("/title/favorite")
  .get(noticesController.searchFavoriteNoticeByTitle);

// Список власних доданих нотісів по ключовому слову
noticeRouter.route("/title/own").get(noticesController.searchUserNoticeByTitle);

module.exports = noticeRouter;
