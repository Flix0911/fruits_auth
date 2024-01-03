//-------------------------------------
//Dependencies
//-------------------------------------
require("dotenv").config() // load .env variables
const express = require("express") // our web framework
const morgan = require("morgan") // our logger
const methodOverride = require("method-override") // override forms
const mongoose = require("mongoose") // connect to our mongodb

//import model
const Fruit = require("./models/Fruit")

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

app.get("/fruits/seed", async (req, res) => {
    try {
        const startFruits = [
            { name: "Orange", color: "orange", readyToEat: false },
            { name: "Grape", color: "purple", readyToEat: false },
            { name: "Banana", color: "orange", readyToEat: false },
            { name: "Strawberry", color: "red", readyToEat: false },
            { name: "Coconut", color: "brown", readyToEat: false },
            ]
    
        //Delete All Fruits
        await Fruit.deleteMany({})
    
        //Seed my starter fruits
        const fruits = await Fruit.create(startFruits)
    
        //send fruits as response
        res.json(fruits)
    } catch (error) {
        //mongoose writes an error as a message
        console.log(error.message)
        res.send("There was an error, read logs for error details")
    }   
})

//INDEX Route - GET - /fruits
app.get("/fruits", async (req, res) => {
    try {
        //get all the fruits
        const fruits = await Fruit.find({}) 
        //render a template
        //fruits/index.ejs = views/fruits/index.ejs
        res.render("fruits/index.ejs", {fruits})
    } catch (error) {
        console.log("-------", error.message, "----------")
        res.status(400).send("error, read logs for details")
    }
})

//NEW route - GET - /fruits/new
app.get("/fruits/new", (req, res) => {
    res.render("fruits/new.ejs")
})

//CREATE route - POST - /fruits
app.post("/fruits", async (req, res) => {
    try {
        //check if readyToEat should be true
        //expression ? true : false (ternary operator)
        req.body.readyToEat =  req.body.readyToEat === "on" ? true : false

        //create the fruit in the database
        await Fruit.create(req.body)

        //redirect back to main page
        res.redirect("/fruits")
    } catch (error) {
        console.log("-------", error.message, "----------")
        res.status(400).send("error, read logs for details")
    }
})

//EDIT route - GET - /fruits/:id/edit
app.get("/fruits/:id/edit", async (req, res) => {
    try {
      // get the id from params
      const id = req.params.id;
      // get the fruit from the db
      const fruit = await Fruit.findById(id);
      //render the template
      res.render("fruits/edit.ejs", { fruit });
    } catch (error) {
      console.log("-----", error.message, "------");
      res.status(400).send("error, read logs for details");
    }
  });

//UPDATE route - PUT - /fruits/:id
app.put("/fruits/:id", async (req, res) => {
    try {
        //get the id
        const id = req.params.id

        //update readyToEat
        req.body.readyToEat = req.body.readyToEat === "on" ? true : false

        //update the fruit in the database
        await Fruit.findByIdAndUpdate(id, req.body)

        //send user to show page
        res.redirect(`/fruits/${id}`)
    } catch (error) {
        console.log("-----", error.message, "------");
        res.status(400).send("error, read logs for details");
    }
})

//DELETE route - DELETE - /fruits/:id
app.delete("/fruits/:id", async (req, res) => {
        // get the id
        const id = req.params.id
        // delete the fruit
        await Fruit.findByIdAndDelete(id)
        // redirect to main page
        res.redirect("/fruits")
      })

//SHOW route - GET - /fruits/:id
app.get("/fruits/:id", async (req, res) => {
    try {
        //get the id from params
        const id = req.params.id

        //find the particular fruit from the database
        const fruit = await Fruit.findById(id)

        //render the template with the fruit
        res.render("fruits/show.ejs", {fruit})
    } catch (error) {
        console.log("-------", error.message, "-------")
        res.status(400).send("error, read logs for details")
    }
})



//-------------------------------------
//Server listener 
//-------------------------------------
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`)
})