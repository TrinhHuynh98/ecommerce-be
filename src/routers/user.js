const { User } = require("../models/user");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const {
  login,
  register,
  listUser,
  userDetail,
  updateUser,
  deleteUser,
  userCount,
  getNewRefreshToken,
} = require("../controller/user");

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the book
 *         name:
 *           type: string
 *           description: The auto-generated id of the book
 *         email:
 *           type: string
 *           description: The auto-generated id of the book
 *         password:
 *           type: string
 *           description: The auto-generated id of the book
 *         phone:
 *           type: string
 *           description: The auto-generated id of the book
 *         isAdimin:
 *           type: boolean
 *           description: The auto-generated id of the book
 *         street:
 *           type: string
 *           description: The auto-generated id of the book
 *         partment:
 *           type: string
 *           description: The auto-generated id of the book
 *         zip:
 *           type: string
 *           description: The auto-generated id of the book
 *         city:
 *           type: string
 *           description: The auto-generated id of the book
 *         country:
 *           type: string
 *           description: The auto-generated id of the book
 *
 */

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User management
 */

/**
 * @swagger
 * /api/v1/user:
 *   get:
 *     summary: Returns the list of all the user
 *     tags: [User]
 *     responses:
 *       200:
 *         description: The list of the user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *
 */

router.get("/", listUser);

/**
 * @swagger
 * /api/v1/user/{id}:
 *   get:
 *     summary: Get the user by id
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The product id
 *     responses:
 *       200:
 *         description: The user description by id
 *         contens:
 *           application/json:
 *
 *       500:
 *         description: Cannot get user detail
 */

router.get("/:id", userDetail);

/**
 * @swagger
 * /api/v1/user/register:
 *   post:
 *     summary: Register new account
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The user was successfully register
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 */

router.post("/register", register);

/**
 *  @swagger
 * /api/v1/user/{id}:
 *  put:
 *    summary: Update the user by the id
 *    tags: [User]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The product id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      200:
 *        description: The user was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      404:
 *        description: The user was not found
 *      500:
 *        description: Some error happened
 */

router.put("/:id", updateUser);

/**
 * @swagger
 * /api/v1/user/login:
 *   post:
 *     summary: Login
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The user was successfully register
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 */

router.post("/login", login);

/**
 * @swagger
 * /api/v1/user/{id}:
 *   delete:
 *     summary: Remove the user by id
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The product id
 *
 *     responses:
 *       200:
 *         description: The product was deleted
 *       404:
 *         description: The product was not found
 */

router.delete("/:id", deleteUser);

/**
 * @swagger
 * /api/v1/user/get/count:
 *   get:
 *     summary: Get total user
 *     tags: [User]

 *     responses:
 *       200:
 *         description: The list of the product of feature
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */

router.get("/get/count", userCount);

/**
 * @swagger
 * /api/v1/user/get-new-token:
 *   post:
 *     summary: ge New refresh token
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The user was successfully register
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 */

router.post("/get-new-token", getNewRefreshToken);

module.exports = router;
