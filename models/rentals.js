const mongoose = require("mongoose");
const moment = require("moment");
const Joi = require("joi");

function validateRental(rental) {
  const rentalSchema = {
    customerId: Joi.objectId().required(),
    bookId: Joi.objectId().required(),
  };
  return Joi.validate(rental, rentalSchema);
}

const rentalSchema = new mongoose.Schema({
  customer: {
    type: new mongoose.Schema({
      name: {
        type: String,
        minlength: 5,
        maxlength: 50,
        trim: true,
        required: "Name is required.",
      },
      isGold: {
        type: Boolean,
        default: false,
      },
      phone: {
        type: Number,
        minlength: 10,
        maxlength: 10,
        trim: true,
        required: "Phone is required.",
      },
    }),
    required: true,
  },
  book: {
    type: new mongoose.Schema({
      title: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 100,
        trim: true,
      },
      dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 100,
      },
    }),
    required: true,
  },
  dateOut: {
    type: Date,
    required: true,
    default: Date.now,
  },
  dateReturned: {
    type: Date,
  },
  rentalFee: {
    type: Number,
    min: 0,
  },
});

rentalSchema.statics.lookup = function (customerId, bookId) {
  return this.findOne({
    "customer._id": customerId,
    "book._id": bookId,
  });
};

rentalSchema.methods.return = function () {
  this.dateReturned = Date.now();

  const rentalDays = moment().diff(this.dateOut, "days");
  this.rentalFee = rentalDays * this.book.dailyRentalRate;
};

const Rental = mongoose.model("Rental", rentalSchema);

exports.validate = validateRental;
exports.Rental = Rental;
