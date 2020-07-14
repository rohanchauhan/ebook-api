const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { Book } = require("../models/books");
const { Rental, validate } = require("../models/rentals");
const validator = require("../middleware/validator");

router.post("/", [auth, validator(validate)], async (req, res) => {
  const rental = await Rental.lookup(req.body.customerId, req.body.bookId);
  if (!rental) return res.status(404).send("no rental found");

  if (rental.dateReturned)
    return res.status(400).send("rental already returned");

  rental.return();
  await rental.save();

  const book = await Book.findById(req.body.bookId);
  book.numberInStock++;
  await book.save();

  return res.send(rental);
});

module.exports = router;
