const { Friend } = require("../models");

exports.getFriends = async () => {
  try {
    const friend = await Friend.find();

    return friend;
  } catch (error) {
    console.log(error);
  }
};
