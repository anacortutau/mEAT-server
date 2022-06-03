const { Schema, model } = require("mongoose");





const productSchema = new Schema ({

category: {
    type: String,
    enum: ["Burguer", "Garrison", "Dessert", "Beverage"]
},
name: {
    type: String
},

imagenUrl: {

    type: String,


}, 
price: {
    type: Number
}


})


const Products = model("Products", productSchema);

module.exports = Products;