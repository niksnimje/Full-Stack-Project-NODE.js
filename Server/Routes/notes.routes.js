const express=require("express")
const {notesCreate, notesDelete, getAllNotesUser,getSingelNotesUser,updateNotes} = require("../controller/notes.controller")
const isAuth = require("../Middleware/Auth")
const upload = require("../Config/multer")


const notesRouter=express.Router("")

// Post , Delete , Patch , Update 

notesRouter.post("/create",isAuth,notesCreate)

notesRouter.delete("/delete/:noteID",isAuth,notesDelete)

notesRouter.get("/get/:userID",isAuth,getAllNotesUser)

notesRouter.get("/singelNote/:noteID",isAuth,getSingelNotesUser)

notesRouter.patch("/update/:noteID",isAuth,upload.single("file"),updateNotes)


module.exports=notesRouter