const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");

// Input Validation
function validateUser(user) {
  const userSchema = {
    name: Joi.string().min(3).max(10).required(),
    email: Joi.string().min(3).max(255).required().email(),
    password: Joi.string().min(3).max(255).required(),
  };

  return Joi.validate(user, userSchema);
}

// Data Validation
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 5,
    maxlength: 50,
    trim: true,
    required: "Please enter user name.",
  },
  email: {
    type: String,
    minlength: 5,
    maxlength: 255,
    trim: true,
    unique: true,
    required: "Please enter email.",
  },
  password: {
    type: String,
    minlength: 5,
    maxlength: 1024,
    required: "Please enter password.",
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  //roles: [],
  //operations:[]
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    config.get("jwtPrivateKey")
  );
  return token;
};

const User = mongoose.model("User", userSchema);

exports.User = User;
exports.validate = validateUser;
