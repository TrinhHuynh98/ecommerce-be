const mogoose = require("mongoose");

const categoryScheme = mogoose.Schema({
  name: {
    type: String,
    require: true,
  },
  icon: {
    type: String,
  },
  color: {
    type: String,
  },
});

categoryScheme.virtual("id").get(function () {
  return this._id.toHexString();
});

categoryScheme.set("toJSON", {
  virtuals: true,
});

exports.Category = mogoose.model("Category", categoryScheme);
