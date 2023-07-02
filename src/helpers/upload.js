const cloudinary = require("cloudinary").v2;
const multer = require("multer");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

const singleUpload = upload.single("image");
const multipleUpload = upload.array("images", 10);

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

async function handleUpload(file) {
  const res = await cloudinary.uploader.upload(file, {
    upload_preset: "be_ecommerce",
  });
  return res.url;
}

async function getFileName(req, res) {
  await runMiddleware(req, res, singleUpload);
  const b64 = Buffer.from(req.file.buffer).toString("base64");
  let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
  return dataURI;
}

async function getFileNames(req, res) {
  await runMiddleware(req, res, multipleUpload);
  let dataURIs = [];
  for (const pathnname of req.files) {
    const b64 = Buffer.from(pathnname.buffer).toString("base64");
    const dataUrl = "data:" + pathnname.mimetype + ";base64," + b64;
    dataURIs.push(dataUrl);
  }

  return dataURIs;
}

module.exports = { handleUpload, getFileName, getFileNames };
