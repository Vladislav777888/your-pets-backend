const { newsService } = require("../services");
const { catchAsync } = require("../utils");

exports.getNews = catchAsync(async (req, res) => {
  let { page = 1, limit = 6 } = req.query;

  page = +page;
  limit = +limit;

  limit = limit > 6 ? 6 : limit;
  const skip = (page - 1) * limit;

  const { news, total } = await newsService.getNews({ skip, limit });

  res.status(200).json({
    news,
    page,
    per_page: limit,
    total,
  });
});

exports.getNewsByTitle = catchAsync(async (req, res) => {
  let { search = "", page = 1, limit = 6 } = req.query;

  page = +page;
  limit = +limit;

  limit = limit > 6 ? 6 : limit;

  const skip = (page - 1) * limit;

  const { news, total } = await newsService.getNewsByTitle(
    { search },
    { skip, limit }
  );

  res.status(200).json({ news, page, per_page: limit, total });
});
