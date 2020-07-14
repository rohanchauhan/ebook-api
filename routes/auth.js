const express = require("express");
const router = express.Router();
const Joi = require("joi");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User } = require("../models/users");
const validator = require("../middleware/validator");

// Request to create a user
router.post("/", validator(validate), async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid Email or password.");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid Email or password.");

  const token = user.generateAuthToken();
  res.send(token);
});

function validate(req) {
  const userSchema = {
    email: Joi.string().min(3).max(255).required().email(),
    password: Joi.string().min(3).max(255).required(),
  };

  return Joi.validate(req, userSchema);
}

module.exports = router;
