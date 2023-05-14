const Joi = require("joi");
const { Schema, model } = require("mongoose");

const petSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  birthday: {
    type: String,
    required: [true, "Date of birth is required"],
  },
  breed: {
    type: String,
    required: [true, "Breed is required"],
  },
  photo: {
    type: String,
    required: [true, "Photo is required"],
    default: null,
  },
  comments: {
    type: String,
    minlength: 8,
    maxlength: 120,
    default: null,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
});

const petJoiSchema = Joi.object({
  name: Joi.string().min(2).max(16).required(),
  birthday: Joi.date().min("2000-01-01").max(Date.now()).iso().required(),
  breed: Joi.string().min(2).max(16).required(),
  comments: Joi.string().min(18).max(120),
});

const Pet = model("pet", petSchema);

module.exports = {
  Pet,
  petJoiSchema,
};
