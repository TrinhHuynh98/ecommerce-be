const request = require("supertest");
const { v4: uuidv4 } = require("uuid");
const baseURL = "http://localhost:3333/api/v1";

describe("GET /products", () => {
  const newProduct = {
    id: uuidv4(),
    name: "product 1",
    description: "decsdecs",
    richDescription: "",
    image: "",
    images: [],
    brand: "",
    price: 123,
    category: "649e64c06662c10269a85e28",
  };
  beforeAll(async () => {
    await request(baseURL).post("/products").send(newProduct);
  });
  afterAll(async () => {
    await request(baseURL).delete(`/products/${newProduct.id}`);
  });
  it("should return 200", async () => {
    const response = await request(baseURL).get("/products");
    expect(response.statusCode).toBe(200);
  });
  it("should return products", async () => {
    const response = await request(baseURL).get("/products");
    expect(response.body.length >= 1).toBe(true);
  });
});

// describe("POST /products", () => {
//   const productItem = {
//     id: uuidv4(),
//     name: "product 1",
//     description: "decsdecs",
//     richDescription: "",
//     image: "",
//     images: [],
//     brand: "",
//     price: 123,
//     category: "649e64c06662c10269a85e28",
//   };
//   afterAll(async () => {
//     await request(baseURL).delete(`/products/${productItem.id}`);
//   });

//   it("should add an item to product array", async () => {
//     const response = await request(baseURL).post("/products").send(productItem);
//     const lastItem = response.body[response.body.length - 1];
//     expect(response.statusCode).toBe(200);
//     expect(lastItem.item).toBe(productItem["name"]);
//     expect(lastItem.description).toBe(productItem["description"]);
//     expect(lastItem.description).toBe(productItem["description"]);
//     expect(lastItem.richDescription).toBe(productItem["richDescription"]);
//     expect(lastItem.image).toBe(productItem["image"]);
//     expect(lastItem.images).toBe(productItem["images"]);
//     expect(lastItem.brand).toBe(productItem["brand"]);
//     expect(lastItem.price).toBe(productItem["price"]);
//     expect(lastItem.category).toBe(productItem["category"]);
//   });
// });
