const mongoose = require("mongoose");
const Joi = require("joi");
const { categorySchema } = require("../models/categories");

function validateBook(book) {
  const bookSchema = {
    title: Joi.string().min(3).max(100).required(),
    categoryId: Joi.objectId().required(),
    numberInStock: Joi.number().min(0).max(1000).required(),
    dailyRentalRate: Joi.number().min(0).max(100),
  };

  return Joi.validate(book, bookSchema);
}

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: 5,
    maxlength: 100,
    trim: true,
    required: true,
  },
  category: {
    type: categorySchema,
    required: true,
  },
  numberInStock: {
    type: Number,
    required: true,
    min: 0,
    max: 1000,
  },
  dailyRentalRate: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
});

const Book = mongoose.model("Book", bookSchema);

exports.validate = validateBook;
exports.Book = Book;
