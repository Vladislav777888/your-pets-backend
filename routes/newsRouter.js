const express = require("express");
const { newsController } = require("../controllers");
const newsRouter = express.Router();

newsRouter.route("/").get(newsController.getNews);
newsRouter.route("/title").get(newsController.getNewsByTitle);

module.exports = newsRouter;
