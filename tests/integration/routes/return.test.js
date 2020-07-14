const request = require("supertest");
const { Rental } = require("../../../models/rentals");
const mongoose = require("mongoose");
const { User } = require("../../../models/users");
const { Book } = require("../../../models/books");
const moment = require("moment");

let server;
let customerId;
let bookId;
let rental;
let token;

describe("rental v1/api", () => {
  beforeEach(async () => {
    server = require("../../../index");

    customerId = mongoose.Types.ObjectId();
    bookId = mongoose.Types.ObjectId();
    token = new User().generateAuthToken();

    book = new Book({
      _id: bookId,
      title: "12345",
      dailyRentalRate: 2,
      category: { name: "12345" },
      numberInStock: 10,
    });
    await book.save();

    rental = new Rental({
      customer: {
        _id: customerId,
        name: "12345",
        phone: "1234567890",
      },
      book: {
        _id: bookId,
        title: "12345",
        dailyRentalRate: 2,
      },
    });
    await rental.save();
  });

  afterEach(async () => {
    await server.close();
    await Rental.remove({});
    await Book.remove({});
  });

  const exec = () => {
    return request(server)
      .post("/v1/api/returns/")
      .set("x-auth-token", token)
      .send({ customerId, bookId });
  };

  it(" returns 401 if user is not logged in", async () => {
    token = "";
    const res = await exec();
    expect(res.status).toBe(401);
  });

  it(" returns 400 if customerId is not provided", async () => {
    customerId = "";
    const res = await exec();
    expect(res.status).toBe(400);
  });

  it(" returns 401 if bookId is not provided", async () => {
    bookId = "";
    const res = await exec();
    expect(res.status).toBe(400);
  });

  it(" returns 404 if no rental found for given customerId and rentalId", async () => {
    await Rental.remove({});
    const res = await exec();
    expect(res.status).toBe(404);
  });

  it(" returns 400 if rental already processed", async () => {
    rental.dateReturned = new Date();
    await rental.save();
    const res = await exec();
    expect(res.status).toBe(400);
  });

  it(" returns 200 if valid request", async () => {
    const res = await exec();
    expect(res.status).toBe(200);
  });

  it("should set the returnDate if input is valid", async () => {
    const res = await exec();
    const rentalInDb = await Rental.findById(rental._id);
    const diff = new Date() - rentalInDb.dateReturned;
    expect(diff).toBeLessThan(10 * 1000);
  });

  it("should calculate the rentalFee if input is valid", async () => {
    rental.dateOut = moment().add(-7, "days").toDate();
    await rental.save();
    const res = await exec();
    const rentalInDb = await Rental.findById(rental._id);
    expect(rentalInDb.rentalFee).toBe(14);
  });

  it("should increase the numberInStock if input is valid", async () => {
    const res = await exec();
    const newBook = await Book.findById(book._id);
    expect(newBook.numberInStock).toBe(book.numberInStock + 1);
  });

  it("should return rental fro valid input", async () => {
    const res = await exec();
    const rentalInDb = await Rental.findById(rental._id);
    console.log();
    expect(Object.keys(res.body)).toEqual(Object.keys(rentalInDb.toJSON()));
  });
});
