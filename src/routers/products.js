const { Category } = require("../models/category");
const { Product } = require("../models/products");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { handleUpload, getFileName } = require("../helpers/upload");

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - category
 *         - countInStock
 *       properties:
 *         name:
 *           type: string
 *           description: The product name
 *         description:
 *           type: string
 *           description: The product description
 *         category:
 *           type: string
 *           description: The product category
 *         countInStock:
 *           type: number
 *           description: The product countInStock
 *         richDescription:
 *           type: string
 *           description: The product richDescription
 *         image:
 *           type: string
 *           description: The product richDescription
 *         images:
 *           type: array
 *           description: The product richDescription
 *         branch:
 *           type: string
 *           description: The product richDescription
 *         price:
 *           type: number
 *           description: The product richDescription
 *         rating:
 *           type: number
 *           description: The product richDescription
 *         numReviews:
 *           type: number
 *           description: The product richDescription
 *         isFeatured:
 *           type: boolean
 *           description: The product richDescription
 */

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Products management
 */

/**
 * @swagger
 * /api/v1/products:
 *   get:
 *     summary: Returns the list of all the products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: The list of the products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *
 */

router.get("/", async (req, res) => {
  // filter product by multiple categories
  let filter = {};
  if (req.query.categories) {
    filter = { category: req.query.categories.split(",") };
  }
  const productList = await Product.find(filter).populate("category");
  if (!productList) {
    res.status(500).json({ success: false });
  }
  res.send(productList);
});

/**
 * @swagger
 * /api/v1/products/{id}:
 *   get:
 *     summary: Get the product by id
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The product id
 *     responses:
 *       200:
 *         description: The product description by id
 *         contens:
 *           application/json:
 *
 *       500:
 *         description: Cannot get product detail
 */

router.get("/:id", async (req, res) => {
  const productDetail = await Product.findById(req.params.id).populate(
    "category"
  );

  if (!productDetail) {
    res.status(500).json({ success: false });
  }

  res.send(productDetail);
});

/**
 * @swagger
 * /api/v1/products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: The product was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       500:
 *         description: Some server error
 */

router.post(`/`, async (req, res) => {
  const category = await Category.findById(req.body.category);
  if (!category) return res.status(400).send("Invalid Category");

  // const imagePath = await getFileName(req.body.image, res);
  // const image = await handleUpload(imagePath);

  let product = new Product({
    name: req.body.name,
    description: req.body.description,
    richDescription: req.body.richDescription,
    image: req.body.image,
    brand: req.body.brand,
    price: req.body.price,
    category: req.body.category,
    countInStock: req.body.countInStock,
    rating: req.body.rating,
    numReviews: req.body.numReviews,
    isFeatured: req.body.isFeatured,
  });

  product = await product.save();

  if (!product) return res.status(500).send("The product cannot be created");

  res.send(product);
});

/**
 *  @swagger
 * /api/v1/products/{id}:
 *  put:
 *    summary: Update the product by the id
 *    tags: [Products]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The product id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Product'
 *    responses:
 *      200:
 *        description: The book was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 *      404:
 *        description: The book was not found
 *      500:
 *        description: Some error happened
 */

router.put(`/:id`, async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).send("Invalid product");
  }
  const category = await Category.findById(req.body.category);
  if (!category) return res.status(400).send("Invalid Category");

  const product = await Product.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      description: req.body.description,
      richDescription: req.body.richDescription,
      image: req.body.image,
      brand: req.body.brand,
      price: req.body.price,
      category: req.body.category,
      countInStock: req.body.countInStock,
      rating: req.body.rating,
      numReviews: req.body.numReviews,
      isFeatured: req.body.isFeatured,
    },
    {
      new: true,
    }
  );

  if (!product) return res.status(500).send("The product cannot be updated");

  res.send(product);
});

/**
 * @swagger
 * /api/v1/products/{id}:
 *   delete:
 *     summary: Remove the product by id
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The product id
 *
 *     responses:
 *       200:
 *         description: The product was deleted
 *       404:
 *         description: The product was not found
 */

router.delete("/:id", (req, res) => {
  Product.findByIdAndRemove(req.params.id)
    .then((product) => {
      if (product) {
        return res
          .status(200)
          .json({ success: true, message: "The product is deleted!" });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "Product not found!" });
      }
    })
    .catch((err) => {
      return res.status(500).json({ success: false, error: err });
    });
});

/**
 * @swagger
 * /api/v1/products/get/count:
 *   get:
 *     summary: Get total product
 *     tags: [Products]

 *     responses:
 *       200:
 *         description: The list of the product of feature
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */

router.get("/get/count", async (req, res) => {
  const productCount = await Product.countDocuments();

  if (!productCount) {
    res.status(500).json({ success: false });
  }
  res.send({
    productCount: productCount,
  });
});

/**
 * @swagger
 * /api/v1/products/get/featured/{count}:
 *   get:
 *     summary: Get total product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: count
 *         schema:
 *           type: number
 *         required: true
 *         description: litmit to show
 *     responses:
 *       200:
 *         description: The list of the books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */

router.get("/get/featured/:count", async (req, res) => {
  const count = req.params.count ? req.params.count : 0;
  const products = await Product.find({ isFeatured: true }).limit(+count);

  if (!products) {
    res.status(500).json({ success: false });
  }
  res.send(products);
});

module.exports = router;
