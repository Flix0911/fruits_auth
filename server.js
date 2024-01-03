//-------------------------------------
//Dependencies
//-------------------------------------
require("dotenv").config() // load .env variables
const express = require("express") // our web framework
const morgan = require("morgan") // our logger
const methodOverride = require("method-override") // override forms
const mongoose = require("mongoose") // connect to our mongodb




//-------------------------------------
//-------------------------------------

//-------------------------------------
//database connection string
//-------------------------------------

//process is a sequence of telling the processor to do something
//an object is created that tells you everything about it
const DATABASE_URL = process.env.DATABASE_URL

//establish connection to db
mongoose.connect(DATABASE_URL)

//events for when the connection changes
mongoose.connection
.on("open", () => {console.log("Connected to Mongo")})
.on("close", () => {console.log("Disconnected from Mongo")})
.on("error", (error) => {console.log(error)})

//-------------------------------------
//Create out Fruits model
//-------------------------------------
//destructure schema and model into their own variables
//takes a look for a property in the object in mongoose
const {Schema, model} = mongoose 

//Schema - shape of the data
const fruitSchema = new Schema({
    name: String, 
    color: String,
    readyToEat: Boolean
})

//Model - object for interacting with the database
const Fruit = model("Fruit", fruitSchema)

//-------------------------------------
//Express app object
//-------------------------------------
const app = express()


//-------------------------------------
//Middleware
//-------------------------------------
app.use(morgan("dev")) //logger
app.use(methodOverride("_method")) //override form submissions
app.use(express.urlencoded({extended: true})) //parse urlencoded bodies
app.use(express.static("public")) //server files from public folder


//-------------------------------------
//Routes
//-------------------------------------

app.get("/", (req, res) => {
    res.send("Your server is running...better catch it")
})


//-------------------------------------
//Server listener 
//-------------------------------------
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`)
})