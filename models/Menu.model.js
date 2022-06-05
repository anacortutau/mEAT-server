const { Schema, model } = require("mongoose");


const menuSchema = new Schema({

    name: {
        type: String
    },

    products: [{
        type: Schema.Types.ObjectId,
        ref: "products",
    }],

    price: {
        type: Number
    },

    imagenUrl: {

        type: String,
    
    
    },

})


const Menu = model("menu", menuSchema);

module.exports = Menu;