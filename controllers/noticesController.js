const { catchAsync } = require("../utils");
const { noticesService } = require("../services");
const cloudinary = require("cloudinary").v2;

exports.addOwnNotice = catchAsync(async (req, res) => {
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

  const notice = await noticesService.addOwnNotice(userId, body);

  res.status(200).json({ notice });
});

exports.addNoticeToFavorite = catchAsync(async (req, res, next) => {
  const { _id: userId } = req.user;
  const { id: noticeId } = req.params;

  const notice = await noticesService.addNoticeToFavorite(userId, noticeId);

  res.status(200).json({
    userId: userId,
    noticeId: notice._id,
  });
});

exports.removeNoticeFromFavorite = catchAsync(async (req, res, next) => {
  const { _id: userId } = req.user;
  const { id: noticeId } = req.params;

  await noticesService.removeNoticeFromFavorite(userId, noticeId);

  res.status(200).json({ message: "Notices was deleted from favorites" });
});

exports.removeOwnNotice = catchAsync(async (req, res, next) => {
  const { _id: userId } = req.user;

  const { id: noticeId } = req.params;

  await noticesService.removeOwnNotice(userId, noticeId);

  res.status(200).json({ message: "Notice was deleted" });
});

exports.listNoticesByCategory = catchAsync(async (req, res, next) => {
  const { category } = req.params;
  let { page = 1, limit = 12 } = req.query;

  page = +page;
  limit = +limit;

  limit = limit > 12 ? 12 : limit;
  const skip = (page - 1) * limit;

  const { notices, total } = await noticesService.listNoticesByCategory(
    category,
    {
      skip,
      limit,
    }
  );

  res.status(200).json({ notices, page, per_page: limit, total });
});

exports.getNoticeById = catchAsync(async (req, res) => {
  const { id: noticeId } = req.params;

  const notice = await noticesService.getNoticeById(noticeId);

  res.status(200).json({ notice });
});

exports.listUserOwnNotices = catchAsync(async (req, res) => {
  const { _id: userId } = req.user;
  let { page = 1, limit = 12 } = req.query;

  page = +page;
  limit = +limit;

  limit = limit > 12 ? 12 : limit;
  const skip = (page - 1) * limit;

  const { notices, total } = await noticesService.listUserOwnNotices(userId, {
    skip,
    limit,
  });

  res.status(200).json({ notices, page, per_page: limit, total });
});

exports.listFavoriteNotices = catchAsync(async (req, res) => {
  const { _id: userId } = req.user;
  let { page = 1, limit = 12 } = req.query;

  page = +page;
  limit = +limit;

  limit = limit > 12 ? 12 : limit;

  const skip = (page - 1) * limit;

  const { notices, total } = await noticesService.listFavoriteNotices(userId, {
    skip,
    limit,
  });

  res.status(200).json({ notices, page, per_page: limit, total });
});

exports.searcNoticeByTitle = catchAsync(async (req, res) => {
  let { search = "", page = 1, limit = 12 } = req.query;
  const { category } = req.params;

  page = +page;
  limit = +limit;

  limit = limit > 12 ? 12 : limit;

  const skip = (page - 1) * limit;

  const { notices, total } = await noticesService.searcNoticeByTitle(
    { search, category },
    { skip, limit }
  );

  res.status(200).json({ notices, page, per_page: limit, total });
});

exports.searchFavoriteNoticeByTitle = catchAsync(async (req, res) => {
  let { page = 1, limit = 12, search = "" } = req.query;
  const { _id: userId } = req.user;

  page = +page;
  limit = +limit;

  limit = limit > 12 ? 12 : limit;
  const skip = (page - 1) * limit;

  const { notices, total } = await noticesService.searchFavoriteNoticeByTitle(
    { search, userId },
    { skip, limit }
  );

  res.status(200).json({ notices, page, per_page: limit, total });
});

exports.searchUserNoticeByTitle = catchAsync(async (req, res) => {
  const { _id: userId } = req.user;
  let { page = 1, limit = 12, search = "" } = req.query;

  page = +page;
  limit = +limit;

  limit = limit > 12 ? 12 : limit;
  const skip = (page - 1) * limit;

  const { notices, total } = await noticesService.searchUserNoticeByTitle(
    { search, userId },
    { skip, limit }
  );

  res.status(200).json({ notices, page, per_page: limit, total });
});
