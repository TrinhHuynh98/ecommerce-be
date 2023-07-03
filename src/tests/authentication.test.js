const { login } = require("../controller/user");

const baseURL = "http://localhost:3333/api/v1/user";

// Mock axios, else you will really request the endpoint
jest.mock("axios");
const axios = require("axios");

describe("Login tests", () => {
  describe("login function", () => {
    const email = "test@test.com";
    const password = "password";

    beforeEach(() => {
      axios.post.mockResolvedValue({});
    });

    it("should call endpoint with given email & password", async () => {
      await login(email, password);
      expect(axios.post).toBeCalledWith(`${baseURL}/login`, {
        email,
        password,
      });
    });
  });
});
