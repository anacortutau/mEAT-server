const router = require("express").Router();
const uploader = require("../middleware/uploader");
const Product = require("../models/Products.model");

//integrar esto en la ruta de create del modelo envia una imagen a cloudinary y recibe un url
router.post("/", uploader.single("image"), (req, res, next) => {
  console.log("intentando enviar imagen");

  console.log("el archivo recibido de cloudinary", req.file.path); //imagen cloudinary

    res.json(req.file.path)
});

module.exports = router;
