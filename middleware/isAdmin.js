
const isAdmin = (req, res, next)=>{

    if(req.payload.role === "admin"){
        next()
    }else{
        res.status(401).json({errorMessage:"you don`t have access permission, you have to be an administrador"})
    }


}

module.exports = isAdmin