const { Category } = require("../models/category");
const { Product } = require("../models/products");
const mongoose = require("mongoose");
const { handleUpload, getFileName } = require("../helpers/upload");

module.exports = {
  productList: async (req, res) => {
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
  },
  productDetail: async (req, res) => {
    const productDetail = await Product.findById(req.params.id).populate(
      "category"
    );

    if (!productDetail) {
      res.status(500).json({ success: false });
    }

    res.send(productDetail);
  },
  createNewproduct: async (req, res) => {
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
  },
  updateProduct: async (req, res) => {
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
  },
  deleteProduct: (req, res) => {
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
  },
  productCount: async (req, res) => {
    const productCount = await Product.countDocuments();

    if (!productCount) {
      res.status(500).json({ success: false });
    }
    res.send({
      productCount: productCount,
    });
  },
  getFeatures: async (req, res) => {
    const count = req.params.count ? req.params.count : 0;
    const products = await Product.find({ isFeatured: true }).limit(+count);

    if (!products) {
      res.status(500).json({ success: false });
    }
    res.send(products);
  },
};
