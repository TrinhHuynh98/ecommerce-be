const { singleUpload, multipleUpload } = require("../controller/upload");
const express = require("express");
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Upload:
 *       type: object
 *       required:
 *          - image
 *       properties:
 *          - image:
 *              type: string
 */

/**
 * @swagger
 * tags:
 *   name: Upload
 *   description: Upload file
 */

/**
 * @swagger
 * /api/v1/upload:
 *   post:
 *     summary: upload single file
 *     tags: [Upload]
 *     consumes:
 *        - multipart/form-data
 *     parameters:
 *        - in: formData
 *          name: image
 *          type: file
 *          description: The file to upload.
 *     responses:
 *       200:
 *         description: The list of the products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *
 */

router.post("/", singleUpload);

/**
 * @swagger
 * /api/v1/upload/multiple-image:
 *   post:
 *     summary: upload multiple file
 *     tags: [Upload]
 *     consumes:
 *        - multipart/form-data
 *     parameters:
 *        - in: formData
 *          name: images
 *          type: file
 *          description: The file to upload.
 *     responses:
 *       200:
 *         description: The list of the products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *
 */

router.post("/multiple-image", multipleUpload);

module.exports = router;
