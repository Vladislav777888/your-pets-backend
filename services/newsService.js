const { News } = require("../models");

exports.getNews = async ({ skip = 0, limit = 6 }) => {
  try {
    const total = await News.find().count();
    const news = await News.find().skip(skip).limit(limit);

    return { news, total };
  } catch (error) {
    console.log(error);
  }
};

exports.getNewsByTitle = async ({ search }, { skip = 0, limit = 6 }) => {
  try {
    const total = await News.find({
      title: { $regex: new RegExp(search, "i") },
    }).count();

    const news = await News.find({ title: { $regex: new RegExp(search, "i") } })
      .skip(skip)
      .limit(limit);

    return { news, total };
  } catch (error) {
    console.log(error);
  }
};
