const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mogoose = require("mongoose");
const cors = require("cors");
const authJwt = require("./src/helpers/jwt");
const errorHanlder = require("./src/helpers/error-handler");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const multer = require("multer");

const app = express();

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Library API",
      version: "1.0.0",
      description: "A Ecommerce API",
    },
    servers: [
      {
        url: "http://localhost:3333",
      },
    ],
  },
  apis: ["./src/routers/*.js"],
};

const specs = swaggerJsDoc(options);

app.use("/api/v1/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

app.use(cors());
app.options("*", cors());

require("dotenv/config");
const api = process.env.BACK_END_URL;

// middleware
app.use(bodyParser.json());
app.use(morgan("tiny"));
app.use(authJwt());
app.use(errorHanlder);

// Routers
const productRouters = require("./src/routers/products");
const categoryRouters = require("./src/routers/category");
const orderRouters = require("./src/routers/order");
const userRouters = require("./src/routers/user");
const uploadImage = require("./src/routers/upload-image");

app.use(`${api}/products`, productRouters);
app.use(`${api}/category`, categoryRouters);
app.use(`${api}/order`, orderRouters);
app.use(`${api}/user`, userRouters);
app.use(`${api}/upload-image`, uploadImage);

mogoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("Database already");
  })
  .catch((error) => {
    console.log("Error connect to DB", error);
  });

app.get(api + "/", (req, res) => {
  res.send("Hello new api!");
});

const port = process.env.PORT || 3334;
app.listen(port, () => {
  console.log(`Server run at ${port}`);
});
