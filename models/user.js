const { boolean } = require("joi");
const mongoose = require("mongoose");
const Joi = require("joi");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 5,
    },
    firstName: {
      type: String,
      required: true,
      minlength: 2,
    },
    lastName: {
      type: String,
    },
    isActive: Boolean,
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = Joi.object({
    username: Joi.string().required().min(5),
    firstName: Joi.string().required(),
    lastName: Joi.string(),
    isActive: Joi.boolean(),
  });

  return schema.validate(user);
}

module.exports.User = User;
module.exports.validate = validateUser;
