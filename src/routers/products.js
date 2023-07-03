const express = require("express");
const router = express.Router();
const {
  productList,
  productDetail,

  createNewproduct,
  updateProduct,
  deleteProduct,
  productCount,
  getFeatures,
} = require("../controller/product");

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

router.get("/", productList);

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

router.get("/:id", productDetail);

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

router.post(`/`, createNewproduct);

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

router.put(`/:id`, updateProduct);

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

router.delete("/:id", deleteProduct);

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

router.get("/get/count", productCount);

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

router.get("/get/featured/:count", getFeatures);

module.exports = router;
