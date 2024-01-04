//-------------------------------------
//Dependencies
//-------------------------------------
require("dotenv").config() // load .env variables
const express = require("express") // our web framework
const morgan = require("morgan") // our logger
const methodOverride = require("method-override") // override forms
const fruitController = require("./controllers/fruit") //import fruits model
const userController = require("./controllers/user") //import user model
const session = require("express-session") //create session cookie
const MongoStore = require("connect-mongo") //storage


//-------------------------------------
//Express app object
//-------------------------------------
const app = express()



//-------------------------------------
//Middleware
//-------------------------------------
//normal middleware
app.use(morgan("dev")) //logger
app.use(methodOverride("_method")) //override form submissions
app.use(express.urlencoded({extended: true})) //parse urlencoded bodies
app.use(express.static("public")) //server files from public folder
app.use(session({
    secret: process.env.SECRET,
    store: MongoStore.create({mongoUrl: process.env.DATABASE_URL}),
    saveUninitialized: true,
    resave: false
  }))


//routers
app.use("/fruits", fruitController)
app.use("/user", userController)


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