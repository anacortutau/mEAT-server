const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema({
    username: {
      type: String,
      // unique: true -> Ideally, should be unique, but its up to you
    },
    password:{
      type: String,
      required: true
    },

    surname: {
      type: String
    },
    street: {
      type: String
    },

    number: {
      type: Number
    },

    portal: {
      type: String
    },

    city: {
      type: String
    },

    phone: {

      type: Number

    },

    email: {
      type: String,
      required: true,
      unique: true
    },

    role: {
      type: String,
      enum: ["user","admin"],
      default: "user"
      
    }
   
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("user", userSchema);

module.exports = User;
