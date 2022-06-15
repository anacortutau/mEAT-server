const router = require("express").Router();
const Products = require("../models/Products.model.js");
const isAdmin = require("../middleware/isAdmin");
const isAuthenticated = require("../middleware/isAuthenticated.js");


//GET  see all products
router.get("/", async (req, res, next) => {
  try {
    const response = await Products.find();
    res.json(response);
  } catch (error) {
    next(error);
  }
});

// POST create products

router.post("/", isAuthenticated, isAdmin, async (req, res, next) => {
  const {category, name, image, price} = req.body;

  try {
    const response = await Products.create({
      category,
      name,
      price,
      imagenUrl:image
    });

    res.json(response);
  } catch (error) {
    next(error);
  }
});

//GET product details

router.get("/:id", isAuthenticated, async (req, res, next) => {
  const { id } = req.params;

  try {
    const response = await Products.findById(id);
    res.json(response);
  } catch (error) {
    next(error);
  }
});

//DELETE delete product

router.delete("/:id", isAuthenticated, async (req, res, next) => {
  const { id } = req.params;

  try {
    await Products.findByIdAndDelete(id);
    res.json("The product has been deleted");
  } catch (error) {
    next(error);
  }
});

// PATCH edit product

router.patch("/:id", isAuthenticated, async (req, res, next) => {
  const { id } = req.params;
  const { category, name, image, price } = req.body;

  //condición para postman que esten todos los campos llenos

  if (!category || !name || !price === undefined) {
    return res.status(403).json("Fill in the fields");
  }

  try {
    await Products.findByIdAndUpdate(id, {
      category,
      name,
      price,
    });

    res.json("The product has been updated");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
