const request = require("supertest");
const mongoose = require("mongoose");
const { Category } = require("../../../models/categories");
const { User } = require("../../../models/users");

let server;

describe("/v1/api/categories", () => {
  beforeEach(() => {
    server = require("../../../index");
  });

  afterEach(async () => {
    server.close();
    await Category.remove({});
  });

  describe("GET /", () => {
    it("should return all categories", async () => {
      await Category.collection.insertMany([
        { name: "category1" },
        { name: "category2" },
      ]);

      const res = await request(server).get("/v1/api/categories/");
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body.some((c) => c.name === "category1")).toBeTruthy();
      expect(res.body.some((c) => c.name === "category2")).toBeTruthy();
    });
  });

  describe("GET /:id", () => {
    it("should return 404 if valid category id does not exists", async () => {
      const res = await request(server).get("/v1/api/categories/1");
      expect(res.status).toBe(404);
    });

    it("should return category if valid category id is sent", async () => {
      const category = new Category({ name: "category1" });
      await category.save();
      const res = await request(server).get(
        `/v1/api/categories/${category.id}`
      );
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("name", category.name);
    });
  });

  describe("POST /", () => {
    let token;
    let name;

    beforeEach(() => {
      token = new User().generateAuthToken();
      name = "category1";
    });

    const exec = async () => {
      return await request(server)
        .post("/v1/api/categories/")
        .set("x-auth-token", token)
        .send({ name: name });
    };

    it("user is not logged in returns 401", async () => {
      token = "";
      const res = await exec();
      expect(res.status).toBe(401);
    });

    it("category.name is less than 5 characters returns 400", async () => {
      name = "abcd";
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it("category.name is greater than 10 characters returns 400", async () => {
      name = new Array(12).join("x");
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it("logged in user and valid category is saved.", async () => {
      await exec();
      const category = await Category.find({ name: "category1" });
      expect(category).not.toBeNull();
    });

    it("logged in user and valid category is returned in response.", async () => {
      const res = await exec();
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("_id");
      expect(res.body).toHaveProperty("name", name);
    });
  });
});
