const express = require("express");
const petsRouter = express.Router();

const { userMiddlewares, petsMiddlewares } = require("../middlewares");
const { petsController } = require("../controllers");
const { petJoiSchema } = require("../models/petModel");
const { validateBody, uploadCloud } = require("../helpers");

petsRouter.use(userMiddlewares.protectRoute);

petsRouter.route("/").get(petsController.getAllPets);

petsRouter
  .route("/")
  .post(
    [uploadCloud.single("photo"), validateBody(petJoiSchema)],
    petsController.addPet
  );

petsRouter
  .route("/:id")
  .delete(petsMiddlewares.checkIsValidId, petsController.removePet);

module.exports = petsRouter;
