//-------------------------------------
//dependencies
//-------------------------------------

const mongoose = require("./connection")

//-------------------------------------
//define model
//-------------------------------------

const {Schema , model} = mongoose

const userSchema = new Schema ({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true}
})

//make user model
const User = model("User", userSchema)

//-------------------------------------
//export the model out
//-------------------------------------

module.exports = User