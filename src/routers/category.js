const {
  categoryDetail,
  categoryList,
  createCatgory,
  updateCategory,
  deleteCategory,
} = require("../controller/category");
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
 *
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
 * /api/v1/category:
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

router.get("/", categoryList);

/**
 * @swagger
 * /api/v1/category/{id}:
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

router.get("/:id", categoryDetail);

/**
 * @swagger
 * /api/v1/category:
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

router.post("/", createCatgory);

/**
 * @swagger
 * /api/v1/category:
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

router.put("/:id", updateCategory);

/**
 * @swagger
 * /api/v1/category/{id}:
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

router.delete("/:id", deleteCategory);

module.exports = router;
