const router = require("express").Router();
const Products = require("../models/Products.model.js")
const isAdmin = require("../middleware/isAdmin")


//GET  "/api/product" ver todos los productos 
router.get("/", async (req, res, next)=>{

    try{

        const response = await Products.find()
        res.json(response)
    }catch(error){
        next (error)
    }
})



// POST "/api/product" => crear un nuevo producto

router.post ("/", async (req, res,next)=>{

    const {category, name, image, price} = req.body

    try{

        const response = await Products.create({
            category,
            name,
            image,
            price
        })

        res.json(response)
    }catch(error){
        next (error)
    }


})

//GET ver los detalles del producto

router.get("/:id", async(req, res, next)=>{
    const {id}=req.params

    try{
        const response = await Products.findById(id)
        res.json(response)
    }catch(error){
        next (error)
    }
})


//DELETE "/api/product/:id" => borrar un producto

router.delete("/:id", async(req, res, next)=>{

    const {id}=req.params

    try{

        await Products.findByIdAndDelete(id)
        res.json("The product has been deleted")
    }catch(error){
        next (error)
    }
})

// PATCH "/api/product/:id"

router.patch("/:id", async(req, res, next)=>{

    const {id}=req.params
    const {category, name, image, price } = req.body

    //condición para postman que esten todos los campos llenos

    if(!category|| !name|| !price === undefined ){
        return res.status(403).json("Fill in the fields")
    }

    try{

        await Products.findByIdAndUpdate(id,{
            category,
            name,
            price
        })

        res.json ("The product has been updated")
    }catch(error){
        next (error)
    }
})









module.exports = router;