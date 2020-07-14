const express = require("express");
const router = express.Router();
const _ = require("lodash");
const auth = require("../middleware/auth");
const { Book, validate } = require("../models/books");
const { Category } = require("../models/categories");
const validator = require("../middleware/validator");
const validateObjectId = require("../middleware/validateObjectId");

// Request to get all books
router.get("/", async (req, res) => {
  const books = await Book.find().sort("name");
  res.send(books);
});

// Request to create a book
router.post("/", [auth, validator(validate)], async (req, res) => {
  const category = await Category.findById(req.body.categoryId);
  if (!category) return res.status(400).send("Invalid category");

  let book = new Book({
    title: req.body.title,
    category: _.pick(category, ["_id", "name"]),
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
  });

  book = await book.save();
  res.send(book);
});

// Request to get a specific book
router.get("/:id", validateObjectId, async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) return res.status(404).send("book with given id does not exist.");

  res.send(book);
});

// Updating a book
router.put(
  "/:id",
  [auth, validator(validate), validateObjectId],
  async (req, res) => {
    const category = await Category.findById(req.body.categoryId);
    if (!category) return res.status(400).send("Invalid category");

    const book = await Book.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        category: _.pick(category, ["_id", "name"]),
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate,
      },
      { new: true }
    );
    if (!book)
      return res.status(404).send("book with given id does not exist.");

    res.send(book);
  }
);

// Deleting a book
router.delete("/:id", [auth, validateObjectId], async (req, res) => {
  const book = await Book.findByIdAndRemove(req.params.id);
  if (!book) return res.status(404).send("book with given id does not exist.");

  res.send(book);
});

module.exports = router;
