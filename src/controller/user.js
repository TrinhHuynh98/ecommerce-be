const { User } = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  listUser: async (req, res) => {
    const userList = await User.find().select("-passwordHash");

    if (!userList) {
      res.status(500).json({ success: false });
    }
    res.send(userList);
  },
  userDetail: async (req, res) => {
    const userDetail = await User.findById(req.params.id).select(
      "-passwordHash"
    );

    if (!userDetail) {
      res.status(500).json({ success: false });
    }
    res.send(userDetail);
  },
  updateUser: async (req, res) => {
    const existUser = await User.findById(req.params.id);
    let newPassword;
    if (req.body.password) {
      newPassword = bcrypt.hashSync(req.body.password, 10);
    } else {
      newPassword = existUser.passwordHash;
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        email: req.body.email,
        passwordHash: newPassword,
        phone: req.body.phone,
        isAdmin: req.body.isAdmin,
        street: req.body.street,
        apartment: req.body.apartment,
        zip: req.body.zip,
        city: req.body.city,
        country: req.body.country,
      },
      {
        new: true,
      }
    );

    if (!user) {
      return res.status(400).send("User cannot be updated");
    }

    res.send(user);
  },
  deleteUser: (req, res) => {
    User.findByIdAndRemove(req.params.id)
      .then((user) => {
        if (user) {
          return res
            .status(200)
            .json({ success: true, message: "The user is deleted!" });
        } else {
          return res
            .status(404)
            .json({ success: false, message: "User not found!" });
        }
      })
      .catch((err) => {
        return res.status(500).json({ success: false, error: err });
      });
  },
  userCount: async (req, res) => {
    const userCount = await User.countDocuments();

    if (!userCount) {
      res.status(500).json({ success: false });
    }
    res.send({
      userCount: userCount,
    });
  },
  register: async (req, res) => {
    let user = new User({
      name: req.body.name,
      email: req.body.email,
      passwordHash: bcrypt.hashSync(req.body.password, 10),
      phone: req.body.phone,
      isAdmin: req.body.isAdmin,
      street: req.body.street,
      apartment: req.body.apartment,
      zip: req.body.zip,
      city: req.body.city,
      country: req.body.country,
    });

    user = await user.save();

    if (!user) {
      return res.status(400).send("User cannot be registed");
    }

    res.send(user);
  },
  login: async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    const serect = process.env.ACCESS_TOKEN;

    if (!user) {
      return res.status(404).send("The user not found");
    }

    if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
      const accesstoken = jwt.sign(
        {
          userId: user.id,
          isAdmin: user.isAdmin,
        },
        serect,
        { expiresIn: "1d" }
      );

      const refreshtoken = jwt.sign(
        {
          userId: user.id,
          isAdmin: user.isAdmin,
        },
        process.env.REFRESH_TOKEN,
        { expiresIn: "30d" }
      );

      return res
        .cookie("refresh_token", refreshtoken, {
          httpOnly: true,
          secure: false,
          // secure: process.env.NODE_ENV === "production",
        })
        .status(200)
        .send({
          user: user.email,
          accesstoken: accesstoken,
        });

      // return res.status(200).send({
      //   user: user.email,
      //   access: accesstoken,
      //   refreshtoken: refreshtoken,
      // });
    } else {
      return res.status(400).send("Email or Password is wrong ");
    }
  },

  getNewRefreshToken: async (req, res) => {
    const refreshtoken = req.cookies.refresh_token;

    if (refreshtoken) {
      jwt.verify(refreshtoken, process.env.REFRESH_TOKEN, (error, decode) => {
        if (error) {
          return res
            .status(401)
            .send("Refresh token was expired, please login again!");
        } else {
          const newRefreshtoken = jwt.sign(
            {
              userId: req.id,
              isAdmin: req.isAdmin,
            },
            process.env.REFRESH_TOKEN,
            { expiresIn: "1d" }
          );
          return res.send({ accesstoken: newRefreshtoken });
        }
      });
    } else {
      res.status(401).send("Unauthrized");
    }
  },
};
