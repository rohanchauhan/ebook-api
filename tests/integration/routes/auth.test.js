const auth = require("../../../routes/auth");
const { User } = require("../../../models/users");
const { Category } = require("../../../models/categories");
const request = require("supertest");
let server;

describe("auth middleware", () => {
  beforeEach(() => {
    server = require("../../../index");
  });
  afterEach(async () => {
    await Category.remove({});
    await server.close();
  });

  let token;

  const exec = () => {
    return request(server)
      .post("/v1/api/categories")
      .set("x-auth-token", token)
      .send({ name: "category1" });
  };

  beforeEach(() => {
    token = new User().generateAuthToken();
  });

  it("should return 401 if no token is provided", async () => {
    token = "";
    const res = await exec();
    expect(res.status).toBe(401);
  });

  it("should return 400 for a invalid token", async () => {
    token = "1";
    const res = await exec();
    expect(res.status).toBe(400);
  });

  it("should return 200 for a valid token", async () => {
    const res = await exec();
    expect(res.status).toBe(200);
  });
});
