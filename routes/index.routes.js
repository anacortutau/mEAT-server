const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

// You put the next routes here 👇
// example: router.use("/auth", authRoutes)

const authRoutes = require("./auth.routes.js")
router.use("/auth", authRoutes)


const productRouter = require("./product.routes.js")
router.use("/product", productRouter)

const menuRouter = require("./menu.routes.js")
router.use("/menu", menuRouter)

const orderRouter = require("./order.routes")
router.use("/order",orderRouter)


const dentroRoutes = require("./dentro.routes.js")
router.use("/dentro", dentroRoutes)

const uploadRoutes = require("./upload.routes.js")
router.use("/upload", uploadRoutes )

module.exports = router;
