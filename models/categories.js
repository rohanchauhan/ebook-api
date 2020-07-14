const mongoose = require("mongoose");
const Joi = require("joi");

// Input Validation
function validateCategory(category) {
  const categorySchema = {
    name: Joi.string().min(5).max(10).required(),
  };

  return Joi.validate(category, categorySchema);
}

// Data Validation
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 5,
    maxlength: 50,
    trim: true,
    required: "Please enter category name.",
  },
});

const Category = mongoose.model("Category", categorySchema);

exports.Category = Category;
exports.validate = validateCategory;
exports.categorySchema = categorySchema;
