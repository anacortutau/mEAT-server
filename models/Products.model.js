const { Schema, model } = require("mongoose");

const productSchema = new Schema ({

category: {
    type: String,
    enum: ["Dish", "Garrison", "Dessert", "Beverage"]
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


const Products = model("products", productSchema);

module.exports = Products;