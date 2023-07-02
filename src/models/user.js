const mogoose = require("mongoose");

const userScheme = new mogoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    default: "",
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  street: {
    type: String,
    default: "",
  },
  apartment: {
    type: String,
    default: "",
  },
  zip: {
    type: String,
    default: "",
  },
  city: {
    type: String,
    default: "",
  },
  country: {
    type: String,
    default: "",
  },
});

userScheme.virtual("id").get(function () {
  return this._id.toHexString();
});

userScheme.set("toJSON", {
  virtuals: true,
});

exports.User = mogoose.model("User", userScheme);
exports.userScheme = userScheme;
