const { News } = require("../models");

exports.getNews = async () => {
  try {
    const news = await News.find();

    return news;
  } catch (error) {
    console.log(error);
  }
};
