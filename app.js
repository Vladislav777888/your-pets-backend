const express = require("express");
const swaggerUi = require("swagger-ui-express");
const logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const swaggerJsDoc = require("./docs/swagger.json");
const {
  userRouter,
  noticesRouter,
  petsRouter,
  newsRouter,
  friendsRouter,
} = require("./routes");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Database connection successful"))
  .catch((error) => {
    console.log(error);

    process.exit(1);
  });

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJsDoc));
app.use("/api", userRouter);
app.use("/api/notices", noticesRouter);
app.use("/api/pets", petsRouter);
app.use("/api/news", newsRouter);
app.use("/api/friends", friendsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status } = err;

  res.status(status || 500).json({ message: err.message });
});

module.exports = app;
