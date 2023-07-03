const { Category } = require("../models/category");

module.exports = {
  categoryList: async (req, res) => {
    const categoryList = await Category.find();

    if (!categoryList) {
      res.status(500).json({ success: false, message: "Cannot get category" });
    }
    res.status(200).send(categoryList);
  },
  categoryDetail: async (req, res) => {
    const categoryItem = await Category.findById(req.params.id);

    if (!categoryItem) {
      res
        .status(500)
        .json({ success: false, message: "Category is not existed" });
    }
    res.status(200).send(categoryItem);
  },
  createCatgory: async (req, res) => {
    let categoryItem = new Category({
      name: req.body.name,
      icon: req.body.icon,
      color: req.body.color,
    });

    categoryItem = await categoryItem.save();

    if (!categoryItem)
      return res.status(500).send("Category cannnot be created");

    res.send(categoryItem);
  },
  updateCategory: async (req, res) => {
    let categoryItem = await Category.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color,
      },
      {
        new: true,
      }
    );

    categoryItem = await categoryItem.save();

    if (!categoryItem) return res.status(500).send("Category is not exist");

    res.status(200).send(categoryItem);
  },
  deleteCategory: async (req, res) => {
    await Category.findByIdAndDelete(req.params.id)
      .then((response) => {
        if (response) {
          res
            .status(200)
            .json({ success: true, message: "Category deleted successfully" });
        } else {
          res
            .status(404)
            .json({ success: false, message: "Category is not existed" });
        }
      })
      .catch((error) => {
        res.status(500).json({ success: false, message: error });
      });
  },
};
