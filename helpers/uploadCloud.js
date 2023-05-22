const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { AppError } = require("../utils/appError");

cloudinary.config({
  cloud_name: "dqzzp8hct",
  api_key: "131623347864576",
  api_secret: "lsY5YjkUE1uWV6T6zp1ZrJNHlRs",
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  folder: "avatars",
  allowedFormats: ["jpg", "png", "gif", "jpeg"],
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  file.mimetype.startsWith("image")
    ? cb(null, true)
    : cb(new AppError(400, "Downloaded file must be image type"), false);
};

const uploadCloud = multer({
  storage,
  fileFilter,
  limits: { fileSize: 3 * 1024 * 1024 },
});

module.exports = uploadCloud;
