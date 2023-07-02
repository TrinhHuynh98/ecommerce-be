const { Order } = require("../models/order");
const { OrderItem } = require("../models/order-item");
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
 * /order:
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

router.get("/", async (req, res) => {
  const orderList = await Order.find()
    .populate("user", "name")
    .sort({ dateOrdered: -1 });

  if (!orderList) {
    res.status(500).send("Cannot get order");
  }
  res.send(orderList);
});

/**
 * @swagger
 * /order/{id}:
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

router.get("/:id", async (req, res) => {
  const productDetail = await Order.findById(req.params.id)
    .populate("user", "name")
    .populate({
      path: "orderItems",
      populate: {
        path: "product",
        populate: {
          path: "category",
        },
      },
    });

  if (!productDetail) {
    res.status(500).send("Cannot get order detail");
  }

  res.send(productDetail);
});

/**
 * @swagger
 * /order:
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

router.post("/", async (req, res) => {
  const orderItemIds = Promise.all(
    req.body.orderItems.map(async (orderItem) => {
      let newOrderItem = new OrderItem({
        quantity: orderItem.quantity,
        product: orderItem.product,
      });
      newOrderItem = await newOrderItem.save();
      return newOrderItem._id;
    })
  );

  const orderItemList = await orderItemIds;

  const totalPrices = await Promise.all(
    orderItemList.map(async (orderItemId) => {
      const orderItem = await OrderItem.findById(orderItemId).populate(
        "product",
        "price"
      );

      const totalPrice = orderItem.product.price * orderItem.quantity;
      return totalPrice;
    })
  );

  const totalPrice = totalPrices.reduce((a, b) => a + b, 0);

  let order = new Order({
    orderItems: orderItemList,
    shippingAddress1: req.body.shippingAddress1,
    shippingAddress2: req.body.shippingAddress2,
    city: req.body.city,
    zip: req.body.zip,
    country: req.body.country,
    phone: req.body.phone,
    status: req.body.status,
    totalPrice: totalPrice,
    user: req.body.user,
  });

  order = await order.save();

  if (!order) {
    return res.status(400).send("Cannot create order !");
  }
  res.send(order);
});

/**
 *  @swagger
 * /order/{id}:
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

router.put("/:id", async (req, res) => {
  const orderUpdate = await Order.findByIdAndUpdate(
    req.params.id,
    {
      status: req.body.status,
    },
    { new: true }
  );

  if (!orderUpdate) {
    res.status(500).send("Order cannot update");
  }

  res.send(orderUpdate);
});

/**
 * @swagger
 * /order/{id}:
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

router.delete("/:id", (req, res) => {
  Order.findByIdAndRemove(req.params.id)
    .then(async (order) => {
      if (order) {
        await order.orderItems.map(async (orderitemId) => {
          await OrderItem.findByIdAndRemove(orderitemId);
        });
        return res
          .status(200)
          .send({ success: true, message: "Order deleted successfully" });
      } else {
        return res.status(401).send("Invalid Order");
      }
    })
    .catch((err) => {
      return res.status(500).send({ success: false, error: err });
    });
});

/**
 * @swagger
 * /order/get/totalSale:
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

router.get("/get/totalSale", async (req, res) => {
  const totalSales = await Order.aggregate([
    { $group: { _id: null, totalSales: { $sum: "$totalPrice" } } },
  ]);

  if (!totalSales) {
    return res.status(500).send("Cannot get total of sale");
  }
  console.log("totalSales", totalSales);
  res.send({ totalSales: totalSales.pop().totalSales });
});

/**
 * @swagger
 * /order/get/orderbyuser/{userId}:
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

router.get("/get/orderbyuser/:userId", async (req, res) => {
  const orderListByUser = await Order.find({
    user: req.params.userId,
  })
    .populate("user", "name")
    .populate({
      path: "orderItems",
      populate: {
        path: "product",
        populate: {
          path: "category",
        },
      },
    })
    .sort({ dateOrdered: -1 });

  if (!orderListByUser) {
    res.status(500).send("Cannot get order");
  }
  res.send(orderListByUser);
});

module.exports = router;
