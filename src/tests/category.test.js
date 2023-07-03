const request = require("supertest");
const { v4: uuidv4 } = require("uuid");
const baseURL = "http://localhost:3333/api/v1";

describe("GET /category", () => {
  const category = {
    id: uuidv4(),
    name: "category 2 update",
    icon: "",
    color: "white",
  };
  beforeAll(async () => {
    await request(baseURL).post("/category").send(category);
  });
  afterAll(async () => {
    await request(baseURL).delete(`/category/${category.id}`);
  });
  it("should return 200", async () => {
    const response = await request(baseURL).get("/category");
    expect(response.statusCode).toBe(200);
  });
  it("should return categories", async () => {
    const response = await request(baseURL).get("/category");
    expect(response.body.length >= 1).toBe(true);
  });
});
