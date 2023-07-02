const { Category } = require("../models/category");
const express = require("express");
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the book
 *         name:
 *           type: string
 *           description: The auto-generated id of the book
 *         icon:
 *           type: string
 *           description: The auto-generated id of the book
 *         color:
 *           type: string
 *           description: The auto-generated id of the book
 *
 */

/**
 * @swagger
 * tags:
 *   name: Category
 *   description: Order Category
 */

/**
 * @swagger
 * /category:
 *   get:
 *     summary: Returns the list of all the Category
 *     tags: [Category]
 *     responses:
 *       200:
 *         description: The list of the Category
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *
 */

router.get("/", async (req, res) => {
  const categoryList = await Category.find();

  if (!categoryList) {
    res.status(500).json({ success: false, message: "Cannot get category" });
  }
  res.status(200).send(categoryList);
});

/**
 * @swagger
 * /category/{id}:
 *   get:
 *     summary: Get the Category by id
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The Category id
 *     responses:
 *       200:
 *         description: The Category description by id
 *         contens:
 *           application/json:
 *
 *       500:
 *         description: Cannot get Category detail
 */

router.get("/:id", async (req, res) => {
  const categoryItem = await Category.findById(req.params.id);

  if (!categoryItem) {
    res
      .status(500)
      .json({ success: false, message: "Category is not existed" });
  }
  res.status(200).send(categoryItem);
});

/**
 * @swagger
 * /category:
 *   post:
 *     summary: Create new category
 *     tags: [Category]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       200:
 *         description: The Category was successfully register
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       500:
 *         description: Server error
 */

router.post("/", async (req, res) => {
  let categoryItem = new Category({
    name: req.body.name,
    icon: req.body.icon,
    color: req.body.color,
  });

  categoryItem = await categoryItem.save();

  if (!categoryItem) return res.status(500).send("Category cannnot be created");

  res.send(categoryItem);
});

/**
 * @swagger
 * /category:
 *   put:
 *     summary: Update new category
 *     tags: [Category]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The category id
 *     responses:
 *       200:
 *         description: The Category was successfully register
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       500:
 *         description: Server error
 */

router.put("/:id", async (req, res) => {
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
});

/**
 * @swagger
 * /category/{id}:
 *   delete:
 *     summary: Remove the category by id
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The category id
 *
 *     responses:
 *       200:
 *         description: The category was deleted
 *       404:
 *         description: The category was not found
 */

router.delete("/:id", async (req, res) => {
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
});

module.exports = router;
