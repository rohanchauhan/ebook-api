var express = require("express");
var router = express.Router();
var { Rental, validate } = require("../models/rentals");
const { Customer } = require("../models/customers");
const { Book } = require("../models/books");
const Fawn = require("fawn");
const mongoose = require("mongoose");
const _ = require("lodash");
const validator = require("../middleware/validator");

Fawn.init(mongoose);

// Request to get all rentals
router.get("/", async (req, res) => {
  const rentals = await Rental.find().sort("-dateOut");
  res.send(rentals);
});

// Request to create a Rental
router.post("/", validator(validate), async (req, res) => {
  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).send("Invalid customer");

  const book = await Book.findById(req.body.bookId);
  if (!book) return res.status(400).send("Invalid Book");

  if (book.numberInStock === 0)
    return res.status(400).send("No Books Available.");

  let rental = new Rental({
    customer: _.pick(customer, ["_id", "name", "phone", "isGold"]),
    book: _.pick(book, ["_id", "title", "dailyRentalRate"]),
  });

  try {
    new Fawn.Task()
      .save("rentals", rental)
      .update("books", { _id: book._id }, { $inc: { numberInStock: -1 } })
      .run();
  } catch (error) {
    res.status(500).send("Failed to create rental..");
  }

  res.send(rental);
});

// Request to get a specific Rental
router.get("/:id", async (req, res) => {
  const rental = await Rental.findById(req.params.id);
  if (!rental)
    return res.status(404).send("Rental with given id does not exist.");

  res.send(rental);
});

// Updating a Rental
router.put("/:id", validator(validate), async (req, res) => {
  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).send("Invalid customer");

  const book = await Book.findById(req.body.bookId);
  if (!book) return res.status(400).send("Invalid Book");

  const rental = await Rental.findByIdAndUpdate(
    req.params.id,
    {
      customer: _.pick(customer, ["_id", "name", "phone", "isGold"]),
      book: _.pick(book, ["_id", "title", "dailyRentalRate"]),
    },
    { new: true }
  );

  if (!rental)
    return res.status(404).send("Rental with given id does not exist.");

  res.send(rental);
});

// Deleting a Rental
router.delete("/:id", async (req, res) => {
  const rental = await Rental.findByIdAndRemove(req.params.id);
  if (!rental)
    return res.status(404).send("Rental with given id does not exist.");

  res.send(rental);
});

module.exports = router;
