const { Schema, model } = require("mongoose");


const menuSchema = new Schema({

    name: {
        type: String
    },

    products: [{
        type: Schema.Types.ObjectId,
        ref: "Products",
    }],

    price: {
        type: Number
    },

    imagenUrl: {

        type: String,
    
    
    }, 



})




const Menu = model("Menu", menuSchema);

module.exports = Menu;