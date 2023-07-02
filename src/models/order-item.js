const mogoose = require("mongoose");

const orderItemSchema = mogoose.Schema({
  quantity: {
    type: Number,
    require: true,
  },
  product: {
    type: mogoose.Schema.Types.ObjectId,
    ref: "Product",
  },
});

exports.OrderItem = mogoose.model("OrderItem", orderItemSchema);
