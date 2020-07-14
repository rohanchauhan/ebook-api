const express = require("express");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const router = express.Router();
const { Category, validate } = require("../models/categories");
const mongoose = require("mongoose");
const validateObjectId = require("../middleware/validateObjectId");
const validator = require("../middleware/validator");

// Request to get all categories
router.get("/", async (req, res) => {
  const categories = await Category.find().sort("name");
  res.send(categories);
});

// Request to create a category
router.post("/", [auth, validator(validate)], async (req, res) => {
  let category = new Category({ name: req.body.name });
  category = await category.save();
  res.send(category);
});

// Request to get a specific category
router.get("/:id", validateObjectId, async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category)
    return res.status(404).send("Category with given id does not exist.");

  res.send(category);
});

// Updating a category
router.put(
  "/:id",
  [auth, validateObjectId, validator(validate)],
  async (req, res) => {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      { new: true }
    );
    if (!category)
      return res.status(404).send("Category with given id does not exist.");

    res.send(category);
  }
);

// Deleting a category
router.delete("/:id", [auth, admin, validateObjectId], async (req, res) => {
  const category = await Category.findByIdAndRemove(req.params.id);
  if (!category)
    return res.status(404).send("Category with given id does not exist.");

  res.send(category);
});

module.exports = router;
