const { newsService } = require("../services");
const { catchAsync } = require("../utils");

exports.getNews = catchAsync(async (req, res) => {
  const news = await newsService.getNews();

  res.status(200).json({
    news,
  });
});
