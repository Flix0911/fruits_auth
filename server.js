//-------------------------------------
//Dependencies
//-------------------------------------
require("dotenv").config() // load .env variables
const express = require("express") // our web framework
const registerGlobalMiddleware = require("./utils/middleware")

//-------------------------------------
//Express app object
//-------------------------------------
const app = express()

//register Middleware
registerGlobalMiddleware(app)

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