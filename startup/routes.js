const express = require("express");
const categories = require("../routes/categories");
const customers = require("../routes/customers");
const books = require("../routes/books");
const rentals = require("../routes/rentals");
const users = require("../routes/users");
const auth = require("../routes/auth");
const error = require("../middleware/error");
const returns = require("../routes/returns");

module.exports = function (app) {
  app.use(express.json());
  app.use("/v1/api/categories", categories);
  app.use("/v1/api/customers", customers);
  app.use("/v1/api/books", books);
  app.use("/v1/api/rentals", rentals);
  app.use("/v1/api/users", users);
  app.use("/v1/api/auth", auth);
  app.use("/v1/api/returns", returns);
  app.use(error);
};
