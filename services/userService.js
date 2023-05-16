const { User } = require("../models");
const { signToken } = require("../utils");

exports.register = async (body) => {
  try {
    const user = await User.create({ ...body });

    return user;
  } catch (error) {
    console.log(error);
  }
};

exports.login = async (body) => {
  try {
    const { email } = body;
    const user = await User.findOne({ email });

    const token = signToken(user._id);

    user.token = token;
    await user.save();

    return user;
  } catch (error) {
    console.log(error);
  }
};

exports.logout = async (currentUser) => {
  try {
    const user = currentUser;

    user.token = null;
    await user.save();
  } catch (error) {
    console.log(error);
  }
};

exports.current = async (currentUser) => {
  try {
    const user = currentUser;

    return user;
  } catch (error) {
    console.log(error);
  }
};

exports.updateUserInfo = async (id, body) => {
  try {
    const user = await User.findByIdAndUpdate(id, body, { new: true }).select(
      "-password -__v"
    );

    return user;
  } catch (error) {
    console.log(error);
  }
};
