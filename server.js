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

//database connection string
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
//-------------------------------------
