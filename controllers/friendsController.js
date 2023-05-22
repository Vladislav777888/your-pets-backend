const { friendsService } = require("../services");
const { catchAsync } = require("../utils");

exports.getFriends = catchAsync(async (req, res) => {
  const friends = await friendsService.getFriends();

  res.status(200).json({
    friends,
  });
});
