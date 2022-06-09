const router = require("express").Router();
const isAdmin = require("../middleware/isAdmin");
const isAuthenticated = require("../middleware/isAuthenticated");
const Menu = require("../models/Menu.model");

//GET see all menus
router.get("/", async (req, res, next) => {
  try {
    const response = await Menu.find().populate("products");

    res.json(response);
  } catch (error) {
    next(error);
  }
});

//POST Create the menu
router.post("/", isAuthenticated, isAdmin, async (req, res, next) => {
  const { name, products, image, price } = req.body;

  try {
    const response = await Menu.create({
      products,
      name,
      image,
      price,
      //products:req.body["products"]
    });

    res.json(response);
  } catch (error) {
    next(error);
  }
});

//GET see menu details

router.get("/:id", isAuthenticated, async (req, res, next) => {
  const { id } = req.params;

  try {
    const response = await Menu.findById(id).populate("products");
    console.log(response);
    res.json(response);
  } catch (error) {
    next(error);
  }
});

//PATCH Edit the menu

router.patch("/:id", isAuthenticated, async (req, res, next) => {
  const { id } = req.params;
  const { products, name, image, price } = req.body;

  if (!products || !name || !price === undefined) {
    return res.status(403).json("Fill in the fields");
  }

  try {
    await Menu.findByIdAndUpdate(id, {
      products,
      name,
      price,
      //products: req.body["products"]
    });

    res.json("Menu has been updated");
  } catch (error) {
    next(error);
  }
});

//DELETE delete menu

router.delete("/:id", isAuthenticated, async (req, res, next) => {
  const { id } = req.params;

  try {
    await Menu.findByIdAndDelete(id);
    res.json("Menu has been deleted");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
