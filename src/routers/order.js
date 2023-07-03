const {
  listOrder,
  orderDetail,
  createOrder,
  updateOrder,
  delelteOrder,
  totalSales,
  getOrderByUser,
} = require("../controller/order");
const express = require("express");
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       required:
 *         - orderItems
 *         - shippingAddress1
 *         - city
 *         - zip
 *         - country
 *         - phone
 *         - status
 *         - user
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the book
 *         orderItems:
 *           type: array
 *           items:
 *              type: string
 *           description: The auto-generated id of the book
 *         shippingAddress1:
 *           type: string
 *           description: The auto-generated id of the book
 *         city:
 *           type: string
 *           description: The auto-generated id of the book
 *         zip:
 *           type: string
 *           description: The auto-generated id of the book
 *         country:
 *           type: boolean
 *           description: The auto-generated id of the book
 *         phone:
 *           type: string
 *           description: The auto-generated id of the book
 *         status:
 *           type: string
 *           description: The auto-generated id of the book
 *         shippingAddress2:
 *           type: string
 *           description: The auto-generated id of the book
 *         totalPrice:
 *           type: number
 *           description: The auto-generated id of the book
 *         user:
 *           type: string
 *           description: The auto-generated id of the book
 *
 */

/**
 * @swagger
 * tags:
 *   name: Order
 *   description: Order management
 */

/**
 * @swagger
 * /api/v1/order:
 *   get:
 *     summary: Returns the list of all the order
 *     tags: [Order]
 *     responses:
 *       200:
 *         description: The list of the order
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *
 */

router.get("/", listOrder);

/**
 * @swagger
 * /api/v1/order/{id}:
 *   get:
 *     summary: Get the order by id
 *     tags: [Order]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The order id
 *     responses:
 *       200:
 *         description: The order description by id
 *         contens:
 *           application/json:
 *
 *       500:
 *         description: Cannot get order detail
 */

router.get("/:id", orderDetail);

/**
 * @swagger
 * /api/v1/order:
 *   post:
 *     summary: create new order
 *     tags: [Order]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       200:
 *         description: The order was successfully create
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       500:
 *         description: Some server error
 */

router.post("/", createOrder);

/**
 *  @swagger
 * /api/v1/order/{id}:
 *  put:
 *    summary: Update the order by the id
 *    tags: [Order]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The order id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Order'
 *    responses:
 *      200:
 *        description: The user was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Order'
 *      404:
 *        description: The Order was not found
 *      500:
 *        description: Some error happened
 */

router.put("/:id", updateOrder);

/**
 * @swagger
 * /api/v1/order/{id}:
 *   delete:
 *     summary: Remove the order by id
 *     tags: [Order]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The order id
 *
 *     responses:
 *       200:
 *         description: The order was deleted
 *       404:
 *         description: The order was not found
 */

router.delete("/:id", delelteOrder);

/**
 * @swagger
 * /api/v1/order/get/totalSale:
 *   get:
 *     summary: Get total sale
 *     tags: [Order]

 *     responses:
 *       200:
 *         description: Get total sale 
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 */

router.get("/get/totalSale", totalSales);

/**
 * @swagger
 * /api/v1/order/get/orderbyuser/{userId}:
 *   get:
 *     summary: Get list order by userid
 *     tags: [Order]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     responses:
 *       200:
 *         description:  Get list order by userid
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 */

router.get("/get/orderbyuser/:userId", getOrderByUser);

module.exports = router;
