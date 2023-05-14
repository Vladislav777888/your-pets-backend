const { Schema, model } = require("mongoose");

const noticeSchema = new Schema(
  {
    category: {
      type: String,
      enum: ["sell", "lost-found", "for-free"],
      required: [true, "Category is required"],
      description: "Notice categories",
      default: "sell",
    },
    title: {
      type: String,
      min: 2,
      max: 48,
      required: [true, "Title is required"],
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      min: 2,
      max: 16,
      description: "Notice name in en",
    },
    birthdate: {
      type: Date,
      required: [true, "Birth date is required"],
      description: "Notice birth date",
    },
    breed: {
      type: String,
      min: 2,
      max: 24,
      required: [true, "Breed is required"],
    },
    sex: {
      type: String,
      enum: ["male", "female"],
      required: [true, "Sex is required"],
      default: "male",
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      min: 2,
      max: 36,
    },
    comments: {
      type: String,
      min: 8,
      max: 120,
    },
    price: {
      type: Number,
      default: 0,
      description: "Notice price",
    },
    favorite: [],
    photo: {
      type: String,
      required: [true, "Photo is required"],
      default: null,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
  },
  { versionKey: false, timestamps: true }
);

const Notice = model("notice", noticeSchema);

module.exports = Notice;
