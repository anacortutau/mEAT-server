const { Schema, model } = require("mongoose");


const orderSchema = new Schema ({

    user: {
        type: Schema.Types.ObjectId,
        ref:"user"
    },

    products: [{
        type: Schema.Types.ObjectId,
        ref: "products",
    }],

    menu: [{
        type: Schema.Types.ObjectId,
        ref: "menu",

    }],

    price: {
        type: Number
    }


})



const Order = model("order", orderSchema);

module.exports = Order;