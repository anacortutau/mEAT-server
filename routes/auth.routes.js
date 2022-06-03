const router = require("express").Router();
const UserModel = require ("../models/User.model")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")

const isAuthenticated = require("../middleware/isAuthenticated")

//POST "/api/auth/signup" => registrar al usuario
router.post ("/signup", async (req, res, next)=>{

    const {username,password, surname, street, number, portal, city, phone, email} = req.body

    //validación de backend

    if(!username|| !password|| !surname|| !street|| !number || !portal || !city || !phone || !email){
        res.status (400).json({errorMessage: "fill in the fields"})
        return;

    }

    //validación de password

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    if(passwordRegex.test(password) === false){
        res.status(400).json({errorMessage: "Passwords are no the same"})
    }



    try{

        const foundUser = await UserModel.findOne({email})
        if(foundUser !== null){
            res.status(400).json({errorMessage: "registered user"})
            return;
        }

        const salt = await bcryptjs.genSalt(10)
        const hashPassword = await bcryptjs.hash(password, salt)

        await UserModel.create({
            username,
            surname,
            street,
            number,
            portal,
            city,
            phone,
            email,
            password: hashPassword 
        

        })

        res.json("Ok, user created")


    }catch(error){
        next (error)
    }
})

//POST "/api/auth/login" verificar las credenciales del usuario y abrirle "sesión"
router.post("/login", async(req, res, next)=>{

    const {email, password} = req.body 

    try{

        const foundUSer = await UserModel.findOne({email})
        if(foundUSer === null){
            res.status(400).json({errorMessage: "User not registered"})
            return;
        }

        //el usuario ha sido validado

        const passwordMatch = await bcryptjs.compare(password, foundUSer.password)
        console.log(passwordMatch)

        if(passwordMatch === false){
            res.status(401).json ({errorMessage: "Incorrect password"})
            return;
        }

       // aqui es donde empezamos a implementar el nuevo sistema de atenticacion (token)
        // crear token
       const payload ={
           
           _id: foundUSer._id,
           email: foundUSer.email,
           username: foundUSer.username,
           role: foundUSer.role
       }
       

        const authToken = jwt.sign(
            payload,
            process.env.TOKEN_SECRET,
            {algorithm: "HS256", expiresIn: "12h"}
        )

        res.json({authToken: authToken})

       
    }catch(error){
        next(error)
    }
})

//GET "/api/auth/verify" => chekea que el token es valido, la ruta se usa para flujo de frontend
 router.get("/verify", isAuthenticated, (req, res, next) =>{

    // const adminRole = req.payload.role
    // res.status(200).json({adminRole})

    res.json(req.payload)
 } )

module.exports = router;