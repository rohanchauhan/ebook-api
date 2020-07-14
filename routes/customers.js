var express = require("express");
var router = express.Router();
var { Customer, validate } = require("../models/customers");
const validator = require("../middleware/validator");

// Request to get all customers
router.get("/", async (req, res) => {
  const customers = await Customer.find().sort("name");
  res.send(customers);
});

// Request to create a Customer
router.post("/", validator(validate), async (req, res) => {
  let customer = new Customer({
    name: req.body.name,
    phone: req.body.phone,
    isGold: req.body.isGold,
  });
  customer = await customer.save();
  res.send(customer);
});

// Request to get a specific Customer
router.get("/:id", async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer)
    return res.status(404).send("Customer with given id does not exist.");

  res.send(customer);
});

// Updating a Customer
router.put("/:id", validator(validate), async (req, res) => {
  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      phone: req.body.phone,
      isGold: req.body.isGold,
    },
    { new: true }
  );

  if (!customer)
    return res.status(404).send("Customer with given id does not exist.");

  res.send(customer);
});

// Deleting a Customer
router.delete("/:id", async (req, res) => {
  const customer = await Customer.findByIdAndRemove(req.params.id);
  if (!customer)
    return res.status(404).send("Customer with given id does not exist.");

  res.send(customer);
});

module.exports = router;
