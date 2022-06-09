const router = require("express").Router();
const Order = require("../models/Order.model");
const isAuthenticated = require("../middleware/isAuthenticated");

//GET  see order
router.get("/", isAuthenticated, async (req, res, next) => {
  try {
    const { _id } = req.payload;

    const response = await Order.find({ user: _id })
      .populate("products")
      .populate("menu");
    res.json(response);
  } catch (error) {
    next(error);
  }
});

//POST create order
router.post("/", isAuthenticated, async (req, res, next) => {
  const { products, menu, price } = req.body;

  const { _id } = req.payload;
  console.log(req.body);

  try {
    const response = await Order.create({
      user: _id,
      //products:req.body["products[]"],
      //menu:req.body["menu[]"],
      products: req.body.products,
      menu: req.body.menus,
      price,
    });

    res.json(response);
  } catch (error) {
    next(error);
  }
});

//GET order details

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const response = await Order.findById(id)
      .populate("products")
      .populate("menu");
    res.json(response);
  } catch (error) {
    next(error);
  }
});

//DELETE delete order

router.delete("/:id", isAuthenticated, async (req, res, next) => {
  const { id } = req.params;
  try {
    await Order.findByIdAndDelete(id);
    res.json("The order has been deleted");
  } catch (error) {
    next(error);
  }
});

//PATCH edit order
router.patch("/:id", isAuthenticated, async (req, res, next) => {
  const { id } = req.params;
  const { products, menu, price } = req.body;

  if (!products || !menu || !price === undefined) {
    return res.status(403).json("Fill in the fields");
  }

  try {
    await Order.findByIdAndUpdate(id, {
      products,
      menu,
      price,
    });

    res.json("The order has been updated");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
