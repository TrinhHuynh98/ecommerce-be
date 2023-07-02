const express = require("express");
const {
  handleUpload,
  getFileName,
  getFileNames,
} = require("../helpers/upload");

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
 * /upload:
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

router.post("/", async (req, res) => {
  try {
    const path = await getFileName(req, res);
    const cldRes = await handleUpload(path);
    res.send({ url: cldRes });
  } catch (error) {
    res.status(500).send("Cannot upload image");
  }
});

/**
 * @swagger
 * upload/multiple-image:
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

router.post("/multiple-image", async (req, res) => {
  try {
    const urls = [];
    const files = await getFileNames(req, res);
    for (const file of files) {
      const newPath = await handleUpload(file);
      urls.push(newPath);
    }
    res.send({ images: urls });
  } catch (error) {
    console.log("error multiple upload", error);
    res.status(500).send("Cannot upload images");
  }
});

module.exports = router;
