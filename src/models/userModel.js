const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { Schema, model } = require("mongoose");

const authScheme = new Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  avatar: String,
  name: {
    type: String,
    default: null,
  },
  phone: {
    type: String,
    default: null,
  },
  city: {
    type: String,
    default: null,
  },
  birthday: {
    type: String,
    default: null,
  },
  token: {
    type: String,
    default: null,
  },
});

authScheme.pre("save", async function (next) {
  if (this.isNew) {
    const emailHash = crypto.createHash("md5").update(this.email).digest("hex");

    this.avatarURL = `https://www.gravatar.com/avatar/${emailHash}.jpg?d=mp`;
  }

  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

authScheme.methods.checkPassword = (candidate, hash) =>
  bcrypt.compare(candidate, hash);

const User = model("users", authScheme);

module.exports = User;
