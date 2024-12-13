const express=require("express")
const notesCreate = require("../controller/notes.controller")
const isAuth = require("../Middleware/Auth")

const notesRouter=express.Router("")

// Post , Delete , Patch , Update 

notesRouter.post("/create",isAuth,notesCreate)


module.exports=notesRouter
