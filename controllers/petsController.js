const { catchAsync } = require("../utils");
const { petsService } = require("../services");
const cloudinary = require("cloudinary").v2;

exports.getAllPets = catchAsync(async (req, res, next) => {
  const { _id: userId } = req.user;
  let { page = 1, limit = 2 } = req.query;

  page = +page;
  limit = +limit;

  limit = limit > 2 ? 2 : limit;
  const skip = (page - 1) * limit;

  const { pets, total } = await petsService.getAllPets(userId, {
    skip,
    limit,
  });

  res.status(200).json({
    pets,
    page,
    per_page: limit,
    total,
  });
});

exports.addPet = catchAsync(async (req, res, next) => {
  const { _id: userId } = req.user;
  const { body, file } = req;

  if (file) {
    const { path } = req.file;

    const fileName = path.split("/");
    const length = fileName.length;

    body.photo = cloudinary.url(fileName[length - 1], {
      width: 200,
      height: 200,
      gravity: "faces",
      crop: "fill",
      quality: "auto",
      fetch_format: "jpg",
    });
  }

  const newPet = await petsService.addPet(body, userId);

  res.status(201).json({ newPet });
});

exports.removePet = catchAsync(async (req, res, next) => {
  const { id: petId } = req.params;
  const { _id: userId } = req.user;

  await petsService.removePet(petId, userId);

  res.status(200).json({ message: "pet was deleted" });
});
