const { Order } = require("../models/order");
const { OrderItem } = require("../models/order-item");

module.exports = {
  listOrder: async (req, res) => {
    const orderList = await Order.find()
      .populate("user", "name")
      .sort({ dateOrdered: -1 });

    if (!orderList) {
      res.status(500).send("Cannot get order");
    }
    res.send(orderList);
  },
  orderDetail: async (req, res) => {
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
  },
  createOrder: async (req, res) => {
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
  },
  updateOrder: async (req, res) => {
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
  },
  delelteOrder: (req, res) => {
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
  },
  totalSales: async (req, res) => {
    const totalSales = await Order.aggregate([
      { $group: { _id: null, totalSales: { $sum: "$totalPrice" } } },
    ]);

    if (!totalSales) {
      return res.status(500).send("Cannot get total of sale");
    }
    console.log("totalSales", totalSales);
    res.send({ totalSales: totalSales.pop().totalSales });
  },
  getOrderByUser: async (req, res) => {
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
  },
};
