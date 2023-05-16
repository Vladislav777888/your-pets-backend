const express = require("express");
const friendsRouter = express.Router();
const { friendsController } = require("../controllers");

friendsRouter.route("/").get(friendsController.getFriends);

module.exports = friendsRouter;
