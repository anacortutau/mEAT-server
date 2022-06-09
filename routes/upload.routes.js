const router = require("express").Router();
const uploader = require("../middleware/uploader");
const Product = require("../models/Products.model");

//inteegrar esto en la ruta de create del modelo
router.post("/product", uploader.single("image"), (req, res, next) => {
  console.log("intentando enviar imagen");

  console.log("el archivo recibido de cloudinary", req.file);

  Product.findByIdAndUpdate(id, {
    image: req.file.path,
  });
});

module.exports = router;
