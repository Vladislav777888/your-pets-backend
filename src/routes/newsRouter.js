const express = require("express");
const { newsController } = require("../controllers");
const newsRouter = express.Router();

newsRouter.route("/").get(newsController.getNews);

module.exports = newsRouter;
