const { Notice } = require("../models");

exports.addOwnNotice = async (userId, body) => {
  try {
    const notice = new Notice({
      ...body,
      price: Number(body.price),
      owner: userId,
    });

    await notice.save();

    return notice;
  } catch (error) {
    console.log(error);
  }
};

exports.addNoticeToFavorite = async (userId, noticeId) => {
  try {
    const notice = await Notice.findOneAndUpdate(
      { _id: noticeId },
      { $push: { favorite: userId } }
    );

    return notice;
  } catch (error) {
    console.log(error);
  }
};

exports.removeNoticeFromFavorite = async (userId, noticeId) => {
  try {
    return await Notice.findOneAndUpdate(
      { _id: noticeId },
      { $pull: { favorite: userId } },
      {
        new: true,
      }
    );
  } catch (error) {
    console.log(error);
  }
};

exports.removeOwnNotice = async (userId, noticeId) => {
  try {
    return await Notice.findOneAndDelete({ _id: noticeId, owner: userId });
  } catch (error) {
    console.log(error);
  }
};

exports.listNoticesByCategory = async (category, { skip = 0, limit = 12 }) => {
  try {
    const total = await Notice.find({ category }).count();

    const notices = await Notice.find(
      { category },
      "-createdAt -updatedAt -idCloudAvatar"
    )
      .sort({ createdAt: -1 })
      .populate("owner", "email phone")
      .skip(skip)
      .limit(limit);

    return { notices, total };
  } catch (error) {
    console.log(error);
  }
};

exports.getNoticeById = async (noticeId) => {
  try {
    const notice = await Notice.findById(
      { _id: noticeId },
      "-createdAt -updatedAt -idCloudAvatar"
    ).populate("owner", "email phone");

    return notice;
  } catch (error) {
    console.log(error);
  }
};

exports.listUserOwnNotices = async (userId, { skip = 0, limit = 12 }) => {
  try {
    const total = await Notice.find({ owner: userId }).count();

    const notices = await Notice.find(
      { owner: userId },
      "-createdAt -updatedAt -idCloudAvatar"
    )
      .sort({ createdAt: -1 })
      .populate("owner", "email phone")
      .skip(skip)
      .limit(limit);

    return { notices, total };
  } catch (error) {
    console.log(error);
  }
};

exports.listFavoriteNotices = async (userId, { skip = 0, limit = 12 }) => {
  try {
    const total = await Notice.find({
      favorite: { $in: userId },
    }).count();

    const notices = await Notice.find(
      {
        favorite: { $in: userId },
      },
      "-createdAt -updatedAt -idCloudAvatar"
    )
      .sort({
        createdAt: -1,
      })
      .populate("owner", "email phone")
      .skip(skip)
      .limit(limit);

    return { notices, total };
  } catch (error) {
    console.log(error);
  }
};

exports.searcNoticeByTitle = async (
  { search, category },
  { skip = 0, limit = 12 }
) => {
  try {
    const total = await Notice.find({
      category,
      title: { $regex: new RegExp(search, "i") },
    }).count();

    const notices = await Notice.find(
      { category, title: { $regex: new RegExp(search, "i") } },
      "-createdAt -updatedAt"
    )
      .sort({ createdAt: -1 })
      .populate("owner", "email phone")
      .skip(skip)
      .limit(limit);

    return { notices, total };
  } catch (error) {
    console.log(error);
  }
};

exports.searchFavoriteNoticeByTitle = async (
  { search, userId },
  { skip = 0, limit = 12 }
) => {
  try {
    const total = await Notice.find({
      favorite: { $in: userId },
      title: { $regex: new RegExp(search, "i") },
    }).count();

    const notices = await Notice.find(
      { favorite: { $in: userId }, title: { $regex: new RegExp(search, "i") } },
      "-createdAt -updatedAt -idCloudAvatar"
    )
      .sort({ createdAt: -1 })
      .populate("owner", "email phone")
      .skip(skip)
      .limit(limit);

    return { notices, total };
  } catch (error) {
    console.log(error);
  }
};

exports.searchUserNoticeByTitle = async (
  { search, userId },
  { skip = 0, limit = 12 }
) => {
  try {
    const total = await Notice.find({
      owner: userId,
      title: { $regex: new RegExp(search, "i") },
    }).count();

    const notices = await Notice.find(
      { owner: userId, title: { $regex: new RegExp(search, "i") } },
      "-createdAt -updatedAt -idCloudAvatar"
    )
      .sort({ createdAt: -1 })
      .populate("owner", "email phone")
      .skip(skip)
      .limit(limit);

    return { notices, total };
  } catch (error) {
    console.log(error);
  }
};
