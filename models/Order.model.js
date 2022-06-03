const { Schema, model } = require("mongoose");


const orderSchema = new Schema ({

    user: {
        type: Schema.Types.ObjectId,
        ref:"User"
    },

    products: [{
        type: Schema.Types.ObjectId,
        ref: "Products",
    }],

    menu: [{
        type: Schema.Types.ObjectId,
        ref: "Menu",

    }],

    price: {
        type: Number
    }


})



const Order = model("Order", orderSchema);

module.exports = Order;