const { Schema, model } = require("mongoose");

const friendSchema = Schema(
  {
    title: String,
    url: String,
    addressUrl: String,
    imageURL: String,
    address: String,
    workDays: [
      {
        isOpen: Boolean,
        from: String,
        to: String,
      },
    ],
    phone: String,
    email: String,
  },
  { versionKey: false, timestamps: true }
);

const Friend = model("friends", friendSchema);

module.exports = Friend;
