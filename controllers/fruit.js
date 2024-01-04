//-------------------------------------
//Dependencies
//-------------------------------------

//import express
const express = require("express")

//import Fruit model
const Fruit = require("../models/Fruit")

//-------------------------------------
//create the router
//-------------------------------------

const router = express.Router()

//-------------------------------------
//middleware
router.use((req, res, next) => {
    console.table(req.session);
  
    if (req.session.loggedIn) {
      next();
    } else {
      res.redirect("/user/login");
    }
  
    
  });
//-------------------------------------

//-------------------------------------
//routes
//-------------------------------------


router.get("/seed", async (req, res) => {
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
router.get("/", async (req, res) => {
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
router.get("/new", (req, res) => {
    res.render("fruits/new.ejs")
})

//CREATE route - POST - /fruits
router.post("/", async (req, res) => {
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
router.get("/:id/edit", async (req, res) => {
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
router.put("/:id", async (req, res) => {
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
router.delete("/:id", async (req, res) => {
        // get the id
        const id = req.params.id
        // delete the fruit
        await Fruit.findByIdAndDelete(id)
        // redirect to main page
        res.redirect("/fruits")
      })

//SHOW route - GET - /fruits/:id
router.get("/:id", async (req, res) => {
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
//export router
//-------------------------------------

module.exports = router