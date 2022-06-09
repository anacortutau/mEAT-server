const router = require("express").Router();
const Order = require("../models/Order.model")
const isAuthenticated = require("../middleware/isAuthenticated")

//GET  "/api/order" ver el pedido
router.get("/",isAuthenticated , async (req, res, next)=>{
    try{
        const{_id} = req.payload;

        const response = await Order.find({user:_id}).populate("products").populate("menu")
        res.json(response)
    }catch(error){
        next (error)
    }
})

router.post("/",isAuthenticated, async(req, res, next)=>{

    const {products, menu, price } = req.body

    const{_id} = req.payload;

    try{

        const response = await Order.create({
            user: _id,
            products:req.body["products[]"],
            menu:req.body["menu[]"],
            //products,
            //menu,
            price
            
        })

        res.json(response)
    }catch(error){
        next(error)
    }
})

//GET ver los detalles del order

router.get("/:id", async(req, res, next)=>{

    const {id} = req.params

    try{

        const response = await Order.findById(id).populate("products").populate("menu")
        res.json(response)
    }catch(error){
        next(error)
    }
})

//DELETE "/api/order/:id"

router.delete("/:id",isAuthenticated, async(req, res, next) =>{


    const {id} = req.params
    try{

        await Order.findByIdAndDelete(id)
        res.json("The order has been deleted")

    }catch(error){
        next(error)
    }

} )


//PATCH "/api/order/:id"
router.patch("/:id", isAuthenticated, async(req, res, next)=>{

    const {id} = req.params
    const {products, menu, price } = req.body

    // en postman le pedimos que rellene todos los campos

    if(!products|| !menu|| !price === undefined){
        return res.status(403).json("Fill in the fields")

    }

    try{

        await Order.findByIdAndUpdate(id,{
            products,
            menu,
            price
        })


        res.json("The order has been updated")


    }catch(error){
        next (error)
    }

})













module.exports = router;