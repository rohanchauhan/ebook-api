var mongoose = require("mongoose");
var Joi = require("joi");

function validateCustomer(customer) {
  const customerSchema = {
    name: Joi.string().min(3).max(50).required(),
    isGold: Joi.boolean(),
    phone: Joi.number().integer().required(),
  };
  return Joi.validate(customer, customerSchema);
}

const customerSchema = new mongoose.Schema({
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
    required: "Phone number is required.",
  },
});

const Customer = mongoose.model("Customer", customerSchema);

exports.validate = validateCustomer;
exports.Customer = Customer;
exports.customerSchema = customerSchema;
