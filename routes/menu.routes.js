const router = require("express").Router();
const Menu = require("../models/Menu.model")

//GET ver todos los menus
router.get("/", async (req, res, next)=>{

    try{

        const response = await Menu.find()
        res.json(response)
    }catch(error){
        next (error)
    }
})

// POST "/api/menu" => crear un nuevo menu

router.post ("/",async (req, res,next)=>{

    const {name, products, image, price} = req.body
    console.log(req.body)
    console.log(req.body["products[]"])

    try{

        //IMPORTANTE ESTO ES PARA PRUEBAS DE POSTMAN CAMBIAR CUANDO LLEGUE A EL FRONTEND

        const response = await Menu.create({
           // products,
            name,
            image,
            price,
            products:req.body["products[]"]
        })

        res.json(response)
    }catch(error){
        next (error)
    }


})

//GET ver los detalles del menu

router.get ("/:id", async(req,res, next)=>{
    const {id} = req.params

    try{
        const response = await Menu.findById(id)
        res.json(response)
    }catch(error){
        next (error)
    }
})

router.patch("/:id", async (req, res, next)=>{

    const {id} = req.params
    const {products, name, image, price } = req.body

    //condición para postman que esten todos los campos llenos

    if(!products|| !name|| !image|| !price){
        return res.status(403).json("Fill in the fields")
    }

    try{
        await Menu.findByIdAndUpdate(id,{
            products,
            name,
            image, 
            price


        })

        res.json("Menu has been updated")

    }catch(error){
        next(error)
    }
})

//DELETE "/api/menu/:id" => borrar un menu

router.delete("/:id", async(req, res, next)=>{

    const {id} = req. params

    try{

        await Menu.findByIdAndDelete(id)
        res.json("Menu has been deleted")
    }catch(error){
        next (error)
    }
})


router.delete


module.exports = router;


